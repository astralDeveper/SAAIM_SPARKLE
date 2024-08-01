import axios from "axios"
import { BASE_URL } from "./authentication"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const addStory = async (data) => {
    try {
        
        const acessToken = await AsyncStorage.getItem('userInfo');
        const token = JSON.parse(acessToken);
        // console.log(token._id)
        const formData = new FormData();
        formData.append('auth', token._id);
        formData.append('media', data.file);
        formData.append('caption', data.caption);

        const res = await axios.put(
            BASE_URL + 'addstories/add-story',
            formData,
         
        );
        console.log(res?.data)
        alert("Story Added Successfully")
        return res?.data; // Corrected from res.date to res.data
    } catch (error) {
        console.log("Error--->", error)
        console.log("Error--->", error)
    }
}
export const getStories = async () => {
    try {
      const acessToken = await AsyncStorage.getItem('acessToken');
      const token = JSON.parse(acessToken);
  
      const res = await axios.get(
        BASE_URL + 'addstories/get-stories',
        // {
        //     headers: {
        //         'Authorization': token,
        //     }
        // }
      );
      // console.log("Stories",res.data.stories)
      return res?.data; // Corrected from res.date to res.data
    } catch (error) {
      console.log('Error--->', error);
      console.log('Error--->', error?.response?.data);
    }
  };
  

  export const getOwnStories = async () => {
    try {
      const acessToken = await AsyncStorage.getItem('acessToken');
      const user = await AsyncStorage.getItem('userInfo');
      const token = JSON.parse(acessToken);
      const userId = JSON.parse(user);
  
      const res = await axios.post(BASE_URL + 'addstories/get-story-with', {
        id: userId._id,
      });
      // console.log('res', res?.data);
      return res.data; // Corrected from res.date to res.data
    } catch (error) {
      console.log('Error--->', error);
      console.log('Error--->', error.response.data.message);
    }
  };
  