import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from "react-native"; // ใช้ Platform เพื่อตรวจสอบว่ากำลังใช้งานอยู่บนเว็บหรือมือถือ
import api from '../axiosinstance';

export default function ReportPage() {
    const router = useRouter();
    const [reportProblem, setReportProblem] = useState("");

    const handleReport = async () => {
        // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบถ้วนหรือไม่
        if (!value || !reportProblem) {
            Alert.alert("Please fill in all fields.");
            return;
        }
        console.log(value + " " + reportProblem)
        const response = await api.post("/report", {
            topic: value,
            detail: reportProblem,
        });
        console.log(response.data)
        if (Platform.OS === "web") {
            alert("Report submitted successfully.");
        }
        const success =true;
        if (success) {
            Alert.alert("Report submitted successfully.");
            router.push('/setting'); // กลับไปหน้าก่อนหน้า
        } else {
            Alert.alert("Error submitting report. Please try again.");
        }
        setValue(null);
        setReportProblem("");
    };
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Payment Issues', value: 'point' },
      { label: 'Reservation Issues', value: 'reserv' },
      { label: 'Other', value: 'other' },
    ]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Report Problem</Text>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{ width: "100%" }}
                placeholder='Please Selete Topic'
                placeholderStyle={{ color: "gray" }}
                textStyle={{
                    fontWeight: value ? "bold" : "normal", // Bold after selection
                    color: "black", // Change color if needed
                }}
                style={{borderRadius:10}}
            />
            <TextInput
                style={styles.input}
                placeholder="Report Problem"
                placeholderTextColor={"gray"}
                multiline // ทำให้ TextInput สามารถขึ้นบรรทัดใหม่ได้
                numberOfLines={5} // กำหนดจำนวนบรรทัดสูงสุด
                value={reportProblem}
                onChangeText={setReportProblem}
            />

            <Button title="Report" color="black" onPress={handleReport} />
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
        height: 50, // เปลี่ยนเป็น auto เพื่อให้ TextInput ขยายตามเนื้อหา
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:10,
        marginBottom: 15,
        paddingHorizontal: 10,
        textAlignVertical: 'top', // จัดข้อความให้อยู่ด้านบนของ TextInput
        marginTop:20,
    },
   
    
});