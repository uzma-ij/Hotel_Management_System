import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const logo = require("./Images/2361.jpg");

export const Signup = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlesignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User data", user);
            navigation.navigate('Login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error code:', errorCode);
            console.error('Error message:', errorMessage);
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.txt1}>Sign Up</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.field} placeholderTextColor={'black'} placeholder='Firstname' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.field} placeholderTextColor={'black'} placeholder='Lastname' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.field} placeholderTextColor={'black'} onChangeText={setEmail} placeholder='Email' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.field} placeholderTextColor={'black'} onChangeText={setPassword} placeholder='Password' secureTextEntry />
            </View>
            <TouchableOpacity style={styles.button} onPress={handlesignup}>
                <Text style={styles.txt}>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 100,
        marginBottom: 20,
    },
    txt1: {
        fontWeight: 'bold',
        fontSize: 45,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        height: 50,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: 'lightgrey', // Semi-transparent background for glass effect
        borderWidth: 1,
        borderColor: 'lightgrey', // Slightly more transparent border
        justifyContent: 'center', // Center the text input vertically
        paddingHorizontal: 10, // Padding inside the input container
    },
    field: {
        width: '100%',
        height: '100%',
        color: 'black',
    },
    button: {
        borderRadius: 20,
        backgroundColor: 'rgb(50,150,100)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    txt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
});
