import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

// Images
import Back from '../../assets/Images/PNG/Welcome.png';
import LinearGradient from 'react-native-linear-gradient';

const Welcome = ({navigation}) => {
  useEffect(() => {
    const hideSplash = () => {
      RNBootSplash.hide();
    };
    const timeoutId = setTimeout(hideSplash, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.Back_Image} source={Back} />
      </View>
      <View>
        <Text style={styles.Text}>Discover Your Dream Partner</Text>
        <Text style={styles.Text1}>
          "Discover, Connect, Love, Journey Starts Here"
        </Text>
      </View>
      <View style={styles.ButtonC}>
        <TouchableOpacity
         onPress={()=>{
            navigation.navigate("Login")
        }} 
        style={styles.LoginB}>
          <LinearGradient
            colors={['#FF00FF', '#00FFFF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.Gradient}>
            <Text style={styles.ButtenT}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity 
              onPress={()=>{
                 navigation.navigate("Register")
             }} 
        style={styles.RegisterB}>
          <Text style={styles.RegisterT}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#120030',
    flex: 1,
  },
  Back_Image: {
    alignSelf: 'center',
    marginVertical: 50,
    height: height * 0.36,
    width: width * 0.65,
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
    marginTop: 20,
  },
  LoginB: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: width * 0.8,
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
  RegisterT: {
    color: '#DE0A9F',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  RegisterB: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: width * 0.8,
    backgroundColor: '#FFF',
    padding: 15,
  },
  ButtonC: {
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default Welcome;
