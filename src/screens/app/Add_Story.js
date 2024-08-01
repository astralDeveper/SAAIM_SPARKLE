// import {
//   View,
//   Text,
//   SafeAreaView,
//   Dimensions,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import {
//   Alert,
//   Coin,
//   Crown,
//   For_Story,
//   Random,
//   Right_Arrow,
//   Store,
//   Video_C,
// } from '../../assets/Images';
// import {Explore, TopUsers} from '../../Dummy';

// const Add_Story = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View
//           style={{
//             flex: 1,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-evenly',
//               alignItems: 'center',
//               marginVertical: 20,
//             }}>
//             <View>
//               <Image
//                 source={require('../../assets/Images/Icons/Pro.png')}
//                 style={{
//                   height: 50,
//                   width: 50,
//                 }}
//               />
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: width * 0.25,
//               }}>
//               <Image
//                 source={require('../../assets/Images/Icons/Diamond.png')}
//                 style={{
//                   height: 30,
//                   width: 30,
//                 }}
//               />
//               <Text
//                 style={{
//                   color: '#FFF',
//                   fontFamily: 'Outfit-Bold',
//                   width: width * 0.15,
//                 }}>
//                 30.5k
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: width * 0.25,
//               }}>
//               <Coin />
//               <Text
//                 style={{
//                   color: '#FFF',
//                   fontFamily: 'Outfit-Bold',
//                   width: width * 0.15,
//                 }}>
//                 30.5k
//               </Text>
//             </View>
//             <View>
//               <Crown />
//             </View>
//           </View>
//           <TouchableOpacity
//           onPress={()=>{
//             navigation.navigate("Feed")
//           }}
//             style={{
//               backgroundColor: '#F94C84',
//               padding: 10,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: width * 0.9,
//               borderRadius: 10,
//               alignSelf: 'center',
//             }}>
//             <For_Story />
//             <Text
//               style={{
//                 color: '#FFF',
//                 fontSize: 20,
//                 fontFamily: 'Outfit-SeimBold',
//                 marginLeft: 20,
//               }}>
//               Add Story
//             </Text>
//           </TouchableOpacity>
//           <View
//             style={{
//               alignItems: 'center',
//               marginVertical: 30,
//             }}>
//             <Image
//               source={require('../../assets/Images/PNG/Below_Story.png')}
//             />
//           </View>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#282828',
//               flexDirection: 'row',
//               alignItems: 'center',
//               padding: 10,
//               width: width * 0.9,
//               borderRadius: 10,
//               justifyContent: 'space-between',
//               alignSelf: 'center',
//               marginVertical: 10,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Random />
//               <Text
//                 style={{
//                   color: '#FFF',
//                   fontSize: 18,
//                   fontFamily: 'Outfit-Regular',
//                   marginLeft: 30,
//                 }}>
//                 Random Chat
//               </Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: 'rgba(217,217,217,0.3)',
//                 borderRadius: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 30,
//                 width: 30,
//               }}>
//               <Right_Arrow />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#282828',
//               flexDirection: 'row',
//               alignItems: 'center',
//               padding: 10,
//               width: width * 0.9,
//               borderRadius: 10,
//               justifyContent: 'space-between',
//               alignSelf: 'center',
//               marginVertical: 10,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Video_C />
//               <Text
//                 style={{
//                   color: '#FFF',
//                   fontSize: 18,
//                   fontFamily: 'Outfit-Regular',
//                   marginLeft: 30,
//                 }}>
//                 Video Call
//               </Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: 'rgba(217,217,217,0.3)',
//                 borderRadius: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 30,
//                 width: 30,
//               }}>
//               <Right_Arrow />
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#282828',
//               flexDirection: 'row',
//               alignItems: 'center',
//               padding: 10,
//               width: width * 0.9,
//               borderRadius: 10,
//               justifyContent: 'space-between',
//               alignSelf: 'center',
//               marginVertical: 10,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Store />
//               <Text
//                 style={{
//                   color: '#FFF',
//                   fontSize: 18,
//                   fontFamily: 'Outfit-Regular',
//                   marginLeft: 30,
//                 }}>
//                 Store
//               </Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: 'rgba(217,217,217,0.3)',
//                 borderRadius: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 30,
//                 width: 30,
//               }}>
//               <Right_Arrow />
//             </View>
//           </TouchableOpacity>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: width * 0.8,
//               alignSelf: 'center',marginVertical:20
//             }}>
//             <Alert />
//             <View
//               style={{
//                 width: width * 0.7,
//               }}>
//               <Text
//                 style={{
//                   color: '#FFF',
//                   textAlign: 'justify',
//                 }}>
//                 Any kind of content which promotes nudity, smoking, alcohol is
//                 not allowed. Streaming this kind of content might result to a
//                 permanent account ban.
//               </Text>
//               <Text
//                 style={{
//                   color: '#FFF',
//                   textAlign: 'justify',
//                   marginTop: 10,
//                 }}>
//                 Viewers must be 18 or older to recharge and send gifts.
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const {height, width} = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#120030',
//   },
// });

// export default Add_Story;
