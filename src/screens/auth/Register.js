import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';

// Images
import Back from '../../assets/Images/PNG/Welcome.png';
import LinearGradient from 'react-native-linear-gradient';
import Atrat, {
  Callen,
  Down_Arrow,
  Facebook,
  Female,
  Gend,
  Gooogle,
  Hide,
  Insta,
  Lines,
  Male,
  Pass,
  Show,
  Up_Arrow,
} from '../../assets/Images';
import DatePicker from 'react-native-date-picker';
import { PostApi } from '../../mocks/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { registerValidationForm } from '../../core/auth/validations';


const Register = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateVisible, setdateVisible] = useState(false);
  const [pShow, setPShow] = useState(false);
  const [values, setValues] = useState({ birthday: new Date() });

  const updateState = (key, value) => {
    setValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSelectGender = gender => {
    updateState('gender', gender);
    setModalVisible(false);
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const Datepress = () => {
    Keyboard.dismiss();
    setdateVisible(true);
  };


  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) return token;
    } catch (error) {
      console.log(error);
    }
  };

  const getFCMToken = async () => {
    try {
      const authorized = await messaging().hasPermission();
      const fcmToken = await getToken();

      if (authorized) return fcmToken;

      await messaging().requestPermission();
      return fcmToken;
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterHandler = async () => {
    try {
      const isValid = registerValidationForm(
        values.email,
        values.password,
        values.gender,
        values.birthday
      );
      console.log(isValid)
      if (isValid) {
        const fcmToken = await getFCMToken();
        values.fcmToken = fcmToken;
        const user = await PostApi(values, 'signup');
        await AsyncStorage.setItem('acessToken', JSON.stringify(user.token));
        await AsyncStorage.setItem('userInfo', JSON.stringify(user.user));

        navigation.navigate('BottomTabs');
        Toast.show({
          type: "success",
          text1: "Sign up Successfull"
        })
      }
    } catch (error) {
      console.log('Error--->', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: height * 0.1,
          marginBottom: height * 0.05,
        }}>
        <Text style={styles.Text}>Make Your Account!</Text>
        <Text style={styles.Text1}>Register to start your journey</Text>
      </View>
      <View>
        <View style={styles.emailC}>
          <View style={styles.inputpic}>
            <Atrat />
          </View>
          <View style={styles.inputtitleC}>
            <Text style={styles.inputtitle}>Email Address</Text>
            <TextInput
              placeholder="jhon@gmail.com"
              placeholderTextColor={'#8e8e8e'}
              onChangeText={text => updateState('email', text)}
              style={styles.emailInput}
            />
          </View>
        </View>
        <View style={styles.emailC}>
          <View style={styles.inputpic}>
            <Pass />
          </View>
          <View style={styles.inputPC}>
            <Text style={styles.inputtitle}>Password</Text>
            <TextInput
              secureTextEntry={pShow ? false : true}
              placeholder="********"
              onChangeText={text => updateState('password', text)}
              placeholderTextColor={'#8e8e8e'}
              style={styles.emailInput}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setPShow(!pShow);
            }}>
            {pShow == true ? <Show /> : <Hide />}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalVisible(true);
              handlePress();
            }}
            style={[
              styles.emailC,
              {
                borderBottomLeftRadius: modalVisible ? 0 : 100,
                borderBottomRightRadius: modalVisible ? 0 : 100,
                borderRadius: modalVisible ? 10 : 100,
              },
            ]}>
            <View style={styles.inputpic}>
              <Gend />
            </View>
            <View style={[styles.inputPC]}>
              <Text style={styles.inputtitle}>Gender</Text>
              <TextInput
                placeholder="male"
                placeholderTextColor={'#8e8e8e'}
                editable={false}
                value={values.gender}
                pointerEvents="none"
                style={styles.emailInput}
              />
            </View>
            <TouchableOpacity>
              {modalVisible ? <Up_Arrow /> : <Down_Arrow />}
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Datepress();
            }}
            style={styles.emailC}>
            <View style={styles.inputpic}>
              <Callen />
            </View>
            <View style={styles.inputPC}>
              <Text style={styles.inputtitle}>Birthday</Text>
              <TextInput
                placeholderTextColor={'#8e8e8e'}
                style={styles.emailInput}
                placeholder="Select Date"
                value={values.birthday.toDateString()}
                editable={false}
                pointerEvents="none"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setPShow(!pShow);
              }}>
              <Down_Arrow />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={RegisterHandler} style={styles.LoginB}>
            <LinearGradient
              colors={['#FF00FF', '#00FFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.Gradient}>
              <Text style={styles.ButtenT}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
          {modalVisible && (
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectGender('male')}>
                  <Male />
                  <Text style={styles.optionText}>Male</Text>
                  <View style={{ width: 10 }}></View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 2,
                    width: width * 0.8,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    alignSelf: 'center',
                    borderRadius: 100,
                  }}></View>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelectGender('female')}>
                  <Female />
                  <Text style={styles.optionText}>Female</Text>
                  <View style={{ width: 10 }}></View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Modal transparent={true} visible={dateVisible} animationType="slide">
            <View style={styles.modalBackground2}>
              <View style={styles.modalContainer2}>
                <DatePicker
                  date={values.birthday}
                  onDateChange={date => updateState('birthday', date)}
                  mode="date"
                  style={{
                    color: '#000',
                    backgroundColor: '#fff',
                  }}
                />
                <TouchableOpacity
                  style={styles.option2}
                  onPress={() => setdateVisible(false)}>
                  <Text style={styles.optionText2}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.Linet}>
          <Lines />
          <Text
            style={[
              styles.Text1,
              { marginTop: 0, marginHorizontal: 0, fontFamily: 'Outfit-Regular' },
            ]}>
            Continue With
          </Text>
          <Lines />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <TouchableOpacity style={styles.googlT}>
            <Gooogle />
            <Text
              style={{
                color: '#000',
                fontFamily: 'Outfit-Regular',
                fontSize: 18,
              }}>
              Google
            </Text>
            <View
              style={{
                width: 10,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFF',
              padding: 10,
              borderRadius: 50,
            }}>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFF',
              padding: 10,
              borderRadius: 50,
            }}>
            <Insta />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{
            marginVertical: 30,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#FFF',
              fontFamily: 'Outfit-Regular',
            }}>
            Already have an account?{' '}
            <Text
              style={{
                color: '#E00A9E',
              }}>
              Login Now
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#120030',
    flex: 1,
  },

  Text: {
    color: '#FFF',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 30,
    textAlign: 'center',
  },
  Text1: {
    color: '#FFF',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 25,
    marginTop: 5,
  },
  emailC: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 100,
    width: width * 0.9,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputpic: {
    backgroundColor: 'rgba(242, 174, 225,0.5)',
    padding: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
  },
  inputtitleC: {
    width: width * 0.72,
  },
  inputPC: {
    width: width * 0.6,
  },
  inputtitle: {
    color: '#5C5C5C',
    fontSize: 14,
  },
  emailInput: {
    backgroundColor: '#FFF',
    padding: 0,
    fontSize: 16,
    borderRadius: 50,
    color: '#000',
  },
  LoginB: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: width * 0.8,
    alignSelf: 'center',
    marginTop: 10,
  },
  Gradient: {
    padding: 15,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: width * 0.8,
  },
  ButtenT: {
    color: '#FFF',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  Linet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: height * 0.04,
  },
  googlT: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.4,
    padding: 10,
    borderRadius: 50,
  },
  modalBackground: {
    // flex: 1,
    // justifyContent: 'center',
    position: 'absolute',
    marginTop: height * 0.08,
    alignSelf: 'center',
    width: width * 0.9,
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  option: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  modalBackground2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer2: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  option2: {
    padding: 10,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  optionText2: {
    fontSize: 18,
    color: '#000',
  },
});

export default Register;
