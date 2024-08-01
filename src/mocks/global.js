import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import { USER } from '../screens/Api';

export const chooseFile = async setFilePath => {
  let options = {
    mediaType: 'mixed', // 'photo', 'video', or 'mixed'
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };

  await launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled video picker');
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

export const getUserDetails = async (userId) => {
  try {
    const getUser = await axios.post(USER.GET_DETAILS, { userId });
    return getUser.data.user;
  } catch (error) {
    console.log('ERROR==>', error);
  }
};


export const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    // Format the time to "1:00 PM"
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // To get the time in 12-hour format with AM/PM
    };

    const timeString = date.toLocaleTimeString('en-US', options);
    return (timeString);
  };