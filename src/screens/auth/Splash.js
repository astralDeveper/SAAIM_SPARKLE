import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { getUserDetails } from '../../mocks/global';

const Splash = ({ navigation }) => {
  const isAuth = async () => { 
    const acessToken = await AsyncStorage.getItem('acessToken');
    const token = JSON.parse(acessToken);
    setTimeout(() => {
      if (token === null) navigation.replace('Welcome')
      else navigation.replace('BottomTabs')
    }, 3000);
  };
  useEffect(() => {
    isAuth()
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../assets/Images/PNG/splash.png')}>
      <Image
        style={{
          height: 200,
          width: 200,
        }}
        resizeMode="contain"
        source={require('../../assets/logo-with-text-animation.gif')}
      />
      <Text style={{
        fontFamily: 'Outfit-SemiBold',
        color: 'white',
        fontSize: 45
      }}>
        Sparkle
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
