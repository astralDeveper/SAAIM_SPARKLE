import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/app/Dashboard';
import RNBootSplash from 'react-native-bootsplash';
import Matches from '../screens/app/Matches';
import Home from '../screens/app/Home';
import Messege from '../screens/app/Messege';
import Profile from '../screens/app/Profile';
import { BottomTabsIcons } from '../Dummy';



function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFF',
          width: '100%',
          justifyContent: 'space-between',
          padding: 12,
  
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              key={route.key} // Added key prop for each TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ alignItems: 'center' }} // Center align the icon and text
            >
              {
                BottomTabsIcons(
                  isFocused ? '#E00A9E' : 'black',
                )[index]
              }
              <Text style={{ color: isFocused ? '#E00A9E' : 'black', marginTop: 5 }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
 
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Dashboard">
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="Matches" component={Matches} />
        <Tab.Screen name="Feeds" component={Home} />
        <Tab.Screen name="Messege" component={Messege} />
        <Tab.Screen name="Profile" component={Profile} />


      </Tab.Navigator>
    // </NavigationContainer>
  );
}