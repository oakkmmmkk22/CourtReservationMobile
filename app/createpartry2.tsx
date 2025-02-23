import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For newer React Native versions and Expo
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date/Time pickers
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // For handling safe areas
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
// import axios from "axios";

const CreatePartyScreen = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // Get safe area insets
    const [topic, setTopic] = useState(""); // Initial value
    const [type, setType] = useState('badminton');
    const [total, setTotal] = useState(1);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [description, setDescription] = useState(""); // Initial value
    const [showTimepicker, setShowTimepicker] = useState(false);
    const [memberName, setMemberName] = useState("Username");
    const [showModal,setShowModal] = useState(false);
    const [formattedTime, setFormattedTime] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    

    // const onChangeTime = (event, selectedTime) => {
    //     const currentTime = selectedTime || time;
    //     setShowTimepicker(Platform.OS === 'ios'); // Hide picker on iOS after selection
    //     setTime(currentTime);
    // };
    
    const onChangeTime = (event, selectedTime) => {
        setShowTimepicker(false); 
        if (selectedTime) {
            setTime(selectedTime);   
            const hours = selectedTime.getHours().toString().padStart(2, "0");
            const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
            setFormattedTime(`${hours}:${minutes}`);
        
        }
    };
    

    const handleCreateParty = () => {
        console.log('Creating party with data:', { topic, type, total, formattedDate, formattedTime, description });
        //  Here you would typically send the data to your backend
        
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

                {/* header */}
            <View style={styles.header}> 
                <Ionicons name="chevron-back-outline" size={30} color="black" onPress={() => router.push("/find_friend")}/>
                    <Text style={styles.headerTitle}>Create Party</Text>
            </View>

                {/* username */}
            <View style={styles.memberItem}> 
                <View style={styles.memberIcon} />  
                <Text style={styles.memberName}>{memberName}</Text>
            </View>
            
            {/* Topic */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Topic:</Text>
                <TextInput 
                    placeholder="Topic" 
                    style={styles.input} 
                    value={topic} 
                    onChangeText={setTopic} 
                />

                {/* Type sport */}
                <Text style={styles.label}>Type:</Text>
                <View style={styles.pickerContainer}> 
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                        style={styles.picker} 
                    >
                        <Picker.Item label="Badminton" value="badminton" />
                        <Picker.Item label="Football" value="football" />
                        <Picker.Item label="Tennis" value="tennis" />
                        <Picker.Item label="Valleyball" value="valleyball" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                {/* Total people */}
                <Text style={styles.label}>Total:</Text>
                    <TextInput  
                    style={styles.input} 
                    value={total.toString()} 
                    onChangeText={(text) => setTotal(parseInt(text) || 0)} keyboardType="numeric" 
                />
                
                {/* /Date */}
                <Text style={styles.label}>Date:</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowModal(true)}>
                    <Text>{formattedDate ? formattedDate : "Choose Date"}</Text>
                </TouchableOpacity>

                <Modal visible={showModal} animationType="fade" transparent={true} >
                    <View style={styles.centerview}> 
                        <View style={styles.modalview}>
                            <Calendar style={styles.calendar}

                                onDayPress={ date => {
                                    //console.log(date);
                                    let selectedDate = date.dateString;
                                    // selectedDate.setHours(0, 0, 0, 0);
                                    // setDate(selectedDate);
                                    setFormattedDate(selectedDate);
                                    setShowModal(false);
                                }} 
                                minDate={"2025-01-01"}
                                maxDate={"2025-12-31"}
                            
                            />
                            <TouchableOpacity onPress={() => setShowModal(false) }>    
                                <View style={styles.close}>
                                    <Text style={{color:'white',fontWeight:'bold'}} >Close</Text>     
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> 
                </Modal>
                        
                {/* Time                */}
                <Text style={styles.label}>Time:</Text>
                <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimepicker(true)}>
                    <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
                {showTimepicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="spinner"
                        onChange={onChangeTime}
                    />
                )}

                {/* Place */}
                <Text style={styles.label}>Place:</Text>
                
                
                {/* Description */}
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    placeholder="Description"
                    style={[styles.input, styles.multilineInput]}
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={3} 
                />

                {/* BTN Create */}
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
        backgroundColor: '#fff', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center', 
        paddingHorizontal: 10, 
        paddingVertical: 20, 
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
        marginTop: 10, 
        fontWeight:'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    pickerContainer: { 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10, 
    },
    picker: { 
    },
    
    multilineInput: {
        height: 80, 
        textAlignVertical: 'top', 
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
        backgroundColor: '#000', 
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
        flexDirection: 'row',       
        alignItems: 'center',     
        paddingVertical: 8,        
        paddingHorizontal: 12,      
        backgroundColor: '#FFFFFF', 
        elevation: 2,   
        
      },
      memberIcon: {
        width: 100,                
        height: 100,              
        borderRadius: 50,         
        backgroundColor: '#EEEEEE',

      },
      memberName: {
        fontSize: 26,             
        color: '#333333',
        marginLeft:20,
        fontWeight:'bold',         
      },
      centerview:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        alignItems:'center',
        justifyContent:'center'
      },
      modalview:{
        borderRadius:20,
        padding:5,
        alignItems:'center',
        shadowColor: '#000',
        width:300,
        height:420,
        backgroundColor:'white',
        
      },
      calendar:{
        width:280,
        height:300,
      },
      close:{
        margin:70,
        fontSize:15,
        backgroundColor:'black',
        width:100,
        alignItems:'center'
        
      },
      

});

export default CreatePartyScreen;