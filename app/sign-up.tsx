import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from "expo-router";
import axios from "axios";

export default function SignUpScreen() {
    const router = useRouter(); // ใช้เปลี่ยนหน้า
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const submitSignUp = () => {
        console.log(username, password)
        if(email !== "" && password !== "" && confirm !== "") {
            if(password === confirm) {
                axios.post("http://localhost:3000/signup", {
                    username:username,
                    email: email,
                    password: password,
                    user_type: "client",
                    point:100
                }).then((response) => {
                    console.log(response.data);
                    if(response.data.success){
                        router.push('/home')
                    }
                })
                .catch(error => {
                    console.error("Axios error:", error.message);
                });
            }
            else{
            }
        }
        // setUsername("")
        // setEmail("")
        // setPassword("")
        // setConfirm("")
    }
    return (
        <View style={myStyleSheet.container}>
            <Text style={myStyleSheet.text_SignUp}>Sign up</Text>
            <TextInput
                style={myStyleSheet.textinput}
                placeholder='Username'
                placeholderTextColor="#0006"
                keyboardType='default'
                onChangeText={(value)=>setUsername(value)}
            />
            <TextInput
                style={myStyleSheet.textinput}
                placeholder='Email'
                placeholderTextColor="#0006"
                keyboardType='default'
                onChangeText={(value)=>setEmail(value)}
            />
            <TextInput
                style={myStyleSheet.textinput}
                placeholder='Password'
                placeholderTextColor="#0006"
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={(value)=>setPassword(value)}
            />
            <TextInput
                style={myStyleSheet.textinput}
                placeholder='Confirm Password'
                placeholderTextColor="#0006"
                keyboardType='default'
                secureTextEntry={true}
                onChangeText={(value)=>setConfirm(value)}
            />
            <View style={myStyleSheet.buttoninput1}>
                <Button title='Sign up' color="black" onPress={() => submitSignUp()} />
            </View>
            <View style={myStyleSheet.buttoninput2}>
                <Button color="#000" title='Sign up with Google' />
            </View>
            <Text style={{ color: "#0007", fontSize: 16, fontWeight: 500 }}>have an account?
                <Text onPress={() => router.push('/login')} style={{ textDecorationLine: "underline", color: "black" }}>Log in</Text>
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
        marginBottom: 20,
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
})