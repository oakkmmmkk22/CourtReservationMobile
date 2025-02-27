import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from './axiosinstance';
import { Ionicons } from '@expo/vector-icons';

const TrueMoneyComponent = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  
  const handleEditPress = (screen) => {
    router.push(screen);
  };
  
  const handleSend = async () => {
    try {
        // 🎟️ Redeem Voucher
        const response = await api.post("/redeem_voucher", {
            voucher: url,
            phone: "0925682555",
        });

        console.log("Redeem Response:", response.data);

        if (!response.data.success) {
            return Alert.alert("Failed", response.data.message);
        }

        const amount = response.data.amount;
        console.log("Redeemed Amount:", amount);

        // 🔑 ดึง token จาก AsyncStorage
        const token = await AsyncStorage.getItem("token");
        console.log("Token from AsyncStorage:", token);

        if (!token) {
            throw new Error("No token found in AsyncStorage");
        }

        // 🆔 Decode token
        const decoded = jwtDecode(token);
        if (!decoded || !decoded.userData || !decoded.userData.id) {
            throw new Error("Invalid token structure");
        }
        
        const userId = decoded.userData.id;

        // 💰 อัพเดท exchange point
        const topupResponse = await api.put("/topup", {
            user_id: userId,
            amount: amount,
        });

        console.log("Update Exchange Point Response:", topupResponse.data);

        if (!topupResponse.data.success) {
            throw new Error("Failed to update exchange point");
        }

        console.log("Points updated successfully in database");
        Alert.alert("Successful", "Top up complete");

        // 📥 บันทึก transaction ใน /deposit
        const depoResponse = await api.post("/deposit", {
            user_id: userId,
            amount: amount,
        });

        console.log("Deposit Response:", depoResponse.data);

        if (!depoResponse.data.success) {
            throw new Error("Failed to insert transaction");
        }

        console.log("Transaction added successfully");

    } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", error.message || "An error occurred while processing your request.");
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
         <Text style={styles.price}>💎 </Text>
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
  price: {
    fontSize: 20,
    marginVertical: 5,
},
});

export default TrueMoneyComponent;