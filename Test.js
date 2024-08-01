// App.js
import React, {useEffect, useRef, useState} from 'react';
import {View, Button, TextInput, Text} from 'react-native';
import io from 'socket.io-client';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';

const Test_room = ({navigation, route}) => {
  const [roomId, setRoomId] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const localStream = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  // const pc = useRef(new RTCPeerConnection(configuration));
  useEffect(() => {
    const globalRoom = '66a42c42d2394a39c605db9b';
    console.log('globalRoom', globalRoom);
    const socket = io('http://192.168.10.7:5000/', {
      query: {
        globalRoom,
      },
      transports: ['websocket'],
      senderUserId: '66a42c42d2394a39c605db9b',
      receiverUserId: '66a47819ae2581bc40a0a0c6',
    });
    socket.on('liveStreamCreated', roomId => {
      console.log('Live stream created:', roomId);
    });

    socket.on('userJoined', socketId => {
      console.log('User joined:', socketId);
      if (peerConnection.current) {
        peerConnection.current
          .createOffer()
          .then(offer => {
            return peerConnection.current.setLocalDescription(offer);
          })
          .then(() => {
            socket.emit('offer', {
              type: 'offer',
              sdp: peerConnection.current.localDescription,
              roomId,
            });
          });
      }
    });

    socket.on('offer', data => {
      if (peerConnection.current) {
        peerConnection.current
          .setRemoteDescription(new RTCSessionDescription(data.sdp))
          .then(() => {
            return peerConnection.current.createAnswer();
          })
          .then(answer => {
            return peerConnection.current.setLocalDescription(answer);
          })
          .then(() => {
            socket.emit('answer', {
              type: 'answer',
              sdp: peerConnection.current.localDescription,
              roomId,
            });
          });
      }
    });

    socket.on('answer', data => {
      if (peerConnection.current) {
        peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.sdp),
        );
      }
    });

    socket.on('iceCandidate', data => {
      if (peerConnection.current) {
        peerConnection.current.addIceCandidate(
          new RTCIceCandidate(data.candidate),
        );
      }
    });

    return () => {
      socket.off('liveStreamCreated');
      socket.off('userJoined');
      socket.off('offer');
      socket.off('answer');
      socket.off('iceCandidate');
    };
  }, []);

  const startLiveStream = () => {
    setIsStreaming(true);
    socket.current.emit('createLiveStream', roomId);

    mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
      localStream.current = stream;

      peerConnection.current = new RTCPeerConnection();
      peerConnection.current.addStream(localStream.current);

      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          socket.current.emit('iceCandidate', {
            candidate: event.candidate,
            roomId,
          });
        }
      };

      peerConnection.current.onaddstream = event => {
        // Handle remote stream
      };
    });
  };

  const joinLiveStream = () => {
    setIsStreaming(true);
    socket.emit('joinLiveStream', roomId);

    mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
      localStream.current = stream;

      peerConnection.current = new RTCPeerConnection();
      peerConnection.current.addStream(localStream.current);

      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('iceCandidate', {
            candidate: event.candidate,
            roomId,
          });
        }
      };

      peerConnection.current.onaddstream = event => {
        // Handle remote stream
      };
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholder="Enter Room ID"
        value={roomId}
        onChangeText={setRoomId}
        style={{borderWidth: 1, padding: 10, marginBottom: 20}}
      />
      <Button title="Start Live Stream" onPress={startLiveStream} />
      <Button title="Join Live Stream" onPress={joinLiveStream} />
      {isStreaming && <Text>Streaming in Room: {roomId}</Text>}
    </View>
  );
};

export default Test_room;
