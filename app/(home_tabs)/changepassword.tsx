import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";

export default function ChangePasswordPage() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleChangePassword = async () => {
        // ตรวจสอบว่ารหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ตรงกันหรือไม่
        if (newPassword !== confirmNewPassword) {
            Alert.alert("New password and confirm new password do not match.");
            return;
        }

        // ตรวจสอบรหัสผ่านปัจจุบัน (สมมติว่าคุณมีฟังก์ชันตรวจสอบในไฟล์ auth.js)
        //const passwordCorrect = await verifyPassword(currentPassword); // verifyPassword คือฟังก์ชันที่คุณต้อง implement เอง
            const passwordCorrect = true;
        if (passwordCorrect) {
            // เปลี่ยนรหัสผ่าน (สมมติว่าคุณมีฟังก์ชันสำหรับเปลี่ยนในไฟล์ api.js)
           // const success = await updatePassword(newPassword); // updatePassword คือฟังก์ชันที่คุณต้อง implement เอง
            const success =true;
            if (success) {
                Alert.alert("Change Password Successful");
                router.back(); // กลับไปหน้าก่อนหน้า
            } else {
                Alert.alert("Error changing password. Please try again.");
            }
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

            <Button title="Save Changes" onPress={handleChangePassword} />
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