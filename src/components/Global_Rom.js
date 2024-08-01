import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../mocks/authentication';


const YourComponent = () => {
    const generateRandomRoomName = () => {
        return 'room_' + Math.random().toString(36).substr(2, 9);
      };

    const globalRoom = generateRandomRoomName() ; // Replace with your actual global room name
   
      
  useEffect(() => {
    // Connect to the server with the globalRoom in the query
    const socket = io(BASE_URL, {
      query: { globalRoom }
    });

    // Log the handshake query and globalRoom to the console
    socket.on('connect', () => {
      console.log('Connected to server');
      console.log('socket.handshake.query ==== : ', socket.handshake.query);
      console.log('globalRoom connected: ', globalRoom);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

//   return <div>Your Component Content</div>;
};

export default YourComponent;
