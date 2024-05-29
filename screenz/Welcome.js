import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('./Images/welcome.jpg'); // replace with your image path

export const Welcome = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.subtitle}>Now Let's Turn This Into A Life.</Text>
          <Text style={styles.title}>Explore Your Favorite Journey</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal:20,
    //paddingVertical:30


  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay to enhance text visibility
    padding: 20,
    marginTop:400
    
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    textAlign: 'left',
    
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(50,150,100)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    marginBottom:10
  },

  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight:'bold',

    textAlign: 'center',
  },
});

//export default Welcome;
