import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from './axiosinstance';
//http://10.0.2.2:3000 for emulator 
//http://localhost:3000 for pc

export default function LoginScreen() {
    const router = useRouter(); // ใช้เปลี่ยนหน้า
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const submitLogin = async () => {
        try {
            const response = await api.post("/login", {
                username,
                password,
            });
    
            console.log("oak here in login");
            console.log(response.data);
    
            if (response.data.status) {
                console.log("Logged in successfully");
                await AsyncStorage.setItem("token", response.data.token);
                const token = await AsyncStorage.getItem("token"); //token
                const decoded = jwtDecode(token); // test decode
                console.log(decoded.userData.id);
                router.push("/home"); // ไปหน้า Home
                
                console.log("Decoded Token:", decoded.userData.id);
                
               
                
               // console.log("User Info:", decoded);
    
               
            } else {
                console.log("login false");
            }
        } catch (error) {
            console.error("Axios error:", error.message);
        }
    };

    return (
        <View style={myStyleSheet.container}>
            <Text style={myStyleSheet.text_login}>Log in</Text>
            <TextInput
                style={myStyleSheet.textinput}
                placeholder='Username'
                placeholderTextColor="#0006" 
                keyboardType='default'
                onChangeText={(value)=>setUsername(value)}
            />
            <TextInput
                style={myStyleSheet.textinput}
                placeholder='Password'
                placeholderTextColor="#0006"
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={(value)=>setPassword(value)}
            />
            <View style={myStyleSheet.buttoninput1}>
                <Button title='Log in' color="black" onPress={() => submitLogin()} />
            </View>
            <Text style={{ color: "#0007", fontSize: 16, fontWeight: 500 }}>Don't have an account? 
                <Text style={{ textDecorationLine: "underline", color: "black" }} onPress={()=>router.push('/sign-up')}>Sign up</Text>
            </Text>
            </View>
    );
}

const myStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: "40%"
    },
    text_login: {
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
        width: 250
    },
    buttoninput1: {
        margin: 10,
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttoninput2: {
        margin: 10,
        marginBottom: 20,
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
})