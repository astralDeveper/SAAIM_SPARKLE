import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Coin, Whiteleft, Withdrwa} from '../../assets/Images';

  
  const Deposit = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

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
                Deposit
              </Text>
            </View>
            <TouchableOpacity
            onPress={()=>{
              navigation.navigate("History")
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
                Minimum 50$ deposit
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
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 25,
                fontFamily: 'Outfit-SemiBold',
              }}>
              5000{'          '} <Text style={{color: '#A349A1'}}>={'          '}</Text> 5$
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
                setModalVisible(true);
              }}
              style={{
                backgroundColor: '#1C1C1C',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 19,
                  fontFamily: 'Outfit-Regular',
                }}>
                Select Payment Method
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
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
                Deposit
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
                  placeholder="Account Name or IBAN"
                  placeholderTextColor={'#000'}
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
                  onPress={()=>{
                      setModalVisible(false)
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
                    onPress={()=>{
                      setModalVisible(false)
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
      width: 300,
      backgroundColor: '#110030',
      borderRadius: 10,
      padding: 20,
    },
    option: {
      paddingVertical: 10,
    },
    optionText: {
      fontSize: 18,
    },
  });
  export default Deposit;
  