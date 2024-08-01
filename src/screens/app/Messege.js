// import React, {Fragment, useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import {Add_Fri, Mag, People, Random} from '../../assets/Images';
// import {Chat_Data, Freiend, Request} from '../../Dummy';
// import {Image} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import {USER} from '../Api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import getChatList from '../../components/getlist';
// import {formatTime, getUserDetails} from '../../mocks/global';
// import Toast from 'react-native-toast-message';

// const Messege = ({navigation}) => {
//   const scrollViewRef = useRef();
//   const [currentScreen, setCurrentScreen] = useState(0);
//   const [userId, setsenderId] = useState();
//   const [infiniteStop, setinfiniteStop] = useState(true);
//   const [chatList, setChatList] = useState([]);
//   const [chatTopics, setChatTopics] = useState([]);
//   const [usersList, setusersList] = useState();
//   const [chatId, setChatId] = useState();
//   const [status, setstatus] = useState('pending');
//   const [idFromfriendrequest, setidFromfriendrequest] = useState();
//   // console.log('u=================', userId);
//   useEffect(() => {
//     const getdata = async () => {
//       try {
//         const accessToken = await AsyncStorage.getItem('userInfo');
//         const data = JSON.parse(accessToken);
//         setsenderId(data?._id);
//         // setMyId(data._id);
//       } catch (error) {
//         console.error('Error fetching profile details:', error.message);
//       }
//     };

//     getdata();
//   }, []);
//   useEffect(() => {
//     // Fetch all users from the backend
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(USER.GET_ALL_USERS); // Adjust the endpoint as needed
//         if (response.data.status) {
//           // console.log(response.data.users);
//           setusersList(response.data.users);
//         } else {
//           // setError(response.data.message);
//           console.log(response.data.message);
//         }
//       } catch (err) {
//         setError('An error occurred while fetching users.');
//       }
//     };

//     fetchUsers();
//   }, []);
//   // useEffect(() => {
//   //   // Fetch all users from the backend
//   //   const getusers = async () => {
//   //     try {
//   //       const response = await axios.post(USER.GET_DETAILS, {
//   //         userId: '66a47ac7ae2581bc40a0a0d2',
//   //       }); // Adjust the endpoint as needed
//   //       if (response.data.status) {
//   //         // console.log("Users=============>",response.data);
//   //         setreqUsers(response.data.user);
//   //       } else {
//   //         // setError(response.data.message);
//   //         console.log(response.data.message);
//   //       }
//   //     } catch (err) {
//   //       console.log('An error occurred while fetching users.');
//   //     }
//   //   };

//   //   getusers();
//   // }, []);
//   const scrollToSection = sectionIndex => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         x: sectionIndex * 400,
//         animated: true,
//       });
//       setCurrentScreen(sectionIndex);
//     }
//   };

//   const handleMomentumScrollEnd = event => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const sectionIndex = Math.round(offsetX / 400);
//     setCurrentScreen(sectionIndex);
//   };

//   useEffect(() => {
//     const fetchChatList = async () => {
//       try {
//         const list = await getChatList(userId);
//         setChatList(list);
//         // console.log('================');
//         // setLoading(false);
//       } catch (err) {
//         // setError(err.message);
//         // setLoading(false);
//       }
//     };

//     // fetchChatList();
//   }, [userId]);
//   useEffect(() => {
//     setTimeout(() => {
//       Income_Req();
//       // console.log('TOche', userId);
//     }, 5000);
//   }, []);
//   const Income_Req = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem('userInfo');
//       if (!accessToken) {
//         throw new Error('No access token found');
//       }

//       const user = JSON.parse(accessToken);
//       if (!user || !user._id) {
//         throw new Error('Invalid user information');
//       }

//       // console.log('User ID:', user._id);

//       const response = await axios.get(`${USER.INCOME_FRIENDS}/${user._id}`);
//       // console.log('Raw response:', response.data);

//       if (response.data && response.data.status) {
//         // console.log('Request Response:', response.data);

//         setidFromfriendrequest(response.data.user);
//       } else {
//         throw new Error(response.data.message || 'Unexpected error occurred');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Axios error:', error.response?.data || error.message);
//       } else if (error instanceof SyntaxError) {
//         console.error('JSON Parsing error:', error.message);
//       } else {
//         console.error('Error Getting Friend Requests:', error.message);
//       }

//       throw error;
//     }
//   };
//   // console.log(idFromfriendrequest)
//   useEffect(() => {
//     fetchUsers();
//   }, [chatTopics]);
//   // console.log(idFromfriendrequest); // Check if this logs an array
//   // const Freidsid = idFromfriendrequest
//   //   ? idFromfriendrequest.find(item => item.friendId)
//   //   : null;
//   // console.log("Helloooo======>",Freidsid);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(
//         USER.GET_ALL_USER_CHAT,
//         // {
//         // params: {
//         //   start: 1,
//         //   limit: 10,
//         //   search: 'ALL', // Change this as needed
//         //   type: 'Fake', // or 'Real' based on your query
//         //   startDate: 'ALL', // Set appropriate date
//         //   endDate: 'ALL', // Set appropriate date
//         // },
//         // }
//       );

//       if (response.status === 200) {
//         if (response.data.status) {
//           // const filteredChats = response.data.chatTopics.filter(chat =>
//           //   chat.participants.includes(userId),
//           // );
//           const data = response.data.chatTopics;
//           // const combinedData = data.reduce((acc, item) => {
//           //   return {...acc, ...item};
//           // }, {});
//           // console.log("Hellllo",response.data.chatTopics[0]._id)
//           setChatId(response.data.chatTopics);
//           setChatTopics(Array.isArray(data) ? data : []);
//         } else {
//           throw new Error(response.data.message || 'Data not found');
//         }
//       } else {
//         throw new Error('Failed to fetch data from server');
//       }
//     } catch (error) {
//       // Network or server error
//       let errorMessage = 'Something went wrong!';
//       if (error.response) {
//         // Server responded with a status other than 200
//         switch (error.response.status) {
//           case 400:
//             errorMessage = 'Bad Request';
//             break;
//           case 401:
//             errorMessage = 'Unauthorized';
//             break;
//           case 403:
//             errorMessage = 'Forbidden';
//             break;
//           case 404:
//             errorMessage = 'Not Found';
//             break;
//           case 500:
//             errorMessage = 'Internal Server Error';
//             break;
//           default:
//             errorMessage = `Unexpected error: ${error.response.status}`;
//         }
//       } else if (error.request) {
//         // Request was made but no response received
//         errorMessage = 'No response from server';
//       } else {
//         // Other errors
//         errorMessage = error.message;
//       }
//       // setError(errorMessage);
//     } finally {
//       // setLoading(false);
//     }
//   };
//   // console.log(chatTopics[0]._id);
//   const getHeaderText = () => {
//     if (currentScreen === 0) {
//       return 'Chat';
//     } else if (currentScreen === 1) {
//       return 'Friends';
//     } else if (currentScreen === 2) {
//       return 'Friends Request';
//     }
//     return '';
//   };
//   const dataArray = [idFromfriendrequest];
//   // console.log("DATATATA",idFromfriendrequest)
//   const handleAcceptRequest = async item => {
//     try {
//       const response = await axios.post(USER.ACCEPT_REQUEST, {
//         userId: userId,
//         friendId: item._id,
//       });
//       // setMessage(response.data.message);
//       console.log(response.data);

//       Toast.show({
//         type: 'success',
//         text1: response.data.message,
//       });
//       // setError(null);
//     } catch (err) {
//       console.log(
//         err.response
//           ? err.response.data.message
//           : 'Error accepting friend request',
//       );
//       // setMessage('');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <Text style={styles.headerText}>{getHeaderText()}</Text>
//       </View>
//       <View style={styles.navigation}>
//         <TouchableOpacity
//           onPress={() => scrollToSection(0)}
//           style={styles.navButton}>
//           <Random />
//           <Text style={styles.navButtonText}>Chat</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => scrollToSection(1)}
//           style={styles.navButton}>
//           <People />
//           <Text style={styles.navButtonText}>People</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => scrollToSection(2)}
//           style={styles.navButton}>
//           <Add_Fri />
//           <Text style={styles.navButtonText}>Request</Text>
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: '#FFF',
//           alignItems: 'center',
//           padding: 10,
//           width: width * 0.9,
//           borderRadius: 100,
//           alignSelf: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <Mag />
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor={'#8e8e8e'}
//           style={{
//             padding: 2,
//             width: width * 0.75,
//             color: '#000',
//             fontSize: 18,
//             fontFamily: 'Outfit-Regular',
//           }}
//         />
//       </View>
//       <ScrollView
//         scrollEnabled={false}
//         showsHorizontalScrollIndicator={false}
//         ref={scrollViewRef}
//         horizontal={true}
//         style={styles.scrollView}
//         onMomentumScrollEnd={handleMomentumScrollEnd}>
//         <View style={[styles.section, {width: width}]}>
//           <ScrollView>
//             {/* <FlatList
//               contentContainerStyle={{
//                 marginTop: 30,
//               }}
//               data={chatId}
//               renderItem={({item, index}) => {
//                 // let data;
//                 // const exists = item.participants.some(id => id == userId);
//                 // const otherId = item.participants.find(id => id !== userId);
//                 // console.log('FIne', item);
//                 return (
                  
//                   <TouchableOpacity
//                     onPress={() => {
//                       navigation.navigate('Chat_Scre', {
//                         reciever: item.participants.id,
//                         // ConversationId:item._id
//                         mesegeToshwo: item.messages,
//                       });
//                     }}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       width: width * 0.85,
//                       alignSelf: 'center',
//                       marginVertical: 10,
//                       backgroundColor: '#343434',
//                       padding: 10,
//                       borderRadius: 10,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                       }}>
//                       <Image
//                         source={
//                           // data?.image
//                           //   ? {uri: data.image}
//                           //   :
//                           require('../../assets/Images/PNG/Sugp.png')
//                         }
//                         style={{height: 50, width: 50, borderRadius: 100}}
//                       />
//                       <View
//                         style={{
//                           width: width * 0.4,
//                           marginLeft: 25,
//                         }}>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             color: '#FFF',
//                             fontSize: 18,
//                             fontFamily: 'Outfit-Regular',
//                           }}>
//                           {item?.name ? item?.name : 'Unknown'}
//                         </Text>
//                         <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             color: 'rgba(255,255,255,0.5)',
//                             fontSize: 15,
//                             fontFamily: 'Outfit-Regular',
//                           }}>
//                           {formatTime(item.updatedAt)}
//                         </Text>
//                       </View>
//                     </View>
//                     <View>
//                       <Text
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                         style={{
//                           color: 'rgba(255,255,255,0.8)',
//                           fontSize: 13,
//                           fontFamily: 'Outfit-Light',
//                         }}>
//                         {formatTime(item.createdAt)}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               }}
//             /> */}
//             {Array.isArray(chatTopics) &&
//               chatTopics.map((item, userIndex) =>
//                 item.participants.map((user, index) => (
//                   <Fragment key={index}>
//                     {user?._id !== userId ? (
//                       <TouchableOpacity>
//                         <TouchableOpacity
//                           onPress={() => {
//                             navigation.navigate('Chat_Scre', {
//                               reciever: user?._id,
//                               // ConversationId:item._id
//                               mesegeToshwo: item.messages,
//                             });
//                           }}
//                           style={{
//                             padding: 10,
//                             justifyContent: 'space-between',
//                             backgroundColor: '#343434',
//                             width: width * 0.85,
//                             alignSelf: 'center',
//                             borderRadius: 10,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                           }}>
//                           <Image
//                             source={require('../../assets/Images/Icons/Ex1.png')}
//                             style={{
//                               height: 60,
//                               width: 60,
//                               borderRadius: 100,
//                             }}
//                           />
//                           <View
//                             style={{
//                               width: width * 0.2,
//                             }}>
//                             <Text
//                               numberOfLines={1}
//                               ellipsizeMode={'tail'}
//                               style={{
//                                 color: '#FFF',
//                                 fontSize: 20,
//                                 fontFamily: 'ABeeZee-Italic',
//                                 // width: width * 0.4,
//                               }}>
//                               {/* {user?.name} */}
//                               {
//                                 // userInfo?.isprofileshown?.find(
//                                 //   id => id == conersationId,
//                                 // )
//                                 //   ? user?.realName
//                                 //   : user?.displayName
//                                 user?.name
//                               }
//                             </Text>
//                           </View>

//                           <Text style={{color: '#FFF'}}>
//                             {formatTime(item.updatedAt)}
//                           </Text>
//                         </TouchableOpacity>
//                       </TouchableOpacity>
//                     ) : (
//                       <></>
//                     )}
//                   </Fragment>
//                 )),
//               )}
//           </ScrollView>
//         </View>
//         <View
//           style={[
//             styles.section,
//             {
//               width: width * 1.1,
//               alignItems: 'center',
//               paddingLeft: width * 0.06,
//             },
//           ]}>
//           <ScrollView>
//             <View
//               style={{
//                 width: width * 1.1,
//                 alignItems: 'center',
//               }}>
//               <FlatList
//                 contentContainerStyle={{
//                   marginTop: 30,
//                   alignItems: 'center',
//                   width: width * 1.1,
//                 }}
//                 data={usersList}
//                 renderItem={({item, index}) => {
//                   return (
//                     <View>
//                       {userId == item._id ? null : (
//                         <TouchableOpacity
//                           onPress={() => {
//                             navigation.navigate('Chat_Scre', {
//                               reciever: item?._id,
//                               // ConversationId:item._id
//                               // mesegeToshwo: item.messages,
//                             });
//                           }}
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             width: width * 0.85,
//                             alignSelf: 'center',
//                             marginVertical: 10,
//                             backgroundColor: '#343434',
//                             padding: 10,
//                             borderRadius: 10,
//                           }}>
//                           <Image
//                             source={
//                               // item.pic

//                               require('../../assets/Images/PNG/Sugp.png')
//                             }
//                             style={{height: 30, width: 30, borderRadius: 100}}
//                           />
//                           <View
//                             style={{
//                               width: width * 0.65,
//                             }}>
//                             <Text
//                               numberOfLines={1}
//                               ellipsizeMode="tail"
//                               style={{
//                                 color: '#FFF',
//                                 fontSize: 18,
//                                 fontFamily: 'Outfit-Regular',
//                               }}>
//                               {item.name}
//                             </Text>
//                           </View>
//                           <Text
//                             numberOfLines={1}
//                             ellipsizeMode="tail"
//                             style={{
//                               color: 'rgba(255,255,255,0.8)',
//                               fontSize: 13,
//                               fontFamily: 'Outfit-Light',
//                             }}>
//                             {item.time}
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//           </ScrollView>
//         </View>
//         <View style={styles.section}>
//           <ScrollView>
//             <FlatList
//               contentContainerStyle={{
//                 marginTop: 30,
//               }}
//               data={dataArray}
//               renderItem={({item, index}) => {
//                 return (
//                   <View>
//                     {status == 'pending' ? (
//                       <View
//                         style={{
//                           alignItems: 'center',
//                           // justifyContent: 'space-between',
//                           width: width * 0.85,
//                           alignSelf: 'center',
//                           marginVertical: 10,
//                           backgroundColor: '#343434',
//                           padding: 10,
//                           borderRadius: 10,
//                         }}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             width: width * 0.8,
//                           }}>
//                           <Image
//                             source={require('../../assets/Images/PNG/Sugp.png')}
//                             // {item.pic}
//                             style={{
//                               height: 60,
//                               width: 60,
//                               borderRadius: 100,
//                             }}
//                           />
//                           <View
//                             style={{
//                               width: width * 0.6,
//                             }}>
//                             <Text
//                               numberOfLines={2}
//                               ellipsizeMode="tail"
//                               style={{
//                                 color: '#FFF',
//                                 fontSize: 15,
//                                 fontFamily: 'Outfit-Regular',
//                               }}>
//                               {item?.name}{' '}
//                               <Text
//                                 style={{
//                                   fontSize: 13,
//                                   fontFamily: 'Outfit-Light',
//                                 }}>
//                                 send you a friend request.
//                               </Text>
//                             </Text>
//                             {/* <Text
//                           numberOfLines={1}
//                           ellipsizeMode="tail"
//                           style={{
//                             color: 'rgba(255,255,255,0.8)',
//                             fontSize: 13,
//                             fontFamily: 'Outfit-Light',
//                           }}>
//                           {item.time}
//                         </Text> */}
//                           </View>
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             marginVertical: 20,
//                             alignItems: 'center',
//                             justifyContent: 'space-around',
//                             width: width * 0.8,
//                           }}>
//                           <TouchableOpacity
//                             onPress={() => {
//                               handleAcceptRequest(item);
//                               setstatus('accepted');
//                             }}>
//                             <LinearGradient
//                               colors={['#E00A9E', '#8727F3']}
//                               start={{x: 0, y: 0}}
//                               end={{x: 1, y: 1}}
//                               style={{
//                                 padding: 10,
//                                 alignItems: 'center',
//                                 borderRadius: 10,
//                                 width: width * 0.25,
//                               }}>
//                               <Text style={{color: '#FFF', fontSize: 18}}>
//                                 Confirm
//                               </Text>
//                             </LinearGradient>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.buttonContainer}>
//                             <LinearGradient
//                               colors={['#ff00ff', '#00ffff']} // Replace with your gradient colors
//                               start={{x: 0, y: 0}}
//                               end={{x: 1, y: 1}}
//                               style={styles.gradientBorder}>
//                               <View style={styles.button}>
//                                 <Text style={styles.buttonText}>Cancel</Text>
//                               </View>
//                             </LinearGradient>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     ) : null}
//                   </View>
//                 );
//               }}
//             />
//           </ScrollView>
//         </View>
//       </ScrollView>
//       <Toast />
//     </View>
//   );
// };
// const {width, height} = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#120030',
//   },
//   headerText: {
//     fontSize: 30,
//     fontFamily: 'Outfit-Bold',
//     color: '#FFF',
//     alignSelf: 'center',
//     margin: 20,
//   },
//   navigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   navButton: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   navButtonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontFamily: 'Outfit-Regular',
//     marginTop: 5,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   section: {
//     width: width, // Adjust the width of each section as needed
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // paddingRight: width * 0.06,
//     marginTop: 20,
//   },
//   sectionText: {
//     fontSize: 24,
//     color: '#FFF',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   gradientBorder: {
//     padding: 2, // Border width
//     borderRadius: 10,
//   },
//   button: {
//     backgroundColor: '#333333', // Button background color
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default Messege;

import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { Add_Fri, Mag, People, Random } from '../../assets/Images';
import { Chat_Data, Freiend, Request } from '../../Dummy';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { USER } from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getChatList from '../../components/getlist';
import { formatTime, getUserDetails } from '../../mocks/global';

const Messege = ({ navigation }) => {
  const scrollViewRef = useRef();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userId, setsenderId] = useState();
  const [infiniteStop, setinfiniteStop] = useState(true);
  const [chatList, setChatList] = useState([]);
  const [chatTopics, setChatTopics] = useState([]);
  const [usersList, setusersList] = useState();
  const [chatId, setChatId] = useState();
  const [idFromfriendrequest, setidFromfriendrequest] = useState();
  // console.log('u=================', userId);
  useEffect(() => {
    const getdata = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');
        const data = JSON.parse(accessToken);
        setsenderId(data?._id);
        // setMyId(data._id);
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };

    getdata();
  }, []);
  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USER.GET_ALL_USERS); // Adjust the endpoint as needed
        if (response.data.status) {
          // console.log(response.data.users);
          setusersList(response.data.users);
        } else {
          // setError(response.data.message);
          console.log(response.data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching users.');
      }
    };

    fetchUsers();
  }, []);
  // useEffect(() => {
  //   // Fetch all users from the backend
  //   const getusers = async () => {
  //     try {
  //       const response = await axios.post(USER.GET_DETAILS, {
  //         userId: '66a47ac7ae2581bc40a0a0d2',
  //       }); // Adjust the endpoint as needed
  //       if (response.data.status) {
  //         // console.log("Users=============>",response.data);
  //         setreqUsers(response.data.user);
  //       } else {
  //         // setError(response.data.message);
  //         console.log(response.data.message);
  //       }
  //     } catch (err) {
  //       console.log('An error occurred while fetching users.');
  //     }
  //   };

  //   getusers();
  // }, []);
  const scrollToSection = (sectionIndex) => {
    if (scrollViewRef.current) {
      // Calculate the horizontal scroll position
      const offsetX = sectionIndex * width; // Use `width` variable instead of hardcoding 400
      scrollViewRef.current.scrollTo({
        x: offsetX,
        animated: true,
      });
      setCurrentScreen(sectionIndex);
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    // Calculate section index based on the width of each section
    const sectionIndex = Math.round(offsetX / width); // Use `width` variable
    setCurrentScreen(sectionIndex);
  };

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const list = await getChatList(userId);
        setChatList(list);
        // console.log('================');
        // setLoading(false);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
      }
    };

    // fetchChatList();
  }, [userId]);
  useEffect(() => {
    setTimeout(() => {
      Income_Req();
      // console.log('TOche', userId);
    }, 5000);
  }, []);
  const Income_Req = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userInfo');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const user = JSON.parse(accessToken);
      if (!user || !user._id) {
        throw new Error('Invalid user information');
      }

      // console.log('User ID:', user._id);

      const response = await axios.get(`${USER.INCOME_FRIENDS}/${user._id}`);
      // console.log('Raw response:', response.data);

      if (response.data && response.data.status) {
        // console.log('Request Response:', response.data);

        setidFromfriendrequest(response.data.user);
      } else {
        throw new Error(response.data.message || 'Unexpected error occurred');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else if (error instanceof SyntaxError) {
        console.error('JSON Parsing error:', error.message);
      } else {
        console.error('Error Getting Friend Requests:', error.message);
      }

      throw error;
    }
  };
  // console.log(idFromfriendrequest)
  useEffect(() => {
    fetchUsers();
  }, [chatTopics]);
  // console.log(idFromfriendrequest); // Check if this logs an array
  // const Freidsid = idFromfriendrequest
  //   ? idFromfriendrequest.find(item => item.friendId)
  //   : null;
  // console.log("Helloooo======>",Freidsid);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        USER.GET_ALL_USER_CHAT,
        // {
        // params: {
        //   start: 1,
        //   limit: 10,
        //   search: 'ALL', // Change this as needed
        //   type: 'Fake', // or 'Real' based on your query
        //   startDate: 'ALL', // Set appropriate date
        //   endDate: 'ALL', // Set appropriate date
        // },
        // }
      );

      if (response.status === 200) {
        if (response.data.status) {
          // const filteredChats = response.data.chatTopics.filter(chat =>
          //   chat.participants.includes(userId),
          // );
          const data = response.data.chatTopics;
          // const combinedData = data.reduce((acc, item) => {
          //   return {...acc, ...item};
          // }, {});
          // console.log("Hellllo",response.data.chatTopics[0]._id)
          setChatId(response.data.chatTopics);
          setChatTopics(Array.isArray(data) ? data : []);
        } else {
          throw new Error(response.data.message || 'Data not found');
        }
      } else {
        throw new Error('Failed to fetch data from server');
      }
    } catch (error) {
      // Network or server error
      let errorMessage = 'Something went wrong!';
      if (error.response) {
        // Server responded with a status other than 200
        switch (error.response.status) {
          case 400:
            errorMessage = 'Bad Request';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 403:
            errorMessage = 'Forbidden';
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break;
          default:
            errorMessage = `Unexpected error: ${error.response.status}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server';
      } else {
        // Other errors
        errorMessage = error.message;
      }
      // setError(errorMessage);
    } finally {
      // setLoading(false);
    }
  };
  // console.log(chatTopics[0]._id);
  const getHeaderText = () => {
    if (currentScreen === 0) {
      return 'Chat';
    } else if (currentScreen === 1) {
      return 'Friends';
    } else if (currentScreen === 2) {
      return 'Friends Request';
    }
    return '';
  };
  const dataArray = [idFromfriendrequest];
  // console.log("DATATATA",idFromfriendrequest)
  const handleAcceptRequest = async (item) => {
    try {
      const response = await axios.post(USER.ACCEPT_REQUEST, {
        userId: userId,
        friendId: item._id,
      });
      // setMessage(response.data.message);
      console.log(response.data);
      // setError(null);
    } catch (err) {
      console.log(
        err.response
          ? err.response.data.message
          : 'Error accepting friend request',
      );
      // setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>{getHeaderText()}</Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => scrollToSection(0)}
          style={styles.navButton}>
          <Random />
          <Text style={styles.navButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollToSection(1)}
          style={styles.navButton}>
          <People />
          <Text style={styles.navButtonText}>People</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => scrollToSection(2)}
          style={styles.navButton}>
          <Add_Fri />
          <Text style={styles.navButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFF',
          alignItems: 'center',
          padding: 10,
          width: width * 0.9,
          borderRadius: 100,
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <Mag />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#8e8e8e'}
          style={{
            padding: 2,
            width: width * 0.75,
            color: '#000',
            fontSize: 18,
            fontFamily: 'Outfit-Regular',
          }}
        />
      </View>
      <ScrollView
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        horizontal={true}
        style={styles.scrollView}
        onMomentumScrollEnd={handleMomentumScrollEnd}>
        <View style={styles.section}>
          <ScrollView>
            {/* <FlatList
              contentContainerStyle={{
                marginTop: 30,
              }}
              data={chatId}
              renderItem={({item, index}) => {
                // let data;
                // const exists = item.participants.some(id => id == userId);
                // const otherId = item.participants.find(id => id !== userId);
                // console.log('FIne', item);
                return (
                  
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Chat_Scre', {
                        reciever: item.participants.id,
                        // ConversationId:item._id
                        mesegeToshwo: item.messages,
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: width * 0.85,
                      alignSelf: 'center',
                      marginVertical: 10,
                      backgroundColor: '#343434',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={
                          // data?.image
                          //   ? {uri: data.image}
                          //   :
                          require('../../assets/Images/PNG/Sugp.png')
                        }
                        style={{height: 50, width: 50, borderRadius: 100}}
                      />
                      <View
                        style={{
                          width: width * 0.4,
                          marginLeft: 25,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: '#FFF',
                            fontSize: 18,
                            fontFamily: 'Outfit-Regular',
                          }}>
                          {item?.name ? item?.name : 'Unknown'}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: 15,
                            fontFamily: 'Outfit-Regular',
                          }}>
                          {formatTime(item.updatedAt)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: 13,
                          fontFamily: 'Outfit-Light',
                        }}>
                        {formatTime(item.createdAt)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            /> */}
            {Array.isArray(chatTopics) &&
              chatTopics.map((item, userIndex) =>
                item.participants.map((user, index) => (
                  <Fragment key={index}>
                    {user?._id !== userId ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Chat_Scre', {
                            reciever: user?._id,
                            // ConversationId:item._id
                            mesegeToshwo: item.messages,
                          });
                        }}
                        style={{
                          padding: 10,
                          justifyContent: 'space-between',
                          backgroundColor: '#343434',
                          width: width * 0.85,
                          marginBottom: 10,
                          alignSelf: 'center',
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../assets/Images/Icons/Ex1.png')}
                          style={{
                            height: 60,
                            width: 60,
                            borderRadius: 100,
                          }}
                        />
                        <View
                          style={{
                            width: width * 0.2,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={{
                              color: '#FFF',
                              fontSize: 20,
                              fontFamily: 'ABeeZee-Italic',
                              // width: width * 0.4,
                            }}>
                            {/* {user?.name} */}
                            {
                              // userInfo?.isprofileshown?.find(
                              //   id => id == conersationId,
                              // )
                              //   ? user?.realName
                              //   : user?.displayName
                              user?.name
                            }
                          </Text>
                        </View>

                        <Text style={{ color: '#FFF' }}>
                          {formatTime(item.updatedAt)}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </Fragment>
                )),
              )}
          </ScrollView>
        </View>
        <View
          style={styles.section}>
          <ScrollView>
            <View
              style={{
                width: width,
                alignItems: 'center',
              }}>
              <FlatList
                contentContainerStyle={{
                  marginTop: 30,
                  alignItems: 'center',
                  width: width,
                }}
                data={usersList}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: width * 0.85,
                        alignSelf: 'center',
                        marginVertical: 10,
                        backgroundColor: '#343434',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={
                          // item.pic

                          require('../../assets/Images/PNG/Sugp.png')
                        }
                        style={{ height: 30, width: 30, borderRadius: 100 }}
                      />
                      <View
                        style={{
                          width: width * 0.65,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: '#FFF',
                            fontSize: 18,
                            fontFamily: 'Outfit-Regular',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: 13,
                          fontFamily: 'Outfit-Light',
                        }}>
                        {item.time}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.section}>
          <ScrollView>
            <FlatList
              contentContainerStyle={{
                marginTop: 30,
              }}
              data={dataArray}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      // justifyContent: 'space-between',
                      width: width * 0.85,
                      alignSelf: 'center',
                      marginVertical: 10,
                      backgroundColor: '#343434',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: width * 0.8,
                      }}>
                      <Image
                        source={require('../../assets/Images/PNG/Sugp.png')}
                        // {item.pic}
                        style={{ height: 60, width: 60, borderRadius: 100 }}
                      />
                      <View
                        style={{
                          width: width * 0.6,
                        }}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            color: '#FFF',
                            fontSize: 15,
                            fontFamily: 'Outfit-Regular',
                          }}>
                          {item?.name}{' '}
                          <Text
                            style={{
                              fontSize: 13,
                              fontFamily: 'Outfit-Light',
                            }}>
                            send you a friend request.
                          </Text>
                        </Text>
                        {/* <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: 13,
                            fontFamily: 'Outfit-Light',
                          }}>
                          {item.time}
                        </Text> */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 20,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: width * 0.8,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          handleAcceptRequest(item);
                        }}>
                        <LinearGradient
                          colors={['#E00A9E', '#8727F3']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            padding: 10,
                            alignItems: 'center',
                            borderRadius: 10,
                            width: width * 0.25,
                          }}>
                          <Text style={{ color: '#FFF', fontSize: 18 }}>
                            Confirm
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonContainer}>
                        <LinearGradient
                          colors={['#ff00ff', '#00ffff']} // Replace with your gradient colors
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.gradientBorder}>
                          <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120030',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Outfit-Bold',
    color: '#FFF',
    alignSelf: 'center',
    margin: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  navButton: {
    padding: 10,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    width: width, // Adjust the width of each section as needed
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingRight: width * 0.06,
    marginTop: 20,
  },
  sectionText: {
    fontSize: 24,
    color: '#FFF',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    padding: 2, // Border width
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#333333', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Messege;
