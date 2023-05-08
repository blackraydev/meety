import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useSocket } from '../components';
import { PagesRoutes } from '../constants';

const ICE_SERVERS = {
  iceServers: [
    {
      urls: 'stun:openrelay.metered.ca:80',
    },
  ],
};

export const useWebRTC = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { id: roomName } = useParams();

  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [userStreamLoading, setUserStreamLoading] = useState(true);

  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement>(null);
  const rtcConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket>();
  const userStreamRef = useRef<MediaStream>();
  const hostRef = useRef(false);

  useEffect(() => {
    if (socket) {
      socketRef.current = socket;
      // First we join a room
      socketRef.current.emit('join', roomName);

      socketRef.current.on('joined', handleRoomJoined);
      // If the room didn't exist, the server would emit the room was 'created'
      socketRef.current.on('created', handleRoomCreated);
      // Whenever the next person joins, the server emits 'ready'
      socketRef.current.on('ready', initiateCall);

      // Emitted when a peer leaves the room
      socketRef.current.on('leave', onPeerLeave);

      // If the room is full, we show an alert
      socketRef.current.on('full', () => navigate(PagesRoutes.Home));

      // Event called when a remote user initiating the connection and
      socketRef.current.on('offer', handleReceivedOffer);
      socketRef.current.on('answer', handleAnswer);
      socketRef.current.on('ice-candidate', handlerNewIceCandidateMsg);

      // clear up after
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [roomName, socket]);

  const handleRoomJoined = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        if (userVideoRef.current) {
          userStreamRef.current = stream;
          userVideoRef.current.srcObject = stream;

          userVideoRef.current.onloadedmetadata = () => {
            userVideoRef.current?.play();
          };

          socketRef.current?.emit('ready', roomName);
        }
      })
      .catch(console.error);
  };

  const handleRoomCreated = () => {
    hostRef.current = true;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        if (userVideoRef.current) {
          userStreamRef.current = stream;
          userVideoRef.current.srcObject = stream;

          userVideoRef.current.onloadedmetadata = () => {
            userVideoRef.current?.play();
            setUserStreamLoading(false);
          };
        }
      })
      .catch(console.error);
  };

  const initiateCall = () => {
    if (hostRef.current && userStreamRef.current) {
      rtcConnectionRef.current = createPeerConnection();
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[0],
        userStreamRef.current,
      );
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[1],
        userStreamRef.current,
      );
      rtcConnectionRef.current
        .createOffer()
        .then((offer) => {
          rtcConnectionRef.current?.setLocalDescription(offer);
          socketRef.current?.emit('offer', offer, roomName);
        })
        .catch(console.error);
    }
  };

  const onPeerLeave = () => {
    // This person is now the creator because they are the only person in the room.
    hostRef.current = true;

    if (peerVideoRef.current && peerVideoRef.current.srcObject) {
      (peerVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
    }

    // Safely closes the existing connection established with the peer who left.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null;
      rtcConnectionRef.current.onicecandidate = null;
      rtcConnectionRef.current.close();
      rtcConnectionRef.current = null;
    }
  };

  /**
   * Takes a userid which is also the socketid and returns a WebRTC Peer
   *
   * @param  {string} userId Represents who will receive the offer
   * @returns {RTCPeerConnection} peer
   */

  const createPeerConnection = () => {
    // We create a RTC Peer Connection
    const connection = new RTCPeerConnection(ICE_SERVERS);

    // We implement our onicecandidate method for when we received a ICE candidate from the STUN server
    connection.onicecandidate = handleICECandidateEvent;

    // We implement our onTrack method for when we receive tracks
    connection.ontrack = handleTrackEvent;

    return connection;
  };

  const handleReceivedOffer = (offer: RTCSessionDescriptionInit) => {
    if (!hostRef.current && userStreamRef.current) {
      rtcConnectionRef.current = createPeerConnection();
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[0],
        userStreamRef.current,
      );
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[1],
        userStreamRef.current,
      );
      rtcConnectionRef.current.setRemoteDescription(offer);

      rtcConnectionRef.current
        .createAnswer()
        .then((answer) => {
          rtcConnectionRef.current?.setLocalDescription(answer);
          socketRef.current?.emit('answer', answer, roomName);
        })
        .catch(console.error);
    }
  };

  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    rtcConnectionRef.current?.setRemoteDescription(answer).catch(console.error);
  };

  const handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      socketRef.current?.emit('ice-candidate', event.candidate, roomName);
    }
  };

  const handlerNewIceCandidateMsg = (incoming: RTCIceCandidateInit) => {
    const candidate = new RTCIceCandidate(incoming);
    rtcConnectionRef.current?.addIceCandidate(candidate).catch((e) => console.log(e));
  };

  const handleTrackEvent = (event: RTCTrackEvent) => {
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = event.streams[0];
    }
  };

  const toggleMediaStream = (type: 'audio' | 'video', state: boolean) => {
    userStreamRef.current?.getTracks().forEach((track) => {
      if (track.kind === type) {
        track.enabled = !state;
      }
    });
  };

  const startScreenShare = () => {
    return navigator.mediaDevices
      .getDisplayMedia({
        video: {
          width: 1920,
          height: 1080,
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

  const toggleMic = () => {
    toggleMediaStream('audio', micActive);
    setMicActive((prev) => !prev);
  };

  const toggleCamera = () => {
    toggleMediaStream('video', cameraActive);
    setCameraActive((prev) => !prev);
  };

  const getAudioTracks = () => {
    return userStreamRef.current?.getAudioTracks();
  };

  const getVideoTracks = () => {
    return userStreamRef.current?.getVideoTracks();
  };

  const leaveRoom = () => {
    if (socketRef.current && userVideoRef.current && peerVideoRef.current) {
      // Let's the server know that user has left the room.
      socketRef.current.emit('leave', roomName);

      if (userVideoRef.current.srcObject) {
        (userVideoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
      if (peerVideoRef.current.srcObject) {
        (peerVideoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }

      // Checks if there is peer on the other side and safely closes the existing connection established with the peer.
      if (rtcConnectionRef.current) {
        rtcConnectionRef.current.ontrack = null;
        rtcConnectionRef.current.onicecandidate = null;
        rtcConnectionRef.current.close();
        rtcConnectionRef.current = null;
      }

      navigate(PagesRoutes.Home);
    }
  };

  return {
    userVideoRef,
    peerVideoRef,
    screenShareVideoRef,
    toggleMic,
    toggleCamera,
    micActive,
    cameraActive,
    screenShareActive,
    leaveRoom,
    getAudioTracks,
    getVideoTracks,
    startScreenShare,
    stopScreenShare,
    userStreamLoading,
  };
};
