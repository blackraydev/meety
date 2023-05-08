import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../components';
import { PagesRoutes, SocketEventTypes } from '../constants';
import { useStateWithCallback } from './useStateWithCallback';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

const ICE_SERVERS = [
  {
    urls: 'stun:openrelay.metered.ca:80',
  },
];

export const useWebRTC = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { id: roomId } = useParams();

  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [screenShareActive, setScreenShareActive] = useState(false);

  const [clients, updateClients] = useStateWithCallback<string[]>([]);

  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localMediaStream = useRef<MediaStream | null>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement>(null);
  const peerMediaElements = useRef<{ [key: string]: HTMLVideoElement }>({
    [LOCAL_VIDEO]: null as unknown as HTMLVideoElement,
  });

  const provideMediaRef = useCallback((id: string, node: HTMLVideoElement) => {
    peerMediaElements.current[id] = node;
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

      return () => {
        socket.off(SocketEventTypes.AddPeer);
        socket.off(SocketEventTypes.SessionDescription);
        socket.off(SocketEventTypes.IceCandidate);
        socket.off(SocketEventTypes.RemovePeer);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      startCapture()
        .then(() => socket.emit(SocketEventTypes.Join, { room: roomId }))
        .catch((e) => console.error('Error getting userMedia:', e));

      return () => {
        localMediaStream.current?.getTracks().forEach((track) => track.stop());
        socket.emit(SocketEventTypes.Leave);
      };
    }
  }, [socket, roomId]);

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
    createOffer,
  }: {
    peerId: string;
    createOffer: (() => void) | null;
  }) => {
    if (peerId in peerConnections.current) {
      return console.warn(`Already connected to peer ${peerId}`);
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
      peerConnections.current[peerId].addTrack(track, localMediaStream.current as MediaStream);
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
    setMicActive((prev) => !prev);
  };

  const toggleCamera = () => {
    toggleMediaStream('video', cameraActive);
    setCameraActive((prev) => !prev);
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
        if (screenShareVideoRef.current) {
          screenShareVideoRef.current.srcObject = stream;
          setScreenShareActive(true);
        }
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const stopScreenShare = () => {
    if (screenShareVideoRef.current && screenShareVideoRef.current.srcObject) {
      const tracks = (screenShareVideoRef.current.srcObject as MediaStream).getTracks();

      tracks.forEach((track) => track.stop());
      screenShareVideoRef.current.srcObject = null;

      setScreenShareActive(false);
    }
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
    screenShareVideoRef,
  };
};
