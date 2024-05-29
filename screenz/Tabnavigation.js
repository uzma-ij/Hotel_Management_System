import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from './Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import {Wishlist} from './Wishlist';
import {Mybookings} from './Mybookings';


const Tab = createBottomTabNavigator();

export const Tabnavigation =()=>{
return(
    <Tab.Navigator
    
    screenOptions={
     
    ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? require('./Images/home1.png') : require('./Images/home1.png');
        } else if (route.name === 'Wishlist') {
          iconName = focused ? require('./Images/heart.png') : require('./Images/heart.png');
        }
        else if (route.name === 'Mybookings') {
          iconName = focused ? require('./Images/hotel.png') : require('./Images/hotel.png');
        }
        // You can return any component that you like here!
        return <Image source={iconName} style={{ width: 25, height: 25, tintColor: focused ? '#006400' : color }} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#006400',
      inactiveTintColor: 'grey',
      labelStyle: { fontSize: 14 }, // Default font size for tab labels
    tabBarLabelStyle: { fontSize: 16 } // Font size for specific tab labels
    }}
    
  >
    <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
    <Tab.Screen name="Wishlist" component={Wishlist}  options={{headerShown:false}} />
    <Tab.Screen name="Mybookings" component={Mybookings}  options={{headerShown:false}} />
  </Tab.Navigator>
    //   <Tab.Navigator 
    //   initialRouteName='Dashboard'
    //   screenOptions={{headerShown:false}}>
    //     <Tab.Screen name="Dashboard" component={Dashboard}/>
        
    //     <Tab.Screen name="Wishlist" component={Wishlist} />
    //   </Tab.Navigator>
    



)
}
