import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Whiteleft} from '../../assets/Images';

const Help_Center = ({navigation}) => {
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
          marginVertical:50
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Outfit-Regular',
              textAlign: 'center',
            }}>
            How Can We Help You?
          </Text>
        </View>
        <View style={{
            backgroundColor: "#3D2074",padding:20,borderRadius:20,width:width*0.9,alignSelf:"center"
        }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontFamily: 'Outfit-SemiBold',
            }}>
            Title
          </Text>
          <Text style={{
            color:"#FFF",fontSize:16,fontFamily:"Outfit-Regular",marginTop:10,textAlign:"justify"
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac
            diam quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Praesent pellentesque congue lorem, vel tincidunt tortor placerat a.
            Proin ac diam quam. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt
            tortor placerat a. Proin ac diam quam.
          </Text>
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
export default Help_Center;
