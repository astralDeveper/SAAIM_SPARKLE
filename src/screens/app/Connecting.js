import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Easing,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import axios from 'axios';
import {USER} from '../Api';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Connecting = ({navigation, route}) => {
  const {Alsodata, userId, interest} = route.params;
  const [milliseconds, setMilliseconds] = useState(0);
  const [get, set] = useState(false);
  const [get1, set1] = useState(false);
  const [interData, setinterData] = useState([]);
  const animations = useRef(
    [...Array(4)].map(() => new Animated.Value(0)),
  ).current;

  useFocusEffect(
    React.useCallback(() => {
      const animate = (animation, delay) => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
          delay,
        }).start(() => {
          animation.setValue(0); // Reset the animation value to 0
          animate(animation, delay); // Restart the animation
        });
      };

      animations.forEach((animation, index) => {
        animate(animation, index * 500);
      });

      const interval = setInterval(() => {
        setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
      }, 10);

      const timeouts = [
        setTimeout(() => set(true), 1000),
        setTimeout(() => set1(true), 2000),
      ];

      return () => {
        clearInterval(interval);
        timeouts.forEach(clearTimeout);
        animations.forEach(animation => animation.stopAnimation());
      };
    }, [animations]),
  );

  const formattedTime = (milliseconds / 1000).toFixed(2);
  const Interest = async (userId, interest, setinterData) => {
    try {
      const res = await axios.get(`${USER.GET_INTEREST}/${userId}/${interest}`);
      setinterData(res.data.users || []); // Ensure it's always an array
    } catch (error) {
      console.error(error);
      setinterData([]); // Handle error by setting an empty array
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (userId && interest) {
      // Check if both are defined
      Interest(userId, interest, setinterData);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 2;
        if (nextIndex >= interData.length) {
          return 0; // Reset to the start if reaching the end
        }
        return nextIndex;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  // Ensure interData is defined and has items before slicing
  const itemsToDisplay =
    interData && interData.length > 0
      ? interData.slice(currentIndex, currentIndex + 2)
      : [];

  // console.log('first', itemsToDisplay);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#120030'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View>
          <View style={styles.container}>
            {/* <Svg height="500" width="500" viewBox="0 0 200 200">
              {[...Array(4)].map((_, index) => (
                <AnimatedCircle
                  key={index}
                  cx="100"
                  cy="100"
                  r={animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 80],
                  })}
                  stroke="url(#grad)"
                  strokeWidth="2"
                  fill="none"
                  opacity={animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  })}
                />
              ))}
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0%" stopColor="#e91e63" />
                  <Stop offset="100%" stopColor="#9c27b0" />
                </LinearGradient>
              </Defs>
            </Svg> */}
          </View>
          <View
            style={{
              position: 'absolute',
              top: height * 0.25,
              alignSelf: 'center',
            }}>
            <Image
              source={require('../../assets/Images/Icons/Ma1.png')}
              style={{
                height: height * 0.1,
                width: width * 0.2,
                borderRadius: 500,
                overflow: 'hidden',
              }}
            />
          </View>

          {itemsToDisplay.map(
          
            (item, index) =>
              index == 0 && (
                
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      Alsodata === 'Chat' ? 'Chat_Scre' : 'Video_Call',
                      {
                        reciever: item._id
                      },
                    )
                  }
                  style={{
                    position: 'absolute',
                    top: height * 0.2,
                    marginLeft: width * 0.1,
                  }}>
                  <Image
                    source={require('../../assets/Images/Icons/Ma2.png')}
                    style={{
                      height: height * 0.08,
                      width: width * 0.15,
                      borderRadius: 500,
                      overflow: 'hidden',
                    }}
                  />
                  {/* <Text>
                      {item._id}
                    </Text> */}
                </TouchableOpacity>
              ),
          )}

          {/* {get1 && ( */}
          {itemsToDisplay.map(
            (item, index) =>
              index == 1 && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      Alsodata === 'Chat' ? 'Chat_Scre' : 'Video_Call',
                      {
                        reciever: item._id,dash:false
                      },
                    )
                  }
                  style={{
                    position: 'absolute',
                    bottom: height * 0.2,
                    alignSelf: 'flex-end',
                    right: width * 0.15,
                  }}>
                  {/* <Text>
                      {item._id}
                    </Text> */}
                  <Image
                    source={require('../../assets/Images/Icons/Ma3.png')}
                    style={{
                      height: height * 0.08,
                      width: width * 0.15,
                      borderRadius: 500,
                      overflow: 'hidden',
                    }}
                  />
                </TouchableOpacity>
              ),
          )}
          {/* )} */}
        </View>
        <Text style={styles.timerText}>{formattedTime} s</Text>
        <Text style={styles.timerText}>Connecting...</Text>
      </View>
    </SafeAreaView>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6,
    width: width,
  },
  timerText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Connecting;
