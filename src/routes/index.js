import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Welcome from '../screens/app/Welcome'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import Dashboard from '../screens/app/Dashboard'
import BottomTabs from './bottomTabs'
import Store from '../screens/app/Store'
import Withdraw from '../screens/app/Withdraw'
import Upgrade from '../screens/app/Upgrade'
import Help_Center from '../screens/app/Help_Center'
import History from '../screens/app/History'
import Add_Story from '../screens/app/Add_Story'
import Feed from '../screens/app/Feed'
import Story_Added from '../screens/app/Story_Added'
import Selection from '../screens/app/Selection'
import Connecting from '../screens/app/Connecting'
import Chat_Scre from '../screens/app/Chat_Scre'
import Video_Call from '../screens/app/Video_Call'
import Splash from '../screens/auth/Splash'
import Premium from '../screens/app/Premium'
import Deposit from '../screens/app/Deposit'
import Congraj from '../screens/app/Congraj'
import FogetP from '../screens/app/FogetP'
import MyStories from '../screens/app/My-Stories'
import Test_room from '../../Test'

const Routes = ({initialRouteName}) => {

const Stack=createNativeStackNavigator()


  return (
<NavigationContainer>
    <Stack.Navigator initialRouteName='Splash' >
{/* <Stack.Screen
          name="Tabs"
          component={initialRouteName === 'Dashboard' ?  : null}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
        name='Splash'
        component={Splash}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Register'
        component={Register}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='BottomTabs'
        component={BottomTabs}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Store'
        component={Store}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Withdraw'
        component={Withdraw}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Upgrade'
        component={Upgrade}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Help_Center'
        component={Help_Center}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='History'
        component={History}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Selection'
        component={Selection}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Feed'
        component={Feed}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Story_Added'
        component={Story_Added}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Connecting'
        component={Connecting}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Chat_Scre'
        component={Chat_Scre}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Video_Call'
        component={Video_Call}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Premium'
        component={Premium}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Deposit'
        component={Deposit}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Congraj'
        component={Congraj}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='FogetP'
        component={FogetP}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='MyStories'
        component={MyStories}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='TestRoom'
        component={Test_room}
        options={{headerShown:false}}
        />
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default Routes