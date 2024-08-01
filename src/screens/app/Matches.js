// import {View, Text, SafeAreaView, Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import React, { useState } from 'react';

// const Matches = () => {
//   const [selected, setSelected] = useState('both');
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: '#120030',
//       }}>
//       <View
//         style={{
//           flex: 1,
//         }}>
//         <Text
//           style={{
//             color: '#FFF',
//             fontSize: 20,
//             fontFamily: 'Outfit-Regular',
//             textAlign: 'center',
//             marginTop: 50,
//           }}>
//           Sparkle
//         </Text>
//         <Text
//           style={{
//             color: '#FFF',
//             fontSize: 25,
//             fontFamily: 'Outfit-SemiBold',
//             textAlign: 'center',marginTop:20

//           }}>
//           Find your best match
//         </Text>
//             <Text
//               style={{
//                 color: '#FFF',
//                 fontSize: 20,
//                 fontFamily: 'Outfit-Regular',
//                 textAlign: 'center',
//                 marginTop: 20,width:width*0.6,alignSelf:"center"
//               }}>
//               Find Your Spark: Where
//               Connections Ignite
//             </Text>
//             <View style={{
//               alignItems:"center",marginVertical:40
//             }}>
//               <Image source={require("../../assets/Images/Icons/Mat.png")}
//               style={{resizeMode:"contain"}}
//               />
//             </View>
//             <View style={styles.container}>
//       <TouchableOpacity
//         style={[styles.option, selected === 'boys' && styles.selectedOption]}
//         onPress={() => setSelected('boys')}
//       >
//         <Text style={[styles.optionText, selected === 'boys' && styles.selectedText]}>BOYS</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.option, selected === 'both' && styles.selectedOption]}
//         onPress={() => setSelected('both')}
//       >
//         <Text style={[styles.optionText, selected === 'both' && styles.selectedText]}>BOTH</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.option, selected === 'girls' && styles.selectedOption]}
//         onPress={() => setSelected('girls')}
//       >
//         <Text style={[styles.optionText, selected === 'girls' && styles.selectedText]}>GIRLS</Text>
//       </TouchableOpacity>
//     </View>
//     <TouchableOpacity style={[styles.container,{
//       alignItems:"center",justifyContent:"center",marginVertical:20
//     }]}>
//       <Text style={{
//         color:"#D7138F",fontSize:20,padding:10
//       }}>
//         START MATCHING
//       </Text>
//     </TouchableOpacity>

//       </View>
//     </SafeAreaView>
//   );
// };
// const {width,height}=Dimensions.get("window")
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#F9E8E8', // light pink background
//     borderRadius: 10,
//     padding: 5,width:width*0.9,alignSelf:"center"
//   },
//   option: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   selectedOption: {
//     backgroundColor: '#FF0090', // pink color for selected option
//   },
//   optionText: {
//     color: '#000', // black color for unselected text
//     fontWeight: 'bold',
//   },
//   selectedText: {
//     color: '#FFF', // white color for selected text
//   },
// });
// export default Matches;
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Add_Fri,
  Alert,
  Close,
  Coin,
  Crown,
  For_Story,
  Random,
  Right_Arrow,
  Store,
  Video_C,
} from '../../assets/Images';
import {Explore, TopUsers} from '../../Dummy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../Api';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';

const Matches = ({navigation}) => {
  const [allGifts, setallGifts] = useState();
  const refRBSheet = useRef();
  const [userInfo, setuserInfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('acessToken');
        const token = JSON.parse(accessToken);
        // console.log('Your Token =====>', token);
        if (accessToken !== null) {
          const res = await axios.get(USER.PROFILE_DETAILS, {
            headers: {Authorization: token},
          });
          // console.log('Your Token =====>', userInfo.user);
          setuserInfo(res?.data);
        } else {
          console.log('No access token found');
        }
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };

    getdata();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(USER.GET_ALL_GIFTS);
        const gifts = res?.data?.gift;

        setallGifts(gifts);
        await AsyncStorage.setItem('AllGifts', JSON.stringify(gifts));
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };

    getData();
  }, [allGifts]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                source={require('../../assets/Images/Icons/Pro.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.25,
              }}>
              <Image
                source={require('../../assets/Images/Icons/Diamond.png')}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Outfit-Bold',
                  width: width * 0.15,
                }}>
                {userInfo?.user?.diamond}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.25,
              }}>
              <Coin />
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Outfit-Bold',
                  width: width * 0.15,
                }}>
                {userInfo?.user?.rCoin}
              </Text>
            </View>
            <View>{userInfo?.user?.isVIP == true ? <Crown /> : null}</View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Story_Added');
            }}
            style={{
              backgroundColor: '#F94C84',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.9,
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <For_Story />
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontFamily: 'Outfit-SeimBold',
                marginLeft: 20,
              }}>
              Add Story
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <Image
              source={require('../../assets/Images/PNG/Below_Story.png')}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Selection', {data: 'Chat'});
            }}
            style={{
              backgroundColor: '#282828',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              width: width * 0.9,
              borderRadius: 10,
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Random />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 18,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 30,
                }}>
                Random Chat
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(217,217,217,0.3)',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                width: 30,
              }}>
              <Right_Arrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Selection', {data: 'Video'});
            }}
            style={{
              backgroundColor: '#282828',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              width: width * 0.9,
              borderRadius: 10,
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Video_C />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 18,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 30,
                }}>
                Video Call
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(217,217,217,0.3)',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                width: 30,
              }}>
              <Right_Arrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#282828',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              width: width * 0.9,
              borderRadius: 10,
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Store />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 18,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 30,
                }}>
                Store
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(217,217,217,0.3)',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                width: 30,
              }}>
              <Right_Arrow />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.8,
              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <Alert />
            <View
              style={{
                width: width * 0.7,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  textAlign: 'justify',
                }}>
                Any kind of content which promotes nudity, smoking, alcohol is
                not allowed. Streaming this kind of content might result to a
                permanent account ban.
              </Text>
              <Text
                style={{
                  color: '#FFF',
                  textAlign: 'justify',
                  marginTop: 10,
                }}>
                Viewers must be 18 or older to recharge and send gifts.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Close />
              </TouchableOpacity>
              {/* <Text
                  style={{
                    color: '#FFF',
                    fontSize: 25,
                    fontFamily: 'Outfit-Bold',
                  }}>
                  Settings
                </Text> */}
              <View
                style={{
                  width: 10,
                }}></View>
            </View>
            <View
              style={{
                backgroundColor: '#110030',
                padding: 10,
                borderRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Image
                    source={require('../../assets/Images/Icons/Pro.png')}
                    style={{height: 90, width: 90, borderRadius: 200}}
                  />
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 20,
                      marginTop: 10,
                    }}>
                    {userInfo?.user?.name == ''
                      ? 'William H.'
                      : userInfo?.user?.name}
                  </Text>
                </View>
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Coin />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 18,
                        fontFamily: 'Outfit-Regular',
                        marginLeft: 10,
                      }}>
                      {userInfo?.user?.rCoin}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      source={require('../../assets/Images/Icons/Diamond.png')}
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 18,
                        fontFamily: 'Outfit-Regular',
                        marginLeft: 10,
                      }}>
                      {userInfo?.user?.diamond}
                    </Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: width * 0.13,
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={require('../../assets/Images/Icons/F1.png')}
                    />
                    {userInfo?.user?.isVIP == true ? <Crown /> : null}
                  </View>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                    }}>
                    <View style={{height: 20}}></View>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                      <Image
                        source={require('../../assets/Images/Icons/Giftt.png')}
                      />
                    </TouchableOpacity>
                    <View style={{height: 20}}></View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Messege');
                        setModalVisible(false);
                      }}>
                      <Add_Fri />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#FFF',
                  height: 2,
                  width: width * 0.75,
                  marginVertical: 20,
                }}></View>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 15,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                {userInfo?.user?.tagline == ''
                  ? 'I am a dancer for last 4 years'
                  : userInfo?.user?.tagline}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  width: width * 0.35,
                  justifyContent: 'space-evenly',
                  margin: 5,
                }}>
                <Image source={require('../../assets/Images/Icons/Hors.png')} />
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: '#110030',
                      fontSize: 18,
                      fontFamily: 'Outfit-SemiBold',
                    }}>
                    13
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Outfit-Regular',
                    }}>
                    New Matches
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  width: width * 0.35,
                  justifyContent: 'space-evenly',
                  margin: 5,
                }}>
                <Image source={require('../../assets/Images/Icons/Purs.png')} />
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: '#110030',
                      fontSize: 18,
                      fontFamily: 'Outfit-SemiBold',
                    }}>
                    13
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Outfit-Regular',
                    }}>
                    New Matches
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  width: width * 0.35,
                  justifyContent: 'space-evenly',
                  margin: 5,
                }}>
                <Image source={require('../../assets/Images/Icons/Coup.png')} />
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: '#110030',
                      fontSize: 18,
                      fontFamily: 'Outfit-SemiBold',
                    }}>
                    02
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Outfit-Regular',
                    }}>
                    New Matches
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  width: width * 0.35,
                  justifyContent: 'space-evenly',
                  margin: 5,
                }}>
                <Image source={require('../../assets/Images/Icons/Hear.png')} />
                <View
                  style={{
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: '#110030',
                      fontSize: 18,
                      fontFamily: 'Outfit-SemiBold',
                    }}>
                    125
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Outfit-Regular',
                    }}>
                    New Matches
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 50, // Adjust the radius as needed
            borderTopRightRadius: 50,
            height: '50%',
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: '25%',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <FlatList
          data={allGifts}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(102, 62, 60, 0.6)',
                  padding: 20,
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Image
                  source={item.pic}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120030',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    padding: 20,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default Matches;
