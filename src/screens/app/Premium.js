import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    Ads,
    Bell,
    Coin,
    Dist,
    Priority,
    Prof,
    Video,
    Whiteleft,
    Withdrwa,
  } from '../../assets/Images';
import { USER } from '../Api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
  
  const Premium = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [VipPlans, setVipPlans] = useState([]);
    // useEffect(()=>{
    //   const fetchVIPPlans = async () => {
    //     try {
    //       const response = await axios.get(USER.VIP_PLANS);
    //       console.log(response.data);
    //       if (response.data.status) {
    //         setVipPlans(response.data.vipPlan);
    //       } else {
    //         setError(response.data.message);
    //       }
    //     } catch (err) {
    //       setError(err.message || 'Server Error');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   fetchVIPPlans()
    // },[VipPlans])
    // console.log(VipPlans);
    return (
      <SafeAreaView style={styles.container}>
          <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <Whiteleft />
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFF',
                fontSize: 30,
                fontFamily: 'Outfit-Regular',
                marginLeft: 20,
              }}>
              Upgrade to premium
            </Text>
            <View style={{width: 10}}></View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                marginHorizontal: 10,
              }}>
             You have reached your daily limit. Upgrade to Premium membership for unlimited access.
            </Text>
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontFamily: 'Outfit-SemiBold',
                marginVertical: 20,
                textAlign: 'center',
              }}>
              Why Choose Premium Membership?
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#343434',
              padding: 10,
              borderRadius: 15,
              width: width * 0.9,
              alignSelf: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Priority />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 20,
                }}>
                Priority Matching
              </Text>
            </View>
  
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Bell />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 20,
                }}>
                Send Unlimited Friends request
              </Text>
            </View>
  
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Ads />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 20,
                }}>
                No Ads
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Video />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 20,
                }}>
                Unlimited video calls
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
              }}>
              <Dist />
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 17,
                  fontFamily: 'Outfit-Regular',
                  marginLeft: 20,
                }}>
                Hide Distance
              </Text>
            </View>
          </View>
          <TouchableOpacity
             onPress={()=>{
              navigation.navigate("Deposit")
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FF0080',
              width: width * 0.9,
              borderRadius: 10,
              margin: 10,
              alignSelf: 'center',
              justifyContent: 'space-between',
              padding: 10,
              paddingHorizontal: 20,marginTop:40
            }}>
            <View>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 22,
                  fontFamily: 'Outfit-SemiBold',
                }}>
                Monthly
              </Text>
              <Text
                style={{
                  color: '#D0D0D0',
                  fontSize: 18,
                  fontFamily: 'Outfit-Regular',
                }}>
                Save 30%
              </Text>
            </View>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontFamily: 'Outfit-Regular',
              }}>
              25$
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={()=>{
              navigation.navigate("Deposit")
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#BF00FE',
              width: width * 0.9,
              borderRadius: 10,
              margin: 10,
              alignSelf: 'center',
              justifyContent: 'space-between',
              padding: 10,
              paddingHorizontal: 20,
            }}>
            <View>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 22,
                  fontFamily: 'Outfit-SemiBold',
                }}>
                Yearly
              </Text>
              <Text
                style={{
                  color: '#D0D0D0',
                  fontSize: 18,
                  fontFamily: 'Outfit-Regular',
                }}>
                Save 70%
              </Text>
            </View>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontFamily: 'Outfit-Regular',
              }}>
              280$
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("Deposit")
          }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3BA53',
              width: width * 0.9,
              borderRadius: 10,
              margin: 10,
              alignSelf: 'center',
              justifyContent: 'space-between',
              padding: 10,
              paddingHorizontal: 20,
            }}>
            <View>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 22,
                  fontFamily: 'Outfit-SemiBold',
                }}>
                Lifetime
              </Text>
              <Text
                style={{
                  color: '#D0D0D0',
                  fontSize: 18,
                  fontFamily: 'Outfit-Regular',
                }}>
                Pay onces access for ever
              </Text>
            </View>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontFamily: 'Outfit-Regular',
              }}>
              500$
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Home")
          }} style={{
              alignItems:"center",marginVertical:20
          }}>
              <Text style={{color:"#FFF",fontSize:20,}}>
              Skip premium
              </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <Toast/>
      </SafeAreaView>
    );
  };
  const {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#120030',
    },
  });
  export default Premium;
  