import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Image } from 'react-native';
import Video from 'react-native-video';
import { Crown, Left_Arrow, Play } from '../../assets/Images';
import { Videos } from '../../Dummy';

const Feed = ({ navigation }) => {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const handleVideoPress = (index) => {
    setPlayingIndex(playingIndex === index ? null : index);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={styles.backButton}>
            <Left_Arrow />
          </TouchableOpacity>
          <Text style={styles.feedText}>Feed</Text>
          <View style={{ width: 20 }}></View>
        </View>
        <View style={styles.popularContainer}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
        <FlatList
          data={Videos}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              // onPress={()=>{
              //     navigation.navigate("Story_Added",{data:item.vide})
              // }}
              key={index}>
              <View style={styles.profileContainer}>
                <Image
                  source={item.pic}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.profileName}>{item.name}</Text>
                  <Text style={styles.profileTime}>{item.time}</Text>
                </View>
                <Crown />
              </View>
              <TouchableOpacity
                onPress={() => handleVideoPress(index)}>
                <Video
                  ref={(ref) => {
                    videoRefs.current[index] = ref;
                  }}
                  source={item.vide}
                  resizeMode='stretch'
                  paused={playingIndex !== index}
                  style={styles.video}
                />

              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
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

export default Feed;
