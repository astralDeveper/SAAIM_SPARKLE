import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import io from 'socket.io-client';
import {
  Add_Fri,
  Em,
  Exit,
  Left_Arrow,
  Orange_Gift,
  Send,
} from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../mocks/authentication';
import {Gifts} from '../../Dummy';
import {USER} from '../Api';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('screen');

const Chat_Scre = ({navigation, route}) => {
  const refRBSheet = useRef();
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const {reciever, mesegeToshwo: initialMesegeToshwo} = route.params;
  const [mesegeToshwo, setMesegeToshwo] = useState(initialMesegeToshwo || []); // Add state for mesegeToshwo
  const [senderId, setSenderId] = useState();
  const [myId, setMyId] = useState();
  const [myData, setMyData] = useState({});
  const [chatTopic, setChatTopic] = useState('');
  const [allGifts, setaAlGifts] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');
        if (accessToken) {
          const data = JSON.parse(accessToken);
          setSenderId(data._id);
          setMyId(data._id);
          setMyData(data);
          storeChatTopic(data._id, reciever);
        } else {
          console.error('No user info found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };
    getData();
  }, [reciever]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(USER.GET_ALL_GIFTS);
        const gifts = res?.data?.gift;

        setaAlGifts(gifts);
        await AsyncStorage.setItem('AllGifts', JSON.stringify(gifts));
      } catch (error) {
        console.error('Error fetching profile details:', error.message);
      }
    };

    getData();
  }, [allGifts]);

  const storeChatTopic = async (senderUserId, receiverUserId) => {
    try {
      const response = await axios.post(USER.CHAT_ROME, {
        senderUserId,
        receiverUserId,
      });

      if (response.data.status) {
        setChatTopic(response.data.chatTopic._id);
      } else {
        console.error(
          'Failed to retrieve or create chat topic:',
          response.data.message,
        );
      }
    } catch (error) {
      console.error('Error storing chat topic:', error);
    }
  };

  useEffect(() => {
    if (!senderId || !chatTopic) return;
    const globalRoom = myId;
    console.log('globalRoom', globalRoom);
    socket.current = io('http://192.168.100.12:5000/', {
      query: {
        globalRoom,
      },
      transports: ['websocket'],
      senderUserId: myId,
      receiverUserId: reciever,
    });
    socket.current.on('connect', () => {
      console.log('Connected to server');
      setConnectionStatus('Connected');
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnectionStatus('Disconnected');
    });

    socket.current.on('chat', data => {
      console.log('Received chat message:', data);
      setMessages(prevMessages => [...prevMessages, data]);
      setMesegeToshwo(prevMesegeToshwo => [...prevMesegeToshwo, data]); // Append to mesegeToshwo
    });

    socket.current.on('error', error => {
      console.error('Socket error:', error);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [senderId, chatTopic]);

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        senderId,
        chatTopic,
        messageType: 'message',
        text: message,
        name: myData.name,
        username: myData.username,
        image: myData.image,
        country: myData.country,
        isVIP: myData.isVIP,
        timestamp: new Date(),
      };
      console.log('Sending chat message:', chatMessage);
      socket.current.emit('chat', chatMessage);
      setMessage('');
    }
  };

  const formatTime = date => {
    let hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };

  const renderMessageItem = ({item}) => (
    <View
      style={{
        margin: 5,
        padding: 5,
        alignSelf:
          item?.senderId === myId || item?.sender === myId
            ? 'flex-end'
            : 'flex-start',
        backgroundColor:
          item?.senderId === myId || item?.sender === myId
            ? '#9416DA'
            : '#D7138F',
        margin: 10,
        paddingHorizontal: 20,
        borderTopLeftRadius: item?.senderId === myId ? 10 : 0,
        borderTopRightRadius: item?.senderId === myId ? 0 : 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <Text style={styles.messageText}>{item.content || item?.text}</Text>
      <Text style={styles.timestamp}>
        {formatTime(item.date || item?.timestamp)}
      </Text>
    </View>
  );

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const addFriend = async () => {
    try {
      const response = await axios.post(USER.ADD_FRIENDS, {
        userId: senderId,
        friendId: reciever,
      });
      Toast.show({
        type: 'success',
        text1: 'Friend Request Sended',
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding friend:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
          <Left_Arrow />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image
            source={
              reciever?.image
                ? {uri: reciever.image}
                : require('../../assets/Images/PNG/Sugp.png')
            }
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text numberOfLines={1} style={styles.userName}>
              {reciever?.name ? reciever.name : 'Unknown'}
            </Text>
            <Text numberOfLines={1} style={styles.userStatus}>
              Online
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={addFriend}>
          <Add_Fri />
          <Text style={styles.actionText}>Add Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Matches')}
          style={styles.actionButton}>
          <Exit />
          <Text style={styles.actionText}>Exit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={mesegeToshwo}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({animated: true})
        }
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Em />
          <TextInput
            placeholder="Add caption"
            placeholderTextColor="#8e8e8e"
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
            multiline={true}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Send />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={styles.giftButton}>
          <Orange_Gift />
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        customStyles={{
          container: styles.rbsheetContainer,
          wrapper: styles.rbsheetWrapper,
          draggableIcon: styles.rbsheetDraggableIcon,
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <FlatList
          data={allGifts}
          contentContainerStyle={styles.giftListContainer}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.giftItem}>
              <Image source={item.pic} style={styles.giftImage} />
              <View style={styles.giftPriceContainer}>
                <Image source={item.gem} style={styles.gemImage} />
                <Text style={styles.giftPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </RBSheet>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120030',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  userStatus: {
    fontSize: 13,
    color: 'green',
    fontWeight: '400',
  },
  actionButton: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 10,
    marginRight: 3,
    fontWeight: '500',
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 10,
    color: 'white',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#210D35',
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '83%',
  },
  textInput: {
    flex: 1,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  giftButton: {
    backgroundColor: '#210D35',
    padding: 10,
    borderRadius: 20,
  },
  rbsheetContainer: {
    backgroundColor: '#150118',
    height: height * 0.55,
  },
  rbsheetWrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  rbsheetDraggableIcon: {
    backgroundColor: '#D7138F',
  },
  giftListContainer: {
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  giftItem: {
    alignItems: 'center',
  },
  giftImage: {
    width: 70,
    height: 70,
  },
  giftPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  gemImage: {
    width: 15,
    height: 15,
  },
  giftPrice: {
    fontSize: 10,
    color: 'white',
    fontWeight: '500',
  },
});

export default Chat_Scre;
