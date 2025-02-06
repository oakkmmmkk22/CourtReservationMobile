import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";

export default function ChangeEmailPage() {
    const router = useRouter();
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = async () => {
        // ตรวจสอบรหัสผ่าน (สมมติว่าคุณมีฟังก์ชันตรวจสอบในไฟล์ auth.js)
        const passwordCorrect = '1234'; // verifyPassword คือฟังก์ชันที่คุณต้อง implement เอง

        if (passwordCorrect) {
            // เปลี่ยนชื่อผู้ใช้ (สมมติว่าคุณมีฟังก์ชันสำหรับเปลี่ยนในไฟล์ api.js)

            //  const success = await updateUsername(username); // updateUsername คือฟังก์ชันที่คุณต้อง implement เอง
            const success= true;
            if (success) {
                Alert.alert("Change Username Successful");
                router.back(); // กลับไปหน้าก่อนหน้า
            } else {
                Alert.alert("Error changing username. Please try again.");
            }
        } else {
            Alert.alert("Wrong Password");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Email</Text>

            <TextInput
                style={styles.input}
                placeholder="New Email"
                value={email}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Save Changes" onPress={handleChangeUsername} />
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