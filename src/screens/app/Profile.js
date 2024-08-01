import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BIg_Coin,
  Crown1,
  Redright,
  Sett,
  Whiteleft,
  Whiteright,
  Help,
  Log,
  Prof,
  Edit,
} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../mocks/authentication';
import {USER} from '../Api';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [userName, setUserName] = useState('');
  const [userTagline, setUserTagline] = useState('');
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({
    userId: 'USER_ID', // Replace with the actual user ID
    name: '',
    username: '',
    bio: '',
    gender: '',
    age: '',
    tagline: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const  = () => {
  //   let options = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker',response);
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {

  //       setFilePath(response);
  //     }
  //   });
  // };
  // console.log("IDIDIDID",userData?._id)

  const chooseFile = field => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];

        setFilePath(selectedImage);
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('userInfo');

        const data = JSON.parse(accessToken);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  // const onUpdate = async() => {
  //   try {
  //     const formData = new FormData();

  //     // Append the form fields
  //     formData.append('userId', userData?._id);
  //     formData.append('name', userName);
  //     formData.append('tagline', userTagline); // Ensure you append the tagline

  //     // Append the files if they exist
  //     if (filePath) {
  //       formData.append('files', {
  //         uri: filePath.uri,
  //         type: filePath.type,
  //         name: filePath.name,
  //       });
  //     }

  //     const response = await axios.put(
  //       USER.UPDATE_PROFILE,
  //       {
  //         userId: userData?._id,
  //         name: userName,
  //         tagline: userTagline,
  //         image: filePath,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );

  //     if (response.data.status) {
  //       console.log('Profile updated successfully:', response.data.user);
  //       // Handle success (e.g., update state, show success message)
  //     } else {
  //       console.log('Failed to update profile:', response.data.message);
  //       // Handle failure (e.g., show error message)
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error.message);
  //     // Handle server error
  //   }
  // };

  const onUpdate = async () => {
    const formData = new FormData();
    if (filePath) {
      formData.append('image', {
        uri: filePath.uri,
        type: filePath.type,
        name: filePath.fileName,
      });
    }
    // formData.append('email', email);
    // formData.append('realName', rName);
    // formData.append('displayName', dName);
    // formData.append('address', addd);
    // formData.append('phone', pho);

    const res = await axios
      .put(USER.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('res?.data', res?.data.user);
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          ...res?.data.user,
        }));
        Toast.show({
          type: 'success',
          text1: 'Profile Updated Successfully ',
        });
        Toast.show({type: 'success', text1: 'Data Updated Successfully'});
        navigation.goBack();
      })
      .catch(error => {
        // console.log(error);
        Toast.show({type: 'error', text1: error});
      });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('acessToken');
    await AsyncStorage.removeItem('userInfo');
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Prof />
              <Text style={styles.headerText}>Profile</Text>
            </View>
            <TouchableOpacity>{/* <Dots /> */}</TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.profileImage}>
            <Image
              source={require('../../assets/Images/Icons/Propic.png')}
              style={styles.profileImageContent}
            />
          </TouchableOpacity>

          <View style={styles.benefitsSection}>
            <View>
              <Text style={styles.benefitsTitle}>Enjoy All Benefits</Text>
              <Text style={styles.benefitsDescription}>
                Enjoy Unlimited video calls, Hide distance, Priority Matching
                without Ads.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Upgrade')}
                style={styles.getVIPButton}>
                <Text style={styles.getVIPText}>Get VIP</Text>
              </TouchableOpacity>
            </View>
            <Crown1 />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Withdraw')}
            style={styles.balanceSection}>
            <Text style={styles.balanceTitle}>Balance</Text>
            <View style={styles.balanceAmount}>
              <BIg_Coin />
              <Text style={styles.balanceText}>{userData?.rCoin}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Store')}
            style={styles.storeSection}>
            <View style={styles.storeContent}>
              <Image source={require('../../assets/Images/Icons/BigD.png')} />
              <Text style={styles.storeTitle}>Store</Text>
            </View>
            <Redright />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.settingsSection}>
            <View style={styles.settingsContent}>
              <Sett />
              <Text style={styles.settingsTitle}>Settings</Text>
            </View>
            <TouchableOpacity>
              <Whiteright />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Help_Center')}
            style={styles.helpSection}>
            <View style={styles.helpContent}>
              <Help />
              <Text style={styles.helpTitle}>Help Center</Text>
            </View>
            <Whiteright />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}
            style={styles.logoutSection}>
            <View style={styles.logoutContent}>
              <Log />
              <Text style={styles.logoutTitle}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Whiteleft />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Settings</Text>
                <View style={styles.modalHeaderSpacer} />
              </View>

              <TouchableOpacity
                onPress={chooseFile}
                style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  source={
                    filePath || require('../../assets/Images/Icons/Propic.png')
                  }
                  style={styles.modalProfileImage}
                />
                <View style={styles.editIcon}>
                  <Edit />
                </View>
              </TouchableOpacity>

              <View>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  placeholder="William H."
                  placeholderTextColor="#8e8e8e"
                  value={userName}
                  onChangeText={setUserName}
                  style={styles.input}
                />
              </View>

              <View style={styles.taglineContainer}>
                <Text style={styles.inputLabel}>Tagline</Text>
                <TextInput
                  placeholder="I am a dancer for the last 4 years"
                  placeholderTextColor="#8e8e8e"
                  value={userTagline}
                  onChangeText={setUserTagline}
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  onUpdate();
                  setModalVisible(false);
                }}
                style={styles.updateButtonContainer}>
                <LinearGradient
                  colors={['#FF00FF', '#00FFFF']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.updateButton}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120030',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  profileImage: {
    width: width * 0.33,
    alignSelf: 'center',
    marginVertical: 20,
  },
  profileImageContent: {
    height: height * 0.16,
    width: width * 0.325,
    borderRadius: 500,
    overflow: 'hidden',
  },
  benefitsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9E25FE',
    width: width * 0.92,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    alignSelf: 'center',
  },
  benefitsTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  benefitsDescription: {
    color: '#FFF',
    width: width * 0.67,
    marginVertical: 5,
    fontFamily: 'Outfit-Regular',
  },
  getVIPButton: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 100,
    width: width * 0.3,
    alignItems: 'center',
    marginTop: 10,
  },
  getVIPText: {
    color: '#9E25FE',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
  balanceSection: {
    backgroundColor: '#3F3F3F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    marginVertical: 20,
  },
  balanceTitle: {
    color: '#DD527F',
    fontSize: 30,
    fontFamily: 'Outfit-Regular',
  },
  balanceAmount: {
    flexDirection: 'row',
  },
  balanceText: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  storeSection: {
    backgroundColor: '#3F3F3F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
  },
  storeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeTitle: {
    color: '#DD527F',
    fontSize: 30,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  settingsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 15,
  },
  settingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 15,
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  divider: {
    height: 2,
    width: width * 0.9,
    backgroundColor: '#FFF',
    marginBottom: 10,
    alignSelf: 'center',
  },
  logoutSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 15,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutTitle: {
    color: '#DA2D2D',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    marginLeft: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#110030',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 25,
    fontFamily: 'Outfit-Bold',
  },
  modalHeaderSpacer: {
    width: 10,
  },
  imageContainer: {
    width: width * 0.25,
    alignSelf: 'center',
    marginVertical: 20,
  },
  modalProfileImage: {
    height: height * 0.12,
    width: width * 0.25,
    borderRadius: 100,
    overflow: 'hidden',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'flex-end',
  },
  inputLabel: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#FFF',
    color: '#FFF',
    padding: 0,
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
  },
  taglineContainer: {
    marginTop: 20,
  },
  updateButtonContainer: {
    margin: 20,
    width: width * 0.25,
    alignSelf: 'center',
  },
  updateButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: width * 0.25,
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default Profile;
