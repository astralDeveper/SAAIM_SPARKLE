import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {Image} from 'react-native';
import Video from 'react-native-video';
import {Crown, Em, Left_Arrow, Play, Send} from '../../assets/Images';
import {Videos} from '../../Dummy';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
// import {chooseFile} from '../../mocks/global';
import {addStory} from '../../mocks/story';
import axios from 'axios';
import {USER} from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Story_Added = ({navigation, route}) => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [caption, setCaption] = useState('');
  const [userToken, setUserToken] = useState();

  const handleVideoPress = () => {
    setPlayingIndex(!playingIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');

        const data = JSON.parse(accessToken);
        setUserToken(data);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);
  const putStory = async e => {
    e.preventDefault();
    const user = await AsyncStorage.getItem('userInfo');
    const id = JSON.parse(user);
    const formData = new FormData();
    formData.append('title', 'title');
    formData.append('caption', caption);
    formData.append('file', filePath);
    formData.append('id', id._id);

    try {
      const response = await axios.post(USER.ADD_STORY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        // alert('Story added successfully.');
        Toast.show({
          type: 'success',
          text1: 'Story added Successfully',
        });
        navigation.pop()
      } else {
        // alert(response.data.message);
        Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
    } catch (error) {
      // alert('Error: ' + error.message);
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={styles.backButton}>
            <Left_Arrow />
          </TouchableOpacity>
          <Text style={styles.feedText}>Add Story</Text>
          <View style={{width: 20}}></View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => handleVideoPress()}>
            {filePath ? (
              <Video
                source={{uri: filePath.uri}}
                resizeMode="stretch"
                paused={playingIndex}
                style={styles.media}
              />
            ) : (
              <Video
                source={require('../../assets/Video/Toshow.mp4')}
                resizeMode="stretch"
                paused={playingIndex}
                style={styles.media}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
              width: width * 0.8,
            }}>
            <TouchableOpacity onPress={() => chooseFile(setFilePath)}>
              <LinearGradient
                colors={['#E00A9E', '#8727F3']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  borderRadius: 10,
                  width: width * 0.25,
                }}>
                <Text style={{color: '#FFF', fontSize: 18}}>Gallery</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <LinearGradient
                colors={['#ff00ff', '#00ffff']} // Replace with your gradient colors
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientBorder}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Camera</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              width: width * 0.9,
              backgroundColor: '#353535',
              borderRadius: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
            }}>
            <Em />
            <TextInput
              placeholder="Add caption"
              placeholderTextColor={'#8e8e8e'}
              style={{
                padding: 0,
                width: width * 0.65,
                color: '#FFF',
              }}
              onChangeText={text => setCaption(text)}
            />
            <TouchableOpacity onPress={putStory}>
              <Send />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120030',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(217,217,217,0.5)',
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  media: {
    height: height * 0.25,
    width: width * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    padding: 2, // Border width
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#333333', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Story_Added;

export const chooseFile = async setFilePath => {
  let options = {
    mediaType: 'mixed', // 'photo', 'video', or 'mixed'
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };

  await launchImageLibrary(options, response => {
    if (response.didCancel) {
      // console.log('User cancelled video picker');
      Toast.show({
        type: 'error',
        text1: 'User cancelled video picker',
      });
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      };
      setFilePath(source);
    }
  });
};
