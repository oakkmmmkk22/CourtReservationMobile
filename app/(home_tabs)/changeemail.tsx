import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from '../axiosinstance';

export default function ChangeEmailPage() {
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = async () => {
       
         
    }
        


       ;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Email</Text>

            <TextInput
                style={styles.input}
                placeholder="New Email"
                value={email}
                onChangeText={setemail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Save Changes" color="black" onPress={handleChangeUsername} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});