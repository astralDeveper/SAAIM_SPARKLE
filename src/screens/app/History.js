import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Whiteleft} from '../../assets/Images';
import {Hist} from '../../Dummy';
import { USER } from '../Api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = ({navigation}) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');

        const data = JSON.parse(accessToken);
        console.log(data._id);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);
  const getUserRedeem = async () => {
    try {
      const response = await axios.get(`${USER.GET_USER_REDEEM}`, {
        params: { userId:userData._id },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  useEffect(()=>{
    getUserRedeem()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <TouchableOpacity
            // style={{width: width * 0.2}}
            onPress={() => {
              navigation.pop();
            }}>
            <Whiteleft />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: '#FFF',
                fontSize: 25,
                fontFamily: 'Outfit-SemiBold',
              }}>
              Help Center
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 20,
            }}></TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 50,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Outfit-SemiBold',
              textAlign: 'center',
              width: width * 0.3,
            }}>
            Price
          </Text>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Outfit-SemiBold',
              textAlign: 'center',
              width: width * 0.3,
            }}>
            Status
          </Text>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Outfit-SemiBold',
              textAlign: 'center',
              width: width * 0.3,
            }}>
            Date
          </Text>
        </View>
        <View>
          <FlatList
            data={Hist}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 16,
                      fontFamily: 'Outfit-Light',
                      textAlign: 'center',
                      width: width * 0.3,
                    }}>
                    {item.pric}
                  </Text>
                  <View
                    style={{
                      width: width * 0.3,
                      backgroundColor:
                        item.stat == 'Complete' ? '#00DE87' : '#FDEEA9',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        fontFamily: 'Outfit-Regular',
                        textAlign: 'center',
                      }}>
                      {item.stat}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 16,
                      fontFamily: 'Outfit-Light',
                      textAlign: 'center',
                      width: width * 0.3,
                    }}>
                    {item.Dat}
                  </Text>
                </View>
              );
            }}
          />
        </View>
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
});
export default History;
