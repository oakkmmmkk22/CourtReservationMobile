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
        if (newPassword === confirmNewPassword) {
            api.put("/change_password", {
                oldPassword: currentPassword,
                newPassword: newPassword,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.message === 'Password changed successfully!') {
                    router.push('/account'); // สำหรับ Next.js
                    // navigation.navigate('Account'); // สำหรับ React Native
                    Alert.alert("Change Password Successful");
                }
            })
            .catch(error => {
                console.error("Axios error:", error.message);
                Alert.alert("An error occurred. Please try again.");
            });
        } else {
            Alert.alert("New passwords do not match");
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