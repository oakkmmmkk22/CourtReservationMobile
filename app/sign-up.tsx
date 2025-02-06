import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";

export default function SignUpScreen() {
        const router = useRouter(); // ใช้เปลี่ยนหน้า
    
    return (
        <View style={myStyleSheet.container}>
            <Text style={myStyleSheet.text_SignUp}>Sign up</Text>
            <TextInput style={myStyleSheet.textinput} placeholder='Username' placeholderTextColor="#0006" keyboardType='default'></TextInput>
            <TextInput style={myStyleSheet.textinput} placeholder='Email' placeholderTextColor="#0006" keyboardType='default'></TextInput>
            <TextInput style={myStyleSheet.textinput} placeholder='Password' placeholderTextColor="#0006" keyboardType='default' secureTextEntry={true}></TextInput>
            <TextInput style={myStyleSheet.textinput} placeholder='Confirm Password' placeholderTextColor="#0006" keyboardType='default' secureTextEntry={true}></TextInput>
            <View style={myStyleSheet.buttoninput1}>
                <Button title='Sign up' color="black" />
            </View>
            <View style={myStyleSheet.buttoninput2}>
                <Button color="#000" title='Sign up with Google' />
            </View>
            <Text style={{ color: "#0007", fontSize: 16, fontWeight: 500 }}>have an account? 
                <Text onPress={()=>router.push('/login')} style={{textDecorationLine:"underline", color:"black"}}>Log in</Text>
            </Text>
        </View>
    );
}

const myStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:"40%"
    },
    text_SignUp: {
        fontSize: 40,
        fontWeight: "bold",
        margin: 30,
    },
    textinput: {
        borderColor: "#0002",
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        width: 250,
    },
    buttoninput1: {
        margin: 10,
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttoninput2: {
        margin: 10,
        marginBottom:20,
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
})