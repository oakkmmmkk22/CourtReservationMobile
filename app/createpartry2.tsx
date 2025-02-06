import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For newer React Native versions and Expo
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date/Time pickers
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // For handling safe areas
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import axios from "axios";

const CreatePartyScreen = () => {
    const insets = useSafeAreaInsets(); // Get safe area insets
    const router = useRouter();
    const [topic, setTopic] = useState('หาเพื่อนเล่นครับ'); // Initial value
    const [type, setType] = useState('badminton');
    const [total, setTotal] = useState(3);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [description, setDescription] = useState('เล่นชิวๆ ไม่จริงจัง เน้นออกกำลังกาย'); // Initial value
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [showTimepicker, setShowTimepicker] = useState(false);
    const [memberName, setMemberName] = useState(null);
    

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatepicker(Platform.OS === 'ios'); // Hide picker on iOS after selection
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimepicker(Platform.OS === 'ios'); // Hide picker on iOS after selection
        setTime(currentTime);
    };


    const handleCreateParty = () => {
        console.log('Creating party with data:', { topic, type, total, date, time, description });
        // Here you would typically send the data to your backend
        
        // axios.post("http://40.81.22.116:3000/login",{
        //     username:username,
        //     password:password,
        // })
        // .then((response) => {
        //     console.log(response.data)
        //     if ( response.data.status ){
        //         console.log("Logged in successfully");
        //         router.push('/home')
        //     }
        //     else{
        //         console.log("login false");
        //     }
        // })
        // .catch((error) => {
        //   console.error("Error fetching data: ", error);
        // });
        // console.log(username, password)
        // setUsername("")
        // setPassword("")
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>



            <View style={styles.header}>
                <Ionicons name="chevron-back-outline" size={30} color="black" onPress={() => router.push("/index")}/>
                    <Text style={styles.headerTitle}>Create Party</Text>
            </View>

            <View style={styles.memberItem}>
                <View style={styles.memberIcon} />  {/* Replace with your icon component */}
                <Text style={styles.memberName}>{memberName}</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Topic:</Text>
                <TextInput style={styles.input} value={topic} onChangeText={setTopic} />

                <Text style={styles.label}>Type:</Text>
                <View style={styles.pickerContainer}> {/* Container for styling the Picker */}
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                        style={styles.picker} // Style the Picker itself
                    >
                        <Picker.Item label="Badminton" value="badminton" />
                        <Picker.Item label="Football" value="football" />
                        <Picker.Item label="Tennis" value="tennis" />
                        <Picker.Item label="Valleyball" value="valleyball" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                <Text style={styles.label}>Total:</Text>
                <TextInput style={styles.input} value={total.toString()} onChangeText={(text) => setTotal(parseInt(text) || 0)} keyboardType="numeric" />

                <Text style={styles.label}>Date:</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatepicker(true)}>
                    <Text>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatepicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <Text style={styles.label}>Time:</Text>
                <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimepicker(true)}>
                    <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
                {showTimepicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}

                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={3} // For multiline input
                />


                <TouchableOpacity style={styles.createButton} onPress={handleCreateParty}>
                    <Text style={styles.createButtonText}>Create Party</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Or your background color
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center', // Vertically center items
        paddingHorizontal: 10, // Add horizontal padding
        paddingVertical: 20, // Add vertical padding
        paddingTop:50,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        padding: 20,
        paddingTop:1,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10, // Add margin top for spacing
        fontWeight:'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    pickerContainer: { // Style the Picker container
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10, // Add margin bottom for spacing
    },
    picker: { 
    },
    
    multilineInput: {
        height: 80, // Adjust height for multiline input
        textAlignVertical: 'top', // Align text to the top
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButton: {
        backgroundColor: '#007AFF', // Example button color
        borderRadius: 5,
        padding: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    memberItem: {
        flexDirection: 'row',       // Arrange icon and text horizontally
        alignItems: 'center',      // Vertically align icon and text
        paddingVertical: 8,        // Add some vertical padding 
        paddingHorizontal: 12,      // Add some horizontal padding
        backgroundColor: '#FFFFFF', // White background for the item
        elevation: 2,   
        // paddingTop:20           // Shadow for Android (works with backgroundColor)
      },
      memberIcon: {
        width: 100,                // Adjust icon size as needed
        height: 100,               // Adjust icon size as needed
        borderRadius: 50,         // Make icon circular
        backgroundColor: '#EEEEEE',
         // Light gray placeholder 
      },
      memberName: {
        fontSize: 16,             // Adjust font size as needed
        color: '#333333',         // Dark gray text color
      },
});

export default CreatePartyScreen;