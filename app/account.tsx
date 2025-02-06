import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";

export default function AccountPage() {
    const router = useRouter();

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
                <Image 
                    source={require('../assets/images/favicon.png')} // เปลี่ยน path ตามรูปของคุณ
                    style={styles.profileImage} 
                />
            </View>

            <View style={styles.info}>
                <View style={styles.row}>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.value}>{userData.username}</Text>
                    <TouchableOpacity onPress={() => handleEditPress("/changeusername")}>
                        <Image 
                            source={require('../assets/images/favicon.png')} // เปลี่ยน path ตามรูป icon ของคุณ
                            style={styles.editIcon} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userData.email}</Text>
                    <TouchableOpacity onPress={() => handleEditPress("/changemail")}>
                        <Image 
                            source={require('../assets/images/favicon.png')} // เปลี่ยน path ตามรูป icon ของคุณ
                            style={styles.editIcon} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password:</Text>
                    <Text style={styles.value}>********</Text> {/* ปกปิดรหัสผ่าน */}
                    <TouchableOpacity onPress={() => handleEditPress("/changepassword")}>
                        <Image 
                            source={require('../assets/images/favicon.png')} // เปลี่ยน path ตามรูป icon ของคุณ
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