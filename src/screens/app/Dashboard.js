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
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Add_Fri,
  Close,
  Coin,
  Crown,
  Edit,
  Small_C,
  Whiteleft,
} from '../../assets/Images';
import {Explore, Gifts, TopUsers} from '../../Dummy';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {USER} from '../Api';
import DeviceInfo from 'react-native-device-info';
import {getStories} from '../../mocks/story';
import Video from 'react-native-video';
import {BASE_URL} from '../../mocks/authentication';

const Dashboard = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const refRBSheet = useRef();
  const [userInfo, setuserInfo] = useState();
  const [allGifts, setallGifts] = useState();
  const [liveUsers, setliveUsers] = useState();

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
    const getliveusers = async () => {
      try {
        const res = await axios.get(USER.LIVE_USERS);

        //  console.log("RESponse",liveUsers);
        setliveUsers(res.data);
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };

    getliveusers();
  }, [liveUsers]);
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

  const [stories, setStories] = useState([]);

  const loadStories = async () => {
    const data = await getStories();
    // console.log(data)
    setStories(data?.stories);
  };

  useEffect(() => {
    loadStories();
  }, [stories]);

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
          <View>
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Outfit-Bold',
                fontSize: 20,
                marginLeft: 20,
              }}>
              Top Users
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Matches');
                }}
                style={{
                  borderWidth: 5,
                  height: 70,
                  width: 70,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#F72D6A',
                  margin: 10,
                }}>
                <View style={styles.videoContainer}>
                  <Image
                    source={require('../../assets/Images/Icons/tp0.png')}
                    resizeMode="stretch"
                    style={styles.video}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={stories}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Feeds');
                    }}
                    style={{
                      borderWidth: 5,
                      height: 70,
                      width: 70,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#F72D6A',
                      margin: 10,
                    }}>
                    <View style={styles.videoContainer}>
                      <Video
                        muted
                        source={{
                          uri: `http://192.168.100.12:5000/${item?.media}`,
                        }}
                        resizeMode="stretch"
                        style={styles.video}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Outfit-Bold',
                fontSize: 20,
                marginLeft: 20,
              }}>
              Explore
            </Text>
          </View>
          <View>
            <FlatList
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                margin: 10,
              }}
              data={liveUsers}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Video_Call', {
                        reciever: item,
                        dash: true,
                      });
                    }}>
                    <ImageBackground
                      source={require('../../assets/Images/Icons/Ex1.png')}
                      style={{
                        height: height * 0.15,
                        width: width * 0.3,
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginBottom: 10,
                      }}>
                      {/* {item.Ell == true ? (
                        <View
                          style={{
                            margin: 10,
                            alignSelf: 'flex-end',
                          }}>
                          <Image source={item.Elli} />
                        </View>
                      ) : null} */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 10,
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#FFF',
                            fontSize: 11,
                            width: width * 0.3,
                            fontFamily: 'Outfit-Regular',

                            textAlign: 'center',
                          }}>
                          {item?.name}
                        </Text>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            width: width * 0.28,
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 10,
                              fontFamily: 'Outfit-Regular',
                            }}>
                            {item.distance}
                          </Text>
                          {item.Gift == false ? (
                            <Image
                              source={item.flag}
                              style={{
                                height: 15,
                                width: 18,
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: width * 0.08,
                              }}>
                              <Image
                                source={item.gift}
                                style={{
                                  height: 15,
                                  width: 15,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#FFF',
                                  fontSize: 10,
                                  fontFamily: 'Outfit-Regular',
                                }}>
                                {item.gN}
                              </Text>
                            </View>
                          )}
                        </View> */}
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
            />
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

export default Dashboard;
