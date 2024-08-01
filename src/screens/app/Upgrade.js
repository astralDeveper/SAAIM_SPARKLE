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
  FlatList,
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
import axios from 'axios';
import {USER} from '../Api';
import {GooglePay} from 'react-native-google-pay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const Upgrade = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [VipPlans, setVipPlans] = useState([]);
  const [userID, setUserID] = useState();
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    const fetchVIPPlans = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');
        const data = JSON.parse(accessToken);
        setUserID(data._id);
        const response = await axios.get(USER.VIP_PLANS);
        console.log(response.data);
        if (response.data.status) {
          // const data = response.data.map(data)
          setVipPlans(response.data.vipPlan);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        alert(err.message || 'Server Error');
      } finally {
        // setLoading(false);
      }
    };
    fetchVIPPlans();
  }, []);

  const payment = async item => {
    const allowedCardNetworks = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    const requestData = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          gateway: 'stripe',
          gatewayMerchantId: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
        },
        allowedCardNetworks,
        allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: item.dollar.toString(),
        totalPriceStatus: 'FINAL',
        currencyCode: 'USD',
      },
      merchantName: 'Example Merchant',
    };

    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST); // Use ENVIRONMENT_PRODUCTION for production

    try {
      const isReady = await GooglePay.isReadyToPay(
        allowedCardNetworks,
        allowedCardAuthMethods,
      );
      if (isReady) {
        const token = await GooglePay.requestPayment(requestData);
        console.log('Payment token:', token);
        const res = await axios.post(USER.GOOGLE_PAY, {
          token,
          packageName: item.name,
          productId: item.productKey,
          userId: userID,
          planId: item._id,
        });
        console.log('res===>', res);
        // Send token to your payment gateway
      } else {
        console.log('Google Pay is not available');
        Toast.show({
          type: 'error',
          text1: 'Google Pay is not available',
        });
      }
    } catch (error) {
      Toast.show({type:"error",
        text1:`Error during Google Pay process:, ${error}`
      });
    }
  };

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
              Activiting Premium will help you meet more people, faster.
            </Text>
            <Text
              onPress={() => {
                navigation.navigate('Premium');
              }}
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
          <FlatList
            data={VipPlans}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  payment(item);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: getColorArray(item.validityType),
                  width: width * 0.9,
                  borderRadius: 10,
                  margin: 10,
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                  paddingHorizontal: 20,
                  marginTop: 40,
                }}>
                <View>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 22,
                      fontFamily: 'Outfit-SemiBold',
                    }}>
                    {item.validityType[0].toUpperCase() +
                      item.validityType.slice(1)}
                  </Text>
                  <Text
                    style={{
                      color: '#D0D0D0',
                      fontSize: 18,
                      fontFamily: 'Outfit-Regular',
                    }}>
                    Save {item.tag + '%'}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 20,
                    fontFamily: 'Outfit-Regular',
                  }}>
                  {item.dollar + '$'}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: '#FFF', fontSize: 20}}>Skip premium</Text>
          </View>
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
export default Upgrade;

const getColorArray = type => {
  switch (type) {
    case 'month':
      return '#FF0080';
    case 'year':
      return '#BF00FE';
    case 'lifetime':
      return '#F3BA53';
  }
};
