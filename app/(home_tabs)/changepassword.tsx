import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import api from '../axiosinstance';
export default function ChangePasswordPage() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleChangePassword = async () => {
        
        
            const passwordCorrect = true;
        if (newPassword === confirmNewPassword) {
           
                api.put("/change_password", {
                    
                    oldPassword : currentPassword,
                    newPassword: newPassword,
                   
                   
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        router.push('/account');
                        setTimeout(() => {
                            Alert.alert("Change Password Successful");
                        }, 500); // แสดง Alert หลังจาก redirect ครึ่งวินาที
                    }
                })
                .catch(error => {
                    console.error("Axios error:", error.message);
                });
            

            


          //  Alert.alert("Change Password Successful");
        } else {
            Alert.alert("Wrong Current Password");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>

            <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Re-enter New Password"
                secureTextEntry
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
            />

            <Button title="Save Changes" color="black" onPress={handleChangePassword} />
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