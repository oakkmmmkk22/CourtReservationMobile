import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AccountPage() {
    const router = useRouter();
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");

    const getToken = async () => {
        const token = await AsyncStorage.getItem("token");
        const decoded = jwtDecode(token); // test decode   
        setUsername(decoded.userData.username);
        setEmail(decoded.userData.email);
    };

    useEffect(() => {
        getToken();
    }, []);  

    const userData = {
        username: "jaidee",
        email: "jd@gmail.com",
        // password ไม่ควรเก็บใน client-side แบบ plain text
    };

    const handleEditPress = (screen) => {
        router.push(screen);
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text>
                    <MaterialCommunityIcons name={"account-circle"} size={120}/>
                </Text>
            </View>

            <View style={styles.info}>
                <View style={styles.row}>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.value}>{username}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password:</Text>
                    <Text style={styles.value}>********</Text> {/* ปกปิดรหัสผ่าน */}
                    <TouchableOpacity onPress={() => handleEditPress("/changepassword")}>
                        <Image 
                            source={require('../../assets/images/pen.png')} // เปลี่ยน path ตามรูป icon ของคุณ
                            style={styles.editIcon} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    profile: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    info: {
        // ...
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        fontSize: 16,
        flex: 1, // ทำให้ value ยืดหยุ่น
    },
    editIcon: {
        width: 20,
        height: 20,
    },
});