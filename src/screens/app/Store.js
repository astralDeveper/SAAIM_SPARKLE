import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Tilt_Bar, Whiteleft} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import {stroe} from '../../Dummy';
import {USER} from '../Api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Store = ({navigation}) => {
  const [diamondData, setDiamondData] = useState([]);
  const [userData, setUserData] = useState(null);

  const dData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userInfo');
      const data = JSON.parse(accessToken);
      setUserData(data);

      const res = await axios.get(USER.GET_DIAMONDS);
      setDiamondData(res.data.diamondPlan);
    } catch (error) {
      console.error('Error=====>', error);
    }
  };

  useEffect(() => {
    dData();
  }, []);

  const topDiamond = diamondData.find(item => item.isTop);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Whiteleft />
            </TouchableOpacity>
            <Text style={styles.headerText}>Store</Text>
            <View style={styles.headerSpacer}></View>
          </View>

          <LinearGradient
            colors={['#9A0D90', '#D82483']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradientBox}>
            <Text style={styles.myGemsText}>My Gems</Text>
            <View style={styles.gemsRow}>
              <Image
                source={require('../../assets/Images/Icons/Diamond.png')}
              />
              <Text style={styles.gemsCount}>{userData?.diamond}</Text>
            </View>
          </LinearGradient>

          {topDiamond && (
            <View style={styles.topDiamondBox}>
              <Tilt_Bar />
              <Text style={styles.discountText}>10% OFF</Text>
              <View style={styles.topDiamondContent}>
                <View style={styles.diamondInfo}>
                  <Image
                    source={require('../../assets/Images/Icons/Tilt_Diam.png')}
                  />
                  <Text style={styles.diamondText}>
                    X{' '}
                    <Text style={styles.diamondCount}>
                      {topDiamond.diamonds}
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity style={styles.buyButton}>
                  <LinearGradient
                    colors={['#9A0D90', '#D82483']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.gradientButton}>
                    <Text style={styles.buttonText}>$ {topDiamond.doller}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <LinearGradient
                colors={['#9A0D90', '#D82483']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.popularBox}>
                <Text style={styles.popularText}>Most Popular</Text>
              </LinearGradient>
            </View>
          )}

          <FlatList
            contentContainerStyle={styles.diamondList}
            data={diamondData}
            renderItem={({item}) =>
              
              
              
              
              
              item.isTop === false && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Deposit')}
                  style={styles.diamondItem}>
                  <Image
                    source={require('../../assets/Images/Icons/G_d.png')}
                  />
                  <Text style={styles.diamondCountText}>{item.diamonds}</Text>
                  <LinearGradient
                    colors={['#9A0D90', '#D82483']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.priceBox}>
                    <Text style={styles.priceText}>${item.doller}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120030',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  headerSpacer: {
    width: 10,
  },
  gradientBox: {
    padding: 10,
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  myGemsText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    marginBottom: 10,
  },
  gemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gemsCount: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  topDiamondBox: {
    backgroundColor: '#4B3C52',
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  discountText: {
    color: '#FFF',
    transform: [{rotate: '325deg'}],
    position: 'absolute',
    marginTop: height * 0.032,
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    marginLeft: width * 0.05,
  },
  topDiamondContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    marginTop: height * 0.08,
    width: width * 0.6,
    alignSelf: 'center',
  },
  diamondInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.2,
  },
  diamondText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
  diamondCount: {
    fontSize: 15,
  },
  buyButton: {
    width: width * 0.15,
  },
  gradientButton: {
    padding: 5,
    width: width * 0.15,
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
  popularBox: {
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: height * 0.04,
  },
  popularText: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Outfit-Regular',
  },
  diamondList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // width: width * 0.8,
    marginTop: 20,
  },
  diamondItem: {
    backgroundColor: '#231C2C',
    width: width * 0.4,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  diamondCountText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
  priceBox: {
    padding: 5,
    width: width * 0.2,
    alignItems: 'center',
    borderRadius: 50,
  },
  priceText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
});

export default Store;
