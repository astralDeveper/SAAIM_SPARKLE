// import {
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   TextInput,
//   ImageBackground,
//   ScrollView,
//   FlatList,
//   Button,
// } from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   Add_Fri,
//   Coin,
//   Em,
//   Exit,
//   Left_Arrow,
//   Orange_Gift,
//   Parti,
//   Send,
// } from '../../assets/Images';
// import {Image} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {Dummy, Gifts} from '../../Dummy';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import {
//   RTCPeerConnection,
//   RTCView,
//   mediaDevices,
//   MediaStream,
//   RTCSessionDescription,
//   RTCIceCandidate,
// } from 'react-native-webrtc';
// import io from 'socket.io-client';

// const configuration = {
//   iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
// };

// const Video_Call = ({navigation, route}) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(new MediaStream());
//   const [connectionStatus, setConnectionStatus] = useState('Disconnected');
//   const pc = useRef(new RTCPeerConnection(configuration));
//   const socket = useRef(null);
//   const refRBSheet = useRef();
//   const [start, setStart] = useState(false);

//   useEffect(() => {
//     const initializeWebRTC = async () => {
//       try {
//         await startLocalStream();

//         socket.current = io('http://192.168.100.12:3000');

//         socket.current.on('connect', () => {
//           console.log('Socket connected');
//         });

//         socket.current.on('offer', async offer => {
//           try {
//             await pc.current.setRemoteDescription(
//               new RTCSessionDescription(offer),
//             );
//             const answer = await pc.current.createAnswer();
//             await pc.current.setLocalDescription(answer);
//             socket.current.emit('answer', answer);
//           } catch (error) {
//             console.error('Error handling offer:', error);
//           }
//         });

//         socket.current.on('answer', async answer => {
//           try {
//             await pc.current.setRemoteDescription(
//               new RTCSessionDescription(answer),
//             );
//           } catch (error) {
//             console.error('Error handling answer:', error);
//           }
//         });

//         socket.current.on('candidate', async candidate => {
//           try {
//             await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//           } catch (error) {
//             console.error('Error handling candidate:', error);
//           }
//         });

//         pc.current.onicecandidate = event => {
//           if (event.candidate) {
//             socket.current.emit('candidate', event.candidate);
//           }
//         };

//         pc.current.ontrack = event => {
//           if (event.streams && event.streams[0]) {
//             setRemoteStream(event.streams[0]);
//             setConnectionStatus('Connected');
//           }
//         };

//         pc.current.onconnectionstatechange = () => {
//           setConnectionStatus(pc.current.connectionState);
//         };

//         pc.current.oniceconnectionstatechange = () => {
//           setConnectionStatus(pc.current.iceConnectionState);
//         };
//       } catch (error) {
//         console.error('Error initializing WebRTC:', error);
//       }
//     };

//     initializeWebRTC();

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//       if (pc.current) {
//         pc.current.close();
//       }
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, []);

//   const startLocalStream = async () => {
//     try {
//       const stream = await mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(stream);
//       stream.getTracks().forEach(track => {
//         pc.current.addTrack(track, stream);
//       });
//     } catch (error) {
//       console.error('Error starting local stream:', error);
//     }
//   };

//   const startCall = async () => {
//     if (socket.current) {
//       try {
//         const offer = await pc.current.createOffer();
//         await pc.current.setLocalDescription(offer);
//         socket.current.emit('offer', offer);
//         setConnectionStatus('Calling');
//       } catch (error) {
//         console.error('Error starting call:', error);
//       }
//     } else {
//       console.error('Socket not connected');
//     }
//   };

//   const endCall = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//     }
//     if (pc.current) {
//       pc.current.close();
//     }
//     if (socket.current) {
//       socket.current.disconnect();
//     }
//     setConnectionStatus('Disconnected');
//     navigation.goBack();
//   };
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const sendMessage = () => {
//     if (message.trim()) {
//       const chatMessage = {text: message, timestamp: new Date()};
//       socket.current.emit('chat-message', chatMessage);
//       setMessage('');
//       console.log("=====>",message),
//     }
//   };
//   const formatTimestamp = timestamp => {
//     try {
//       const date = new Date(timestamp);
//       return date.toLocaleTimeString();
//     } catch (error) {
//       console.error('Error formatting timestamp:', error);
//       return '';
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View style={{flex: 1, width: width}}>
//         {/* <Text>Status: {connectionStatus}</Text> */}
//         {start
//           ? remoteStream && (
//               <RTCView
//                 streamURL={remoteStream.toURL()}
//                 style={{flex: 1, width: '100%', height: '100%'}}
//               />
//             )
//           : null}
//         {localStream && (
//           <RTCView
//             streamURL={localStream.toURL()}
//             style={{flex: 1, width: '100%', height: '100%'}}
//           />
//         )}
//       </View>
//       <View style={{position: 'absolute', height: height * 0.92, width: width}}>
//         <View style={{flex: 1}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               margin: 10,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: width * 0.5,
//               }}>
//               <Image
//                 source={require('../../assets/Images/Icons/Ma1.png')}
//                 style={{height: 50, width: 50, borderRadius: 100}}
//               />
//               <View
//                 style={{
//                   backgroundColor: 'rgba(0,0,0,0.5)',
//                   flexDirection: 'row',
//                   padding: 5,
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   width: width * 0.25,
//                   borderRadius: 10,
//                 }}>
//                 <Coin />
//                 <Text
//                   style={{
//                     color: '#FFF',
//                     fontFamily: 'Outfit-Regular',
//                     fontSize: 18,
//                   }}>
//                   2000
//                 </Text>
//               </View>
//             </View>
//             <View>
//               {start ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     endCall();
//                     setStart(false);
//                   }}
//                   style={{
//                     backgroundColor: 'red',
//                     padding: 5,
//                     width: width * 0.2,
//                     borderRadius: 50,
//                     alignItems: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color: '#FFF',
//                       fontSize: 16,
//                       fontFamily: 'Outfit-Light',
//                     }}>
//                     End
//                   </Text>
//                 </TouchableOpacity>
//               ) : (
//                 <TouchableOpacity
//                   onPress={() => {
//                     startCall();
//                     setStart(true);
//                   }}
//                   style={{
//                     backgroundColor: 'blue',
//                     padding: 5,
//                     width: width * 0.2,
//                     borderRadius: 50,
//                     alignItems: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color: '#FFF',
//                       fontSize: 16,
//                       fontFamily: 'Outfit-Light',
//                     }}>
//                     Start
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>
//           <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 10}}>
//             <Parti />
//           </TouchableOpacity>
//           <View
//             style={{
//               position: 'absolute',
//               bottom: height * 0.1,
//               height: height * 0.2,
//             }}>
//             <ScrollView>
//               <FlatList
//                 contentContainerStyle={{}}
//                 data={messages}
//                 renderItem={({item, index}) => {
//                   return (
//                     <View style={{width: width * 0.8}}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           justifyContent: 'space-evenly',
//                           marginVertical: 5,
//                           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                           padding: 5,
//                           borderRadius: 20,
//                           marginLeft: 10,
//                           alignSelf: 'flex-start',
//                         }}>
//                         {/* <Image
//                           source={item.img}
//                           style={{height: 30, width: 30, borderRadius: 50}}
//                         /> */}
//                         {/* <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             color: '#FFF',
//                             fontSize: 15,
//                             width: width * 0.25,
//                             alignSelf: 'center',
//                             textAlign: 'center',
//                           }}>
//                           {item.name}
//                         </Text> */}
//                         {/* <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                             justifyContent: 'space-evenly',
//                             padding: 3,
//                             borderRadius: 20,
//                             width: width * 0.1,
//                           }}>
//                           <Image
//                             source={item.rate}
//                             style={{height: 10, width: 10}}
//                           />
//                           <Text style={{color: '#FFF', fontSize: 13}}>
//                             {item.rating}
//                           </Text>
//                         </View> */}
//                         <View
//                           style={{
//                             alignSelf: 'center',
//                             justifyContent: 'center',
//                             marginLeft: 10,
//                             maxWidth: width * 0.3,
//                           }}>
//                           <Text style={{color: '#FFF', textAlign: 'center'}}>
//                             {item.text}
//                           </Text>
//                         </View>
//                       </View>
//                     </View>
//                   );
//                 }}
//               />
//             </ScrollView>
//           </View>
//           <View
//             style={{
//               position: 'absolute',
//               bottom: 20,
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//               width: width * 0.95,
//               alignSelf: 'center',
//             }}>
//             <View
//               style={{
//                 width: width * 0.8,
//                 backgroundColor: 'rgba(0,0,0,0.6)',
//                 borderRadius: 100,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: 5,
//               }}>
//               <Em />
//               <TextInput
//                 value={message}
//                 onChangeText={setMessage}
//                 placeholder="Type a message"
//                 placeholderTextColor={'#8e8e8e'}
//                 style={{
//                   padding: 0,
//                   width: width * 0.55,
//                   height: height * 0.05,
//                   color: '#FFF',
//                 }}
//               />
//               <TouchableOpacity onPress={sendMessage}>
//                 <Send />
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity
//               onPress={() => refRBSheet.current.open()}
//               style={{
//                 height: 40,
//                 width: 40,
//                 backgroundColor: '#FFF',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 100,
//               }}>
//               <Orange_Gift />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <RBSheet
//           ref={refRBSheet}
//           useNativeDriver={false}
//           draggable={true}
//           customStyles={{
//             container: {
//               borderTopLeftRadius: 50,
//               borderTopRightRadius: 50,
//               height: '50%',
//             },
//             wrapper: {backgroundColor: 'transparent'},
//             draggableIcon: {backgroundColor: '#000', width: '25%'},
//           }}
//           customModalProps={{
//             animationType: 'slide',
//             statusBarTranslucent: true,
//           }}
//           customAvoidingViewProps={{
//             enabled: false,
//           }}>
//           <FlatList
//             data={Gifts}
//             contentContainerStyle={{
//               flexDirection: 'row',
//               flexWrap: 'wrap',
//               justifyContent: 'space-evenly',
//               marginTop: 20,
//             }}
//             renderItem={({item}) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor: 'rgba(102, 62, 60, 0.6)',
//                     padding: 20,
//                     borderRadius: 10,
//                     marginVertical: 10,
//                   }}>
//                   <Image source={item.pic} style={{height: 40, width: 40}} />
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <Image source={item.gem} style={{height: 15, width: 15}} />
//                     <Text style={{color: '#FFF', marginLeft: 5}}>
//                       {item.price}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </RBSheet>
//       </View>
//     </View>
//   );
// };

// const {height, width} = Dimensions.get('screen');
// export default Video_Call;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Add_Fri,
  Coin,
  Em,
  Exit,
  Left_Arrow,
  Orange_Gift,
  Parti,
  Send,
} from '../../assets/Images';
import {Gifts} from '../../Dummy';
import {BASE_URL} from '../../mocks/authentication';
import sendSignalingData from '../../components/Send_Signal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YourComponent from '../../components/Global_Rom';
import axios from 'axios';
import {USER} from '../Api';

const configuration = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

const Video_Call = ({navigation, route}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [start, setStart] = useState(false);
  const [userData, setUserData] = useState();
  const [fullData, setfullData] = useState();
  const [videoAllowed, setVideoAllowed] = useState(false); // New state
  const {reciever, dash} = route.params;
  const pc = useRef(new RTCPeerConnection(configuration));
  const socket = useRef(null);
  const refRBSheet = useRef();

  const scrollViewRef = useRef(null);
  useEffect(() => {
    const getdata = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');
        const data = JSON.parse(accessToken);
        setUserData(data._id);
        console.log(userData);
        setfullData(data)
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };
    // YourComponent()
    // storeChatTopic()
    getdata();
  }, []);
  useEffect(() => {
    if (userData) {
      const initializeWebRTC = async () => {
        const globalRoom = userData;
        console.log('globalRoom', globalRoom);

        try {
          await startLocalStream();

          socket.current = io('http://192.168.100.12:5000/', {
            query: {
              globalRoom,
            },
            transports: ['websocket'],
            senderUserId: userData,
            receiverUserId: reciever,
          });

          socket.current.on('connect', () => {
            console.log('Socket connected');
            socket.current.emit('join-video'); // Request to join the video
          });

          socket.current.on('video-accepted', () => {
            console.log('Video accepted');
            setVideoAllowed(true);
          });

          socket.current.on('video-rejected', () => {
            console.log('Video rejected');
            setVideoAllowed(false);
          });

          socket.current.on('offer', async (offer) => {
            try {
              await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
              const answer = await pc.current.createAnswer();
              await pc.current.setLocalDescription(answer);
              socket.current.emit('answer', answer); // Send answer to server
            } catch (error) {
              console.error('Error handling offer:', error);
            }
          });

          socket.current.on('answer', async (answer) => {
            try {
              await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
            } catch (error) {
              console.error('Error handling answer:', error);
            }
          });

          socket.current.on('liveRoomConnect', (data) => {
            console.log('liveRoomConnect received:', data);
            // Handle the data (e.g., update state, show notifications, etc.)
          });
      
          // Handle liveReJoin event
          socket.current.on('liveReJoin', (success) => {
            console.log('liveReJoin received:', success);
            if (success) {
              // Handle successful rejoin
            } else {
              // Handle unsuccessful rejoin
            }
          });
      

          socket.current.on('candidate', async (candidate) => {
            try {
              await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
              console.error('Error handling candidate:', error);
            }
          });

          socket.current.on('chat-message', (chatMessage) => {
            console.log('Received chat message:', chatMessage);
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
          });

          pc.current.onicecandidate = (event) => {
            if (event.candidate) {
              socket.current.emit('candidate', event.candidate); // Send ICE candidate to server
            }
          };

          pc.current.ontrack = (event) => {
            if (event.streams && event.streams[0]) {
              setRemoteStream(event.streams[0]);
              setConnectionStatus('Connected');
            }
          };

          pc.current.onconnectionstatechange = () => {
            setConnectionStatus(pc.current.connectionState);
          };

          pc.current.oniceconnectionstatechange = () => {
            setConnectionStatus(pc.current.iceConnectionState);
          };
        } catch (error) {
          console.error('Error initializing WebRTC:', error);
        }
      };

      initializeWebRTC();

      return () => {
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
        }
        if (pc.current) {
          pc.current.close();
        }
        if (socket.current) {
          socket.current.disconnect();
        }
        socket.current.off('liveRoomConnect');
      };
    }
  }, [userData]);
  const joinLiveRoom = () => {
    const data = { localStream: liveStreamId };
    socket.current.emit('liveRoomConnect', data);
  };

  const rejoinLiveStream = () => {
    const data = { localStream: liveStreamId, userId:userData, isLive: true, liveStreamingId: liveStreamId };
    socket.current.emit('liveReJoin', data);
  };
  // const startCall = async () => {
  //   try {
  //     const offer = await pc.current.createOffer();
  //     await pc.current.setLocalDescription(offer);
  //     socket.current.emit('offer', offer);
  //     setConnectionStatus('Calling');
  //     const res = await axios.post(USER.USER_LIVE, {
  //       userId: userData,
  //       channel: userData,
  //     });
  //     console.log('Live stream started:', res);
  //   } catch (error) {
  //     console.error('Error starting call:', error);
  //   }
  // };
  // const startLocalStream = async () => {
  //   try {
  //     const stream = await mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //       displaySurface: 'application',
  //     });
  //     setLocalStream(stream);
  //     const offer = await pc.current.createOffer();
  //       await pc.current.setLocalDescription(offer);
  //       socket.current.emit('offer', offer);
  //       setConnectionStatus('Calling');

  //     stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
  //   } catch (error) {
  //     console.error('Error starting local stream:', error);
  //   }
  // };

  const handleStreamAction = async () => {
    if (reciever?.liveUserId) {
      // Join existing live stream
      joinLiveStream(true, localStream);
    } else {
      // Start a new live stream
      await startNewLiveStream();
    }
  };

  const startNewLiveStream = async () => {
    try {
      // Initialize WebRTC and Socket.io
      await startLocalStream();

      // Start the live stream
      const res = await axios.post(USER.USER_LIVE, {
        userId: userData,
        channel: userData,
      });
      console.log('Live stream started:', res);

      if (socket.current) {
        try {
          const offer = await pc.current.createOffer();
          await pc.current.setLocalDescription(offer);

          // Emit the offer to the server
          socket.current.emit('webrtcOffer', { offer, channel: userData });

          setConnectionStatus('Calling');
        } catch (error) {
          console.error('Error starting call:', error);
        }
      } else {
        console.error('Socket not connected');
      }
    } catch (error) {
      console.error('Error starting new live stream:', error);
    }
  };

  const joinLiveStream = (isLive, localStream) => {
    socket.current.emit('join-video', {
      liveStreamingId: reciever?.liveUserId,
      userId: userData,
      isLive,
      localStream,
    });

    socket.current.on('liveReJoin', (success) => {
      if (success) {
        console.log('Successfully joined the live stream room');
        // Handle success case
      } else {
        console.log('Failed to join the live stream room');
        // Handle failure case
      }
    });
  };
  const startLocalStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      stream.getTracks().forEach(track => pc.current.addTrack(track, stream));
    } catch (error) {
      console.error('Error starting local stream:', error);
}};
  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = { text: message };
      socket.current.emit('chat-message', chatMessage);
      setMessage('');
      console.log('Sent chat message:', chatMessage);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current && messages) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [messages]);

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (pc.current) {
      pc.current.close();
    }
    if (socket.current) {
      socket.current.disconnect();
    }
    setConnectionStatus('Disconnected');
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, width: '100%'}}>
        {start && videoAllowed && remoteStream && (
            console.log("sjaks============================================",remoteStream),
          <RTCView
            streamURL={remoteStream.toURL()}
            style={{flex: 1, width: '100%', height: '100%'}}
          />
        )}
        {localStream && (

          <RTCView
            streamURL={localStream.toURL()}
            style={{flex: 1, width: '50%', height: '50%'}}
          />
        )}
      </View>
      <View style={{position: 'absolute', height: height * 0.9, width: '100%'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <Image
                source={require('../../assets/Images/Icons/Ma1.png')}
                style={{height: 50, width: 50, borderRadius: 100}}
              />
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  flexDirection: 'row',
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: width * 0.3,
                  borderRadius: 10,
                }}>
                <Coin />
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Outfit-Regular',
                    fontSize: 18,
                  }}>
                  {fullData.user.rCoin}
                </Text>
              </View>
            </View>
            <View>
              {start ? (
                <TouchableOpacity
                  onPress={() => {
                    endCall();
                    setStart(false);
                  }}
                  style={{
                    backgroundColor: 'red',
                    padding: 5,
                    width: width * 0.2,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 16,
                      fontFamily: 'Outfit-Light',
                    }}>
                    End
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleStreamAction()
                    setStart(true);
                  }}
                  style={{
                    backgroundColor: 'blue',
                    padding: 5,
                    width: width * 0.2,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 16,
                      fontFamily: 'Outfit-Light',
                    }}>
                    {dash == true ?"join":"Start"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 10}}>
            <Parti />
          </TouchableOpacity>
          <View style={{position: 'absolute', bottom: '10%', height: '20%'}}>
            <ScrollView ref={scrollViewRef}>
              <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={{width: width * 0.8}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        paddingHorizontal: 15,
                        padding: 5,
                        borderRadius: 20,
                        marginLeft: 10,
                        alignSelf: 'flex-start',
                      }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          // marginLeft: 10,
                          // maxWidth: '3,
                        }}>
                        <Text style={{color: '#FFF', textAlign: 'center'}}>
                          {item.text}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: width * 0.9,
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
            }}>
            <Em />
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message"
              placeholderTextColor={'#8e8e8e'}
              style={{padding: 0, width: '55%', height: 40, color: '#FFF'}}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Send />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
              height: 40,
              width: 40,
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <Orange_Gift />
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          draggable={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              height: '50%',
            },
            wrapper: {backgroundColor: 'transparent'},
            draggableIcon: {backgroundColor: '#000', width: '25%'},
          }}>
          <FlatList
            data={Gifts}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(102, 62, 60, 0.6)',
                  padding: 20,
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Image source={item.pic} style={{height: 40, width: 40}} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={item.gem} style={{height: 15, width: 15}} />
                  <Text style={{color: '#FFF', marginLeft: 5}}>
                    {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </RBSheet>
      </View>
    </View>
  );
};

const {height, width} = Dimensions.get('screen');
export default Video_Call;



// import axios from 'axios';
// import React, {useEffect, useRef, useState} from 'react';
// import {View, Button, Text} from 'react-native';
// import {
//   RTCPeerConnection,
//   RTCView,
//   mediaDevices,
//   MediaStream,
//   RTCSessionDescription,
//   RTCIceCandidate,
// } from 'react-native-webrtc';
// // import axios from 'axios';
// // import {USER} from '../Api';
// import io from 'socket.io-client';
// import {USER} from './src/screens/Api';

// const configuration = {
//   iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
// };

// const Video_Call = ({navigation, route}) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(new MediaStream());
//   const [connectionStatus, setConnectionStatus] = useState('Disconnected');
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [start, setStart] = useState(false);
//   const [userData, setUserData] = useState();
//   const [videoAllowed, setVideoAllowed] = useState(false); // New state
//   const {reciever, dash} = route.params;
//   const pc = useRef(new RTCPeerConnection(configuration));
//   const socket = useRef(null);
//   const refRBSheet = useRef();

//   useEffect(() => {
//     const initializeWebRTC = async () => {
//       const globalRoom = userData;
//       console.log('globalRoom', globalRoom);
//       try {
//         await startLocalStream();
//         const globalRoom = '66a7e5ac14d00a5bbfe46b94';
//         socket.current = io('http://192.168.100.61:5000/', {
//           query: {
//             globalRoom,
//           },
//           transports: ['websocket'],
//           senderUserId: userData,
//           receiverUserId: reciever,
//         });

//         socket.current.on('connect', () => {
//           console.log('Connected to signaling server');
//         });

//         socket.current.on('offer', async offer => {
//           try {
//             await pc.current.setRemoteDescription(
//               new RTCSessionDescription(offer),
//             );
//             const answer = await pc.current.createAnswer();
//             await pc.current.setLocalDescription(answer);
//             socket.current.emit('answer', answer);
//           } catch (error) {
//             console.error('Error handling offer:', error);
//           }
//         });

//         socket.current.on('answer', async answer => {
//           try {
//             await pc.current.setRemoteDescription(
//               new RTCSessionDescription(answer),
//             );
//           } catch (error) {
//             console.error('Error handling answer:', error);
//           }
//         });

//         socket.current.on('candidate', async candidate => {
//           try {
//             await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//           } catch (error) {
//             console.error('Error handling candidate:', error);
//           }
//         });

//         pc.current.onicecandidate = event => {
//           if (event.candidate) {
//             socket.current.emit('candidate', event.candidate);
//           }
//         };

//         pc.current.ontrack = event => {
//           if (event.streams && event.streams[0]) {
//             setRemoteStream(event.streams[0]);
//             setConnectionStatus('Connected');
//           }
//         };

//         pc.current.onconnectionstatechange = () => {
//           console.log('Connection state changed:', pc.current.connectionState);
//           setConnectionStatus(pc.current.connectionState);
//         };

//         pc.current.oniceconnectionstatechange = () => {
//           console.log(
//             'ICE connection state changed:',
//             pc.current.iceConnectionState,
//           );
//           setConnectionStatus(pc.current.iceConnectionState);
//         };
//       } catch (error) {
//         console.error('Error initializing WebRTC:', error);
//       }
//     };

//     initializeWebRTC();

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//       if (pc.current) {
//         pc.current.close();
//       }
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, []);

//   const startLocalStream = async () => {
//     try {
//       const stream = await mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(stream);
//       stream.getTracks().forEach(track => {
//         pc.current.addTrack(track, stream);
//       });
//     } catch (error) {
//       console.error('Error starting local stream:', error);
//     }
//   };

//   const startCall = async () => {
//     try {
//       const offer = await pc.current.createOffer();
//       await pc.current.setLocalDescription(offer);
//       socket.current.emit('offer', offer);
//       setConnectionStatus('Calling');
//       const res = await axios.post(USER.USER_LIVE, {
//         userId: userData,
//         channel:userData,
//       });
//       console.log('Live stream started:', res);
//     } catch (error) {
//       console.error('Error starting call:', error);
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Text>Status: {connectionStatus}</Text>
//       {remoteStream && (
//         <RTCView streamURL={remoteStream.toURL()} style={{flex: 1}} />
//       )}
//       {localStream && (
//         <RTCView streamURL={localStream.toURL()} style={{flex: 1}} />
//       )}
//       <Button title="Start Call" onPress={startCall} />
//     </View>
//   );
// };

// export default Video_Call;
