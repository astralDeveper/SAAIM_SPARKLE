import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Image} from 'react-native';
import Video from 'react-native-video';
import {Crown, Left_Arrow, Play} from '../../assets/Images';
import {Videos} from '../../Dummy';
import {getOwnStories} from '../../mocks/story';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../mocks/authentication';

const MyStories = ({navigation}) => {
  const videoRefs = useRef();
  const [playingIndex, setPlayingIndex] = useState(null);
  const [stories, setStories] = useState([]);

  const loadStories = async () => {
    try {
      // const User = await AsyncStorage.getItem('userInfo');
      // const info = JSON.parse(User);
      //   console.log("Data=======================",info);
      const data = await getOwnStories();
      // let filterData = data.filter(item => item.media);
      // const story = [data.story];
      console.log('FIlllllllllllll', data?.stories);
      setStories(data?.stories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadStories();
  }, [stories]);
  const handleVideoPress = index => {
    setPlayingIndex(playingIndex === index ? null : index);
  };
  console.log('HELL', stories);
  // const deleteOwnStory = async item => {
  //   try {
  //     const acessToken = await AsyncStorage.getItem('userInfo');
  //     const token = JSON.parse(acessToken);

  //     const res = await axios.post(
  //       `${BASE_URL}/addstories/delete-story/${item?._id}${item?.author}`,
  //     );
  //     // console.log('res', res?.data);
  //     return res?.data; // Corrected from res.date to res.data
  //   } catch (error) {
  //     console.log('Error--->', error);
  //     console.log('Error--->', error.response?.data?.message);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={{
              width: 30,
            }}>
            <Left_Arrow />
          </TouchableOpacity>
          <Text style={styles.feedText}>My Stories</Text>
          <View style={{width: 20}}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
          }}></View>
        <FlatList
          data={stories}
          // console.log('item=====', item),
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <View style={styles.profileContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: width * 0.5,
                    }}>
                    
                      <Image
                        source={require('../../assets/Images/Icons/Ma1.png')}
                        style={styles.profileImage}
                      />
                      <View>
                        {/* <Text style={styles.profileName}>{item.name}</Text> */}
                        <Text style={styles.profileTime}>{item?.caption}</Text>
                      </View>
                      <Crown />
                  
                    {/* <View>
                      {/* <TouchableOpacity
                        onPress={() => {
                          deleteOwnStory(item);
                        }}
                        style={{
                          backgroundColor: 'red',
                          padding: 8,
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            color: '#FFF',
                            fontSize: 18,
                          }}>
                          Delete
                        </Text>
                      </TouchableOpacity> 
                    </View> */}
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleVideoPress(index)}>
                  <Video
                    //   ref={ref => {
                    //     videoRefs.current[index] = ref;
                    //   }}
                    repeat={true}
                    source={{uri: `${BASE_URL}${item?.media}`}}
                    resizeMode="stretch"
                    paused={playingIndex !== index}
                    style={styles.video}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
  popularContainer: {
    borderBottomWidth: 2,
    borderColor: '#F03197',
    width: width * 0.22,
  },
  popularText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
  },
  profileContainer: {
    flexDirection: 'row',
    width: width * 0.45,
    justifyContent: 'space-between',
    margin: 20,
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileName: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  profileTime: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  video: {
    height: height * 0.18,
    width: width * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default MyStories;
