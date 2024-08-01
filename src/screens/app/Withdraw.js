import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Coin, Whiteleft, Withdrwa} from '../../assets/Images';
import axios from 'axios';
import {USER} from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse, stringify} from 'flatted';
const Withdraw = ({navigation}) => {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rCoin, setrCoin] = useState('');
  const [paymentGate, setPaymentGate] = useState([
    'JazzCash',
    'EasyPaisa',
    'Payneer',
    'Bank Account',
  ]);
  const [bName, setBName] = useState('');
  const [bAddress, setBAddress] = useState('');
  const [iBAN, setIBAN] = useState('');
  const [userData, setUserData] = useState();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    'Select Payment Method',
  );

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userInfo');
      if (accessToken) {
        const data = parse(accessToken); // Use flatted to parse
        console.log(data._id);
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage', error);
    }
  };

  const onSubmit = async () => {
    try {
      const dataToSend = {
        userId: userData?._id,
        paymentGateway: selectedPaymentMethod,
        description: bName,
        accountName: bAddress,
        accountNumber: iBAN,
        rCoin: rCoin,
      };

      console.log('Data to be sent:', dataToSend);

      const res = await axios.post(USER.BANK_DET, dataToSend);
      console.log('Response:', res.data);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');

        const data = JSON.parse(accessToken);
        console.log(data._id);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(USER.SETTING);
        // console.log('Response', res.data.setting.rCoinForCashOut);
        setrCoin(res.data.setting.rCoinForCashOut);
        // setPaymentGate(res.data.setting.paymentGateway);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handlePaymentMethodSelect = method => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethods(false);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <TouchableOpacity
            style={{width: width * 0.2}}
            onPress={() => {
              navigation.pop();
            }}>
            <Whiteleft />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: '#FFF',
                fontSize: 25,
                fontFamily: 'Outfit-SemiBold',
              }}>
              Withdraw
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('History');
            }}
            style={{
              backgroundColor: '#A349A1',
              padding: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 15,
                fontFamily: 'Outfit-Regular',
              }}>
              History
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Coin />
          <Text
            style={{
              color: '#FFF',
              fontSize: 25,
              fontFamily: 'Outfit-SemiBold',
              marginLeft: 10,
            }}>
            5000
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 20,
          }}>
          <Text
            style={{color: '#A349A1', fontSize: 25, fontFamily: 'Outfit-Bold'}}>
            Note:{' '}
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontFamily: 'Outfit-Regular',
              }}>
              Minimum 50$ withdraw
            </Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#313131',
            padding: 15,
            borderRadius: 200,
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            width: width * 0.6,
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder={'0'}
            placeholderTextColor={'#FFF'}
            value={rCoin}
            onChangeText={text => {
              setrCoin(text);
            }}
            keyboardType="number-pad"
            maxLength={4}
            style={{
              color: '#FFF',
              fontSize: 25,
              fontFamily: 'Outfit-SemiBold',
              padding: 0,
              width: width * 0.25,
            }}
          />
          <Text
            style={{
              color: '#A349A1',
              fontSize: 25,
              fontFamily: 'Outfit-SemiBold',
            }}>
            =
          </Text>
          <Text
            style={{
              color: '#A349A1',
              fontSize: 25,
              fontFamily: 'Outfit-SemiBold',
            }}>
            1$
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFF',
            fontSize: 18,
            fontFamily: 'Outfit-Regular',
            marginVertical: 10,
          }}>
          Coin To Withdraw
        </Text>
        <View
          style={{
            backgroundColor: '#313131',
            width: width * 0.9,
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: 20,
            padding: 20,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Outfit-SemiBold',
              marginBottom: 20,
            }}>
            Payment Method
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowPaymentMethods(!showPaymentMethods);
            }}
            style={{
              backgroundColor: '#1C1C1C',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              width: width * 0.7,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 19,
                fontFamily: 'Outfit-Regular',
              }}>
              {selectedPaymentMethod}
            </Text>
          </TouchableOpacity>
          {showPaymentMethods && (
            <View style={{marginTop: 20}}>
              <FlatList
                data={paymentGate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handlePaymentMethodSelect(item)}
                    style={{
                      padding: 10,
                      backgroundColor: '#313131',
                      borderRadius: 10,
                      marginVertical: 5,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#FFF', fontSize: 18}}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Congraj');
          }}
          style={{
            borderWidth: 2,
            borderColor: '#A349A1',
            padding: 10,
            borderRadius: 10,
            width: width * 0.9,
            justifyContent: 'space-around',
            alignSelf: 'center',
            marginTop: height * 0.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: width * 0.4,
              alignSelf: 'center',
            }}>
            <Withdrwa />
            <Text
              style={{
                color: '#FFF',
                fontSize: 25,
                fontFamily: 'Outfit-Regular',
              }}>
              Withdraw
            </Text>
          </View>
        </TouchableOpacity>
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 18,
                  fontFamily: 'Outfit-SemiBold',
                  textAlign: 'center',
                }}>
                Enter Bank Account Details
              </Text>
              <TextInput
                placeholder="Beneficiary Name"
                placeholderTextColor={'#000'}
                value={bAddress}
                onChange={text => {
                  setBAddress(text);
                }}
                style={{
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  alignSelf: 'center',
                  width: width * 0.7,
                  margin: 10,
                  color: '#000',
                }}
              />
              <TextInput
                placeholder="Account No or IBAN"
                placeholderTextColor={'#000'}
                // keyboardType=""
                value={iBAN}
                onChange={text => {
                  setIBAN(text);
                }}
                style={{
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  alignSelf: 'center',
                  width: width * 0.7,
                  margin: 10,
                  color: '#000',
                }}
              />
              <TextInput
                placeholder="Bank Name"
                placeholderTextColor={'#000'}
                value={bName}
                onChange={text => {
                  setBName(text);
                }}
                style={{
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  alignSelf: 'center',
                  width: width * 0.7,
                  margin: 10,
                  color: '#000',
                }}
              />
              <TextInput
                placeholder="Bank Address"
                placeholderTextColor={'#000'}
                value={bAddress}
                onChange={text => {
                  setBAddress(text);
                }}
                style={{
                  backgroundColor: '#FFF',
                  padding: 5,
                  borderRadius: 10,
                  alignSelf: 'center',
                  width: width * 0.7,
                  margin: 10,
                  color: '#000',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    onSubmit();
                    // setModalVisible(false);
                  }}
                  style={{
                    backgroundColor: '#A349A1',
                    padding: 5,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#FFF'}}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    backgroundColor: '#A349A1',
                    padding: 5,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#FFF'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
    backgroundColor: '#313131',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
});

export default Withdraw;
