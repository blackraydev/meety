import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LOCAL_VIDEO } from '../constants/localVideo';
import { PagesRoutes, SocketEventTypes } from '../constants';
import { useStateWithCallback } from './useStateWithCallback';
import { useSocket } from '../components';

const ICE_SERVERS = [
  {
    urls: 'stun:openrelay.metered.ca:80',
  },
];

export const useWebRTC = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { id: roomId } = useParams();

  const [clientName, setClientName] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [senders, setSenders] = useState<RTCRtpSender[]>([]);
  const [conferenceMode, setConferenceMode] = useState(false);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  const localMediaStream = useRef<MediaStream | null>(null);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const peerMediaElements = useRef<{ [key: string]: HTMLVideoElement }>({
    [LOCAL_VIDEO]: null as unknown as HTMLVideoElement,
  });

  const [clients, updateClients] = useStateWithCallback<string[]>([]);

  const onJoinRoom = useCallback(() => setConferenceMode(true), []);

  const provideMediaRef = useCallback((id: string, node: HTMLVideoElement) => {
    return (peerMediaElements.current[id] = node);
  }, []);

  const addNewClient = useCallback(
    (newClient: string, cb: () => void) => {
      updateClients((list) => {
        if (!list.includes(newClient)) {
          return [...list, newClient];
        }
        return list;
      }, cb);
    },
    [clients, updateClients],
  );

  useEffect(() => {
    if (socket) {
      socket.on(SocketEventTypes.AddPeer, handleNewPeer);
      socket.on(SocketEventTypes.SessionDescription, setRemoteMedia);
      socket.on(SocketEventTypes.IceCandidate, handleAddPeer);
      socket.on(SocketEventTypes.RemovePeer, handleRemovePeer);
      socket.on(SocketEventTypes.VideoStatus, handleVideoStatus);
      socket.on(SocketEventTypes.AudioStatus, handleAudioStatus);

      return () => {
        socket.off(SocketEventTypes.AddPeer);
        socket.off(SocketEventTypes.SessionDescription);
        socket.off(SocketEventTypes.IceCandidate);
        socket.off(SocketEventTypes.RemovePeer);
        socket.off(SocketEventTypes.VideoStatus);
        socket.off(SocketEventTypes.AudioStatus);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && roomId) {
      startCapture().catch(console.error);
    }
  }, [socket, roomId]);

  useEffect(() => {
    if (socket && roomId && conferenceMode && clientName) {
      socket.emit(SocketEventTypes.Join, { roomId, clientName });

      return () => {
        localMediaStream.current?.getTracks().forEach((track) => track.stop());
        socket.emit(SocketEventTypes.Leave);
      };
    }
  }, [socket, roomId, conferenceMode, clientName]);

  const handleRelaySDP = (peerId: string, description: RTCSessionDescriptionInit) => {
    if (peerConnections.current[peerId]) {
      peerConnections.current[peerId]
        .setLocalDescription(description)
        .then(() => {
          socket.emit(SocketEventTypes.RelaySDP, {
            sessionDescription: description,
            peerId,
          });
        })
        .catch(console.error);
    }
  };

  const handleNewPeer = ({
    peerId,
    peerName,
    createOffer,
  }: {
    peerId: string;
    peerName: string;
    createOffer: (() => void) | null;
  }) => {
    if (peerId in peerConnections.current) {
      return console.warn(`Already connected to peer ${peerId}`);
    }

    if (peerName) {
      setUserNames((prev) => ({ ...prev, [peerId]: peerName }));
    }

    peerConnections.current[peerId] = new RTCPeerConnection({
      iceServers: ICE_SERVERS,
    });

    peerConnections.current[peerId].onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit(SocketEventTypes.RelayIce, {
          peerId: peerId,
          iceCandidate: event.candidate,
        });
      }
    };

    let tracksNumber = 0;

    peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
      tracksNumber++;

      if (tracksNumber === 2) {
        // video & audio tracks received
        tracksNumber = 0;

        addNewClient(peerId, () => {
          if (peerMediaElements.current[peerId]) {
            peerMediaElements.current[peerId].srcObject = remoteStream;
          } else {
            // FIX LONG RENDER IN CASE OF MANY CLIENTS
            let settled = false;

            const interval = setInterval(() => {
              if (peerMediaElements.current[peerId]) {
                peerMediaElements.current[peerId].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      }
    };

    localMediaStream.current?.getTracks().forEach((track) => {
      const peerSender = peerConnections.current[peerId].addTrack(
        track,
        localMediaStream.current as MediaStream,
      );
      setSenders((prev) => [...prev, peerSender]);
    });

    if (createOffer) {
      peerConnections.current[peerId].createOffer().then((offer) => {
        handleRelaySDP(peerId, offer);
      });
    }
  };

  const setRemoteMedia = ({
    peerId,
    sessionDescription: remoteDescription,
  }: {
    peerId: string;
    sessionDescription: RTCSessionDescriptionInit;
  }) => {
    if (peerConnections.current[peerId]) {
      peerConnections.current[peerId]
        .setRemoteDescription(new RTCSessionDescription(remoteDescription))
        .then(() => {
          if (remoteDescription.type === 'offer') {
            peerConnections.current[peerId].createAnswer().then((answer) => {
              handleRelaySDP(peerId, answer);
            });
          }
        });
    }
  };

  const handleAddPeer = ({
    peerId,
    iceCandidate,
  }: {
    peerId: string;
    iceCandidate: RTCIceCandidateInit;
  }) => {
    peerConnections.current[peerId]?.addIceCandidate(new RTCIceCandidate(iceCandidate));
  };

  const handleRemovePeer = ({ peerId }: { peerId: string }) => {
    const peerConnection = peerConnections.current[peerId];

    setUserNames((prev) => {
      delete prev[peerId];
      return prev;
    });

    if (peerConnection) {
      peerConnection.ontrack = null;
      peerConnection.onicecandidate = null;
      peerConnection.close();
    }

    delete peerConnections.current[peerId];
    delete peerMediaElements.current[peerId];

    updateClients((list) => list.filter((clientId) => clientId !== peerId));
  };

  const startCapture = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 500,
          height: 500,
        },
      })
      .then((stream) => {
        localMediaStream.current = stream;
        localMediaStream.current.getTracks().forEach((track) => {
          if (track.kind === 'audio') {
            track.enabled = micActive;
            emitAudioData(micActive);
          }
          if (track.kind === 'video') {
            track.enabled = cameraActive;
            emitVideoData(cameraActive);
          }
        });

        addNewClient(LOCAL_VIDEO, () => {
          const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

          if (localVideoElement) {
            localVideoElement.volume = 0;
            localVideoElement.srcObject = localMediaStream.current;
          }
        });
      })
      .catch(console.error);
  };

  const toggleMediaStream = (type: 'audio' | 'video', state: boolean) => {
    localMediaStream.current?.getTracks().forEach((track) => {
      if (track.kind === type) {
        track.enabled = !state;
      }
    });
  };

  const toggleMic = () => {
    toggleMediaStream('audio', micActive);
    setMicActive((prev) => {
      emitAudioData(!prev);
      return !prev;
    });
  };

  const toggleCamera = () => {
    toggleMediaStream('video', cameraActive);
    setCameraActive((prev) => {
      emitVideoData(!prev);
      return !prev;
    });
  };

  const getAudioTracks = () => {
    return localMediaStream.current?.getAudioTracks();
  };

  const getVideoTracks = () => {
    return localMediaStream.current?.getVideoTracks();
  };

  const startScreenShare = () => {
    return navigator.mediaDevices
      .getDisplayMedia({
        audio: false,
        video: {
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
        },
      })
      .then((stream) => {
        const targetSenders = senders.filter(
          (sender) => sender?.track?.kind === 'video' && sender.transport?.state === 'connected',
        );

        if (targetSenders.length) {
          targetSenders.forEach((sender) => {
            sender.replaceTrack(stream.getTracks()[0]);
          });
        }

        peerMediaElements.current[LOCAL_VIDEO].srcObject = stream;
        setScreenShareActive(true);
      })
      .catch(console.error);
  };

  const stopScreenShare = () => {
    const targetSender = senders.find(
      (sender) => sender?.track?.kind === 'video' && sender.transport?.state === 'connected',
    );
    const videoTracks = getVideoTracks();

    if (targetSender && videoTracks) {
      targetSender.replaceTrack(videoTracks[0]);
    }

    const displayTracks = (
      peerMediaElements.current[LOCAL_VIDEO].srcObject as MediaStream
    ).getTracks();

    displayTracks.forEach((track) => track.stop());
    peerMediaElements.current[LOCAL_VIDEO].srcObject = localMediaStream.current;

    setScreenShareActive(false);
  };

  const leaveRoom = () => {
    const mediaElements = peerMediaElements.current;
    const localVideoElement = mediaElements[LOCAL_VIDEO];

    if (localVideoElement) {
      const mediaStream = localVideoElement.srcObject as MediaStream;
      mediaStream.getTracks().forEach((track) => track.stop());

      navigate(PagesRoutes.Home);
    }
  };

  const reloadLocalStream = () => {
    peerMediaElements.current[LOCAL_VIDEO].srcObject = localMediaStream.current;
  };

  const isClientVideoEnabled = (id: string) => {
    return (peerMediaElements.current[id]?.srcObject as MediaStream)?.getVideoTracks()[0]?.enabled;
  };

  const isClientAudioEnabled = (id: string) => {
    return (peerMediaElements.current[id]?.srcObject as MediaStream)?.getAudioTracks()[0]?.enabled;
  };

  const emitVideoData = (enabled: boolean) => {
    socket.emit(SocketEventTypes.VideoStatus, { roomId, enabled });
  };

  const emitAudioData = (enabled: boolean) => {
    socket.emit(SocketEventTypes.AudioStatus, { roomId, enabled });
  };

  const handleVideoStatus = ({ peerId, enabled }: { peerId: string; enabled: boolean }) => {
    if (peerMediaElements.current[peerId]) {
      const stream = peerMediaElements.current[peerId].srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => (track.enabled = enabled));
    }
  };

  const handleAudioStatus = ({ peerId, enabled }: { peerId: string; enabled: boolean }) => {
    if (peerMediaElements.current[peerId]) {
      const stream = peerMediaElements.current[peerId].srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => (track.enabled = enabled));
    }
  };

  const getClientName = (clientId: string) => {
    return userNames[clientId];
  };

  return {
    clients,
    provideMediaRef,
    micActive,
    cameraActive,
    getAudioTracks,
    getVideoTracks,
    toggleMic,
    toggleCamera,
    leaveRoom,
    startScreenShare,
    stopScreenShare,
    screenShareActive,
    reloadLocalStream,
    isClientVideoEnabled,
    isClientAudioEnabled,
    senders,
    conferenceMode,
    onJoinRoom,
    clientName,
    setClientName,
    getClientName,
  };
};
