import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const TrueMoneyComponent = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  
  const handleEditPress = (screen) => {
    router.push(screen);
  };
  
  const handleSend = async () => {
    try {
      // เรียก API เพื่อแลก Voucher
      const response = await axios.post("http://localhost:3000/redeem_voucher", {
        voucher: url,
        phone: "0902236785",
      });
  
      console.log("Redeem Response:", response.data); // ตรวจสอบข้อมูลที่ได้รับจาก API
  
      if (response.data.success) {
        const amount = response.data.amount;
        console.log("Redeemed Amount:", amount);
  
        // ดึง token จาก AsyncStorage
        const token = await AsyncStorage.getItem("token");
        console.log("Token from AsyncStorage:", token);
  
        if (!token) {
          throw new Error("No token found in AsyncStorage");
        }
  
        // Decode token
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
  
        // เรียก API เพื่ออัพเดท exchange point
        const responsed = await axios.put("http://localhost:3000/update_exchange_point", {
          user_id: decoded.userData.id, // ใช้ user_id ที่ถูกต้อง
          new_point: amount, // ส่ง new_point
        });
  
        console.log("Update Exchange Point Response:", responsed.data); // ตรวจสอบการตอบกลับจาก API
  
        if (responsed.data.success) {
          console.log("Points updated successfully in database");
        } else {
          throw new Error("Failed to update exchange point");
        }
      } else {
        alert(`Failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error redeeming voucher:", error);
      alert("An error occurred while redeeming the voucher");
    }
  };

  return (
    <View style={styles.container}>
      {/* TrueMoney Logo */}
      <Image
        source={require('../assets/images/truewallet.png')} // Replace with your logo path
        style={styles.logo}
      />

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>1 BATH = 1</Text>
        <Image
          source={require('../assets/images/crystal.png')} // Replace with your icon path
          style={styles.crystalIcon}
        />
      </View>

      {/* URL Input */}
      <View style={styles.inputContainer}>
        
        <Text style={styles.inputLabel}>Envelope Link</Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="https://gift.truemoney.com/campaign/"
          autoCapitalize="none" // Prevent auto-capitalization of URL
          keyboardType="url" // Optimize keyboard for URL input
        />
      </View>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // Adjust background color as needed
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 80, // Adjust size as needed
    marginBottom: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  crystalIcon: {
    width: 60, // Adjust size as needed
    height: 60, // Adjust size as needed
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF', // Adjust color as needed
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TrueMoneyComponent;