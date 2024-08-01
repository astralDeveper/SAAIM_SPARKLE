import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';

import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';

export const GoogleAuth = async (login, navigation) => {
    try {
        GoogleSignin.configure({
            androidClientId: '449651409650-p010emuojm700t834098sbve2kevtv9j.apps.googleusercontent.com',
            iosClientId: '449651409650-vq3rke5bdatd1tag4i4a4v7eamsab2jk.apps.googleusercontent.com',
        });
        if (login) {
            await GoogleSignin.hasPlayServices().then((hasPlayService) => {
                if (hasPlayService) {
                    GoogleSignin.signIn().then((userInfo) => {
                        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.user));
                        navigation.navigate("BottomTabs")
                    }).catch((e) => {
                        console.log("ERROR IS: " + JSON.stringify(e));
                    })
                }
            }).catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
            })
        } else {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .logOut()
                .then(props.logOut());
        }

    } catch (error) {
        console.log('ERROR:--->', error)
    }
}


export const FacebookAuth = () => {
    // const [userInfo, setUserInfo] = useState({});

    const logoutWithFacebook = () => {
        LoginManager.logOut();
        // setUserInfo({});
    };
    const getInfoFromToken = (token) => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id,name,first_name,last_name',
            },
        };

        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    // setUserInfo(user);
                    // userInfo.token = token
                    console.log('result:', user);
                    return (
                        {
                            ...user,
                            token
                        }
                    )
                }
            }
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    const loginWithFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
            (login) => {
                if (login.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const accessToken = data.accessToken.toString();
                        getInfoFromToken(accessToken);
                    });
                }
            },
            (error) => {
                console.log('Login fail with error: ' + error);
            }
        );
    };

    // const isLogin = userInfo.name;
    // const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
    // const onPressButton = isLogin ? logoutWithFacebook : loginWithFacebook;
    loginWithFacebook()
}