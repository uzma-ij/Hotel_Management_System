//import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Welcome} from './screenz/Welcome';
import { Signup } from './screenz/Signup';
import { Login } from './screenz/Login';
import { Dashboard } from './screenz/Dashboard';
import { useEffect, useState } from 'react';
import { Tabnavigation } from './screenz/Tabnavigation';
import {Details} from './screenz/Details';
import { Wishlist} from './screenz/Wishlist';
import { BookHotel } from './screenz/BookHotel';
import { Mybookings } from './screenz/Mybookings';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      
        <Stack.Navigator screenOptions={{ headerShown: false }}
         
        >

          <Stack.Screen name='welcome' component={Welcome} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Dashboard' component={Dashboard} /> 
           <Stack.Screen name='Tabnavigation' component={Tabnavigation}/>
           <Stack.Screen name='Details' component={Details} /> 
            {/* <Stack.Screen name='Wishlist' component={Wishlist}/> */}
            <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ marginLeft: 10 }}>
                <Icon name="arrow-back" size={25} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
            <Stack.Screen name='BookHotel' component={BookHotel}/>
            {/* <Stack.Screen name='Mybookings' component={Mybookings}/> */}
            <Stack.Screen
          name="Mybookings"
          component={Mybookings}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ marginLeft: 10 }}>
                <Icon name="arrow-back" size={25} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
           
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

