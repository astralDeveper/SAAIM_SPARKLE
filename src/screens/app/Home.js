import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Image} from 'react-native';
import Video from 'react-native-video';
import {Crown, Left_Arrow, Play} from '../../assets/Images';
import {Videos} from '../../Dummy';
import {getStories} from '../../mocks/story';
import {BASE_URL} from '../../mocks/authentication';

const Home = ({navigation}) => {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [stories, setStories] = useState([]);

  const loadStories = async () => {
    const data = await getStories();

    setStories(data?.stories || []);
  };

  useEffect(() => {
    loadStories();
  }, [stories]);

  const handleVideoPress = index => {
    setPlayingIndex(playingIndex === index ? null : index);
  };
  // console.log(stories)
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            // onPress={() => {
            //   navigation.pop();
            // }}
            // style={styles.backButton}
            style={{
              width: 30,
            }}>
            {/* <Left_Arrow /> */}
          </TouchableOpacity>
          <Text style={styles.feedText}>Feed</Text>
          <View style={{width: 20}}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyStories')}
            style={{
              backgroundColor: '#F03197',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text>My Story</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {stories.map((item, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.profileContainer}>
                <Image source={Videos[0].pic} style={styles.profileImage} />
                <View>
                  <Text style={styles.profileName}>
                    {/* {item.name} */}
                    Name
                  </Text>
                  <Text style={styles.profileTime}>{item.caption}</Text>
                </View>
                <Crown />
              </View>
              <TouchableOpacity onPress={() => handleVideoPress(index)}>
                <Video
                  ref={ref => {
                    videoRefs.current[index] = ref;
                  }}
                  source={{uri: `${BASE_URL}${item.media}`}}
                  resizeMode="stretch"
                  paused={playingIndex !== index}
                  style={styles.video}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    marginLeft: 20,
    marginTop: 20,
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

export default Home;
