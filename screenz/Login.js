import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigation } from '@react-navigation/native';
import styles from './LoginStyles'; // Import the external stylesheet


const logo = require("./Images/2361.jpg");

export const Login = (props) => {
  const navigation = useNavigation();

  const handleloginpress = () => {
    navigation.navigate('Tabnavigation');
  };

const handleForgotPasswordPress =()=>{
navigation.navigate('Signup');

}

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User data:", user.uid);
      handleloginpress();
    } catch (error) {
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.middle}>
        <TextInput
          style={styles.field1}
          placeholderTextColor={'black'}
          onChangeText={setEmail}
          value={email}
          placeholder='Email'
        />
        <TextInput
          style={styles.field2}
          placeholderTextColor={'black'}
          onChangeText={setPassword}
          value={password}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleloginpress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   top: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     width: 250,
//     height: 250,
//     marginBottom: 20,
//   },
//   loginText: {
//     fontWeight: 'bold',
//     fontSize: 45,
//     color: 'rgb(50,150,100)',
//   },
//   middle: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   field1: {
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     height: 50,
//     width: '80%',
//     backgroundColor: 'lightgrey',
//     marginBottom: 20,
//   },
//   field2: {
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     height: 50,
//     width: '80%',
//     backgroundColor: 'lightgrey',
//     marginBottom: 5,
//   },
//   forgotPasswordText: {
//     alignSelf: 'flex-end',
//     paddingRight: '10%',
//     marginBottom: 20,
//     marginLeft:200,
//     //marginTop:10
//   },
//   button: {
//     borderRadius: 20,
//     backgroundColor: 'rgb(50,155,100)',
//     paddingVertical: 13,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });

//export default Login;
