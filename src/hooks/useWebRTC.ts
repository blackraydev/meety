import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LOCAL_VIDEO } from '../constants/localVideo';
import { PagesRoutes, SocketEventTypes } from '../constants';
import { useStateWithCallback } from './useStateWithCallback';
import { useSocket } from '../components';
import { toDateHHMMSS } from '../lib';

const ICE_SERVERS = [
  {
    urls: 'stun:openrelay.metered.ca:80',
  },
];

export const useWebRTC = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { id: roomId } = useParams();

  // Current user data
  const [clientName, setClientName] = useState('');
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [participantsActive, setParticipantsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [conferenceMode, setConferenceMode] = useState(false);
  const [senders, setSenders] = useState<RTCRtpSender[]>([]);
  const localMediaStream = useRef<MediaStream | null>(null);

  // Other users data
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [userMics, setUserMics] = useState<{ [key: string]: boolean }>({});
  const [userCameras, setUserCameras] = useState<{ [key: string]: boolean }>({});
  const [userScreenShares, setUserScreenShares] = useState<{ [key: string]: boolean }>({});

  // All users data
  const [clientMessages, setClientMessages] = useState<{
    [key: string]: Array<{ messageText: string; messageDate: Date }>;
  }>({});
  const [clients, updateClients] = useStateWithCallback<string[]>([]);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const peerMediaElements = useRef<{ [key: string]: HTMLVideoElement }>({
    [LOCAL_VIDEO]: null as unknown as HTMLVideoElement,
  });

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
      socket.on(SocketEventTypes.ScreenShareStatus, handleScreenShareStatus);
      socket.on(SocketEventTypes.SendMessage, handleSendMessage);

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
      socket.emit(SocketEventTypes.Join, { roomId, clientName, cameraActive, micActive });

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
    peerCameraActive,
    peerMicActive,
    peerScreenShareActive,
    createOffer,
  }: {
    peerId: string;
    peerName: string;
    peerCameraActive: boolean;
    peerMicActive: boolean;
    peerScreenShareActive: boolean;
    createOffer: (() => void) | null;
  }) => {
    if (peerId in peerConnections.current) {
      return console.warn(`Already connected to peer ${peerId}`);
    }

    setUserNames((prev) => ({ ...prev, [peerId]: peerName }));
    setUserCameras((prev) => ({ ...prev, [peerId]: peerCameraActive }));
    setUserMics((prev) => ({ ...prev, [peerId]: peerMicActive }));
    setUserScreenShares((prev) => ({ ...prev, [peerId]: peerScreenShareActive }));

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
            // Fix long render in case of many clients
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

    if (peerConnection) {
      peerConnection.ontrack = null;
      peerConnection.onicecandidate = null;
      peerConnection.close();
    }

    setUserNames((prev) => {
      delete prev[peerId];
      return prev;
    });
    setUserCameras((prev) => {
      delete prev[peerId];
      return prev;
    });
    setUserMics((prev) => {
      delete prev[peerId];
      return prev;
    });

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
          }
          if (track.kind === 'video') {
            track.enabled = cameraActive;
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
      socket.emit(SocketEventTypes.AudioStatus, { roomId, enabled: !prev });
      return !prev;
    });
  };

  const toggleCamera = () => {
    toggleMediaStream('video', cameraActive);
    setCameraActive((prev) => {
      socket.emit(SocketEventTypes.VideoStatus, { roomId, enabled: !prev });
      return !prev;
    });
  };

  const toggleScreenShare = () => {
    screenShareActive ? stopScreenShare() : startScreenShare();
  };

  const toggleChat = () => {
    setChatActive((prev) => !prev);
  };

  const toggleParticipants = () => {
    setParticipantsActive((prev) => !prev);
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

        socket.emit(SocketEventTypes.ScreenShareStatus, { roomId, enabled: true });

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

    socket.emit(SocketEventTypes.ScreenShareStatus, { roomId, enabled: false });

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
    setTimeout(() => {
      peerMediaElements.current[LOCAL_VIDEO].srcObject = localMediaStream.current;
    }, 0);
  };

  const isClientVideoEnabled = (id: string) => {
    return userCameras[id];
  };

  const isClientAudioEnabled = (id: string) => {
    return userMics[id];
  };

  const isClientScreenShareEnabled = (id: string) => {
    return userScreenShares[id];
  };

  const getClientName = (clientId: string) => {
    return userNames[clientId];
  };

  const handleVideoStatus = ({ peerId, enabled }: { peerId: string; enabled: boolean }) => {
    setUserCameras((prev) => ({ ...prev, [peerId]: enabled }));
  };

  const handleAudioStatus = ({ peerId, enabled }: { peerId: string; enabled: boolean }) => {
    setUserMics((prev) => ({ ...prev, [peerId]: enabled }));
  };

  const handleScreenShareStatus = ({ peerId, enabled }: { peerId: string; enabled: boolean }) => {
    setUserScreenShares((prev) => ({ ...prev, [peerId]: enabled }));
  };

  const handleSendMessage = ({
    peerName,
    message,
  }: {
    peerName: string;
    message: { messageText: string; messageDate: string };
  }) => {
    const { messageText, messageDate: dirtyMessageDate } = message;
    const messageDate = toDateHHMMSS(dirtyMessageDate);

    setClientMessages((prev) => {
      if (prev[peerName]) {
        const peerMessages = prev[peerName];
        peerMessages.push({ messageText, messageDate });

        return {
          ...prev,
          [peerName]: peerMessages,
        };
      }
      return {
        ...prev,
        [peerName]: [
          {
            messageText,
            messageDate,
          },
        ],
      };
    });
  };

  return {
    clients,
    provideMediaRef,
    micActive,
    cameraActive,
    screenShareActive,
    chatActive,
    participantsActive,
    getAudioTracks,
    getVideoTracks,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    toggleChat,
    toggleParticipants,
    leaveRoom,
    reloadLocalStream,
    isClientVideoEnabled,
    isClientAudioEnabled,
    isClientScreenShareEnabled,
    senders,
    conferenceMode,
    onJoinRoom,
    clientName,
    setClientName,
    getClientName,
    message,
    setMessage,
    clientMessages,
  };
};
