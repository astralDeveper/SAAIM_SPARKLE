import axios from 'axios';
import { USER } from '../screens/Api';

// Function to send signaling data
const sendSignalingData = async (type, payload, targetUserId) => {
  try {
    // Validate the inputs
    if (!type || !payload || !targetUserId) {
      console.error('Invalid Details!');
      return;
    }

    // Make a POST request to the server
    const response = await axios.post(USER.SEND_SIG, {
      type,
      payload,
      targetUserId,
    });

    // Handle the response
    if (response.data.status) {
      console.log('Signaling data sent successfully');
    } else {
      console.error('Failed to send signaling data:', response.data.message);
    }
  } catch (error) {
    console.error('Error sending signaling data:', error.message || 'Server Error');
  }
};

export default sendSignalingData;
