import axios from 'axios';
import Toast from 'react-native-toast-message';

export const BASE_URL = 'http://192.168.100.12:5000/';
// export const BASE_URL = 'http://192.168.100.21:3000/auth/'

export const PostApi = async (data, path) => {
  try {
    const response = await axios.post(`${BASE_URL}${path}`, data);
    return response.data;
  } catch (error) {
    console.log('Error--->', error.response);
    // alert(error.response.data.message);
    Toast.show({
      type:"error",
      text1:error.response.data.message
    })
  }
};
