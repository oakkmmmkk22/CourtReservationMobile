import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useRouter } from "expo-router";
import axios from "axios";


const TrueMoneyComponent = () => {
     const router = useRouter();
     
     const handleEditPress = (screen) => {
        router.push(screen);
    };
  const [url, setUrl] = useState('');

  const handleSend = async() => {
    // Basic URL validation (you might want more robust checks)
      
    try {
      // เรียก API แลกเปลี่ยน Voucher
      const response = await axios.post("http://localhost:3000/redeem_voucher", {
        voucher: url,
        phone: "0970756504",
      });
  
      if (response.data.success) {
        const amount = response.data.amount; // ดึงจำนวนเงินที่ได้รับ
        const user_id = 2;
        
        // ส่ง Notification พร้อมจำนวนเงิน
        await axios.post("http://localhost:3000/notifications", {
          user_id,
          notification: `You have received ${amount} THB for the exchange transaction. Thank you very much for using our service.`,
        });
  
        alert("Voucher redeemed successfully!");
        setUrl("");
        
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
          placeholder=""
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