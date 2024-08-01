import axios from 'axios';
import { USER } from '../screens/Api';

const getChatList = async (userId, start = 0, limit = 20) => {
  try {
    const response = await axios.get(USER.CHAT_LIST, {
      params: {
        userId,
        start,
        limit,
      },
    });

    if (response.data.status) {
        console.log(response.data);
      return response.data.chatList;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error retrieving chat list:', error);
    throw error;
  }
};

export default getChatList;