import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";

export default function ReportPage() {
    const router = useRouter();
    const [place, setPlace] = useState("");
    const [court, setCourt] = useState("");
    const [reportProblem, setReportProblem] = useState("");

    const handleReport = async () => {
        // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบถ้วนหรือไม่
        if (!place || !court || !reportProblem) {
            Alert.alert("Please fill in all fields.");
            return;
        }

        // ส่งข้อมูลรายงาน (สมมติว่าคุณมีฟังก์ชันสำหรับส่งรายงานในไฟล์ api.js)
        //const success = await submitReport({ place, court, reportProblem }); // submitReport คือฟังก์ชันที่คุณต้อง implement เอง
           const success =true;
        if (success) {
            Alert.alert("Report submitted successfully.");
            router.push('/setting'); // กลับไปหน้าก่อนหน้า
        } else {
            Alert.alert("Error submitting report. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Report Problem</Text>

            <TextInput
                style={styles.input}
                placeholder="Place"
                value={place}
                onChangeText={setPlace}
            />

            <TextInput
                style={styles.input}
                placeholder="Court"
                value={court}
                onChangeText={setCourt}
            />

            <TextInput
                style={styles.input}
                placeholder="Report Problem"
                multiline // ทำให้ TextInput สามารถขึ้นบรรทัดใหม่ได้
                numberOfLines={5} // กำหนดจำนวนบรรทัดสูงสุด
                value={reportProblem}
                onChangeText={setReportProblem}
            />

            <Button title="Report" onPress={handleReport} />
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
        height: 40, // เปลี่ยนเป็น auto เพื่อให้ TextInput ขยายตามเนื้อหา
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        textAlignVertical: 'top', // จัดข้อความให้อยู่ด้านบนของ TextInput
    },
});