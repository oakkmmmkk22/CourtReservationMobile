import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useRouter } from "expo-router";


const TrueMoneyComponent = () => {
     const router = useRouter();
     
     const handleEditPress = (screen) => {
        router.push(screen);
    };
  const [url, setUrl] = useState('https://gift.truemoney.com/campaign/?');

  const handleSend = () => {
    // Basic URL validation (you might want more robust checks)
    if (!url.startsWith('https://')) {
      Alert.alert('Invalid URL', 'Please enter a valid URL starting with https://');
      return;
    }

    // Open the URL in the device's browser
    
    else 
        {

        }
      
    ;
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