import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For newer React Native versions and Expo
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date/Time pickers
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // For handling safe areas
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useGlobalSearchParams, useRouter } from "expo-router";
import api from './axiosinstance';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { Dropdown } from "react-native-element-dropdown";

// import axios from "axios";

const CreatePartyScreen = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // Get safe area insets
    const [topic, setTopic] = useState(""); // Initial value
    const [type, setType] = useState('badminton');
    const [total, setTotal] = useState(1);
    // const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [description, setDescription] = useState(""); // Initial value
    // const [showTimepicker, setShowTimepicker] = useState(false);
    const [memberName, setMemberName] = useState("");
    const [showModal,setShowModal] = useState(false);
    const [formattedTime, setFormattedTime] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    const [wrongt,setWrongT] = useState("");
    const [wrongTime,setWrongTime] = useState("");
    const [wrongDate,setWrongDate] = useState("");
    const [wrongDes,setWrongDes] = useState("");
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
    const {location} = useGlobalSearchParams();
    
    
    const getToken = async () => {
        const token = await AsyncStorage.getItem("token");
        const decoded = jwtDecode(token); // test decode   
        setMemberName(decoded.userData.username);
    };


    useEffect(() => {
        getToken();
    }, []);    

        
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
        //  Here you would typically send the data to your backend
        console.log('Creating party with data:', { topic, type, total, formattedDate, formattedTime, description });
        if(topic!="" && type!="" && formattedDate!="" && formattedTime!="" && description!=""){
                api.post("",{
                    topic:topic,
                    type:type,
                    total:total,
                    formattedDate:formattedDate,
                    formattedTime:formattedTime,
                    description:description,
                })
                .then((response) => {
                    console.log(response.data)
                    if ( response.data.status ){
                        console.log("Create successfully");
                        router.push('/home')
                    }
                    else{
                        console.log("Create false");
                    }
                })
                .catch((error) => {
                console.error("Error fetching data: ", error);
            });
            // console.log(username, password)
            // setUsername("")
            // setPassword("")
        }else{
                if(topic==""){

                    setWrongT("*input Topic");
                }
                if(formattedDate ==""){
                    setWrongDate("*input Date")
                }
                if(formattedTime==""){
                    setSelectedTime("*input Time");
                }
                if(description==""){
                    setWrongDes("*input Description");
                }
                
            }
        
        }


         const fakeOpenTime = "08:00"; // เวลาเปิด
                const fakeCloseTime = "18:00"; // เวลาเปิด
              
                const [timeSlots, setTimeSlots] = useState<{ label: string; value: string }[]>([]);
              
                useEffect(() => {
                  if (fakeOpenTime && fakeCloseTime) {
                    setTimeSlots(generateTimeSlots(fakeOpenTime, fakeCloseTime, 1)); // 1 ชั่วโมงเป็น gap time
                  }
            }, [fakeOpenTime, fakeCloseTime]);
        
            const generateTimeSlots = (open: string, close: string, gap: number) => {
                const times: { label: string; value: string }[] = [];
                let [hour, minute] = open.split(":").map(Number);
                const [closeHour, closeMinute] = close.split(":").map(Number);
            
                while (hour < closeHour || (hour === closeHour && minute < closeMinute)) {
                    let startTime = `${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`;
                    let endHour = hour + gap;
                    if (endHour === 24) endHour = 0; // Reset to 00:00 if time reaches 24 hours
                
                    let endTime = `${endHour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`;
                
                    times.push({ label: `${startTime} - ${endTime}`, value: `${startTime}-${endTime}` });
                
                    hour += gap;
                }
                
                return times;
            };


    return (

            <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>

                {/* header */}
                <View style={styles.header}> 
                    <Ionicons name="chevron-back-outline" size={30} color="black" onPress={() => router.push("/find_friend")}/>
                        <Text style={styles.headerTitle}>Create Party</Text>
                </View>


                 <ScrollView>
                        {/* username */}
                        <View style={styles.memberItem}> 
                            <View style={styles.memberIcon} />  
                            <Text style={styles.memberName}>{memberName}</Text>
                        </View>
                        

                        <View style={styles.inputContainer}>

                            {/* Topic */}
                            <Text style={styles.label}>Topic:</Text>
                            <TextInput 
                                placeholder="Topic" 
                                style={styles.input} 
                                value={topic} 
                                onChangeText={setTopic} 
                                placeholderTextColor={"lightgray"}
                            />
                            <Text style={styles.wrong}>{wrongt}</Text> 

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
                            <Text style={styles.wrong}>{wrongDate}</Text> 

                                    
                            {/* Time*/}
                            <Text style={styles.label}>Time:</Text>

                    
                                <Dropdown
                                            data={timeSlots}
                                            labelField="label"
                                            valueField="value"
                                            value={selectedTime}
                                            onChange={(item) => {
                                            setSelectedTime(item.value);
                                            console.log("Selected time:", item.value);
                                            }}
                                            placeholder={selectedTime ? `Selected time: ${selectedTime}` : "Choose time"} 
                                            style={{
                                            height: 50,
                                            borderWidth: 1,
                                            borderColor: 'lightgray',
                                            borderRadius: 5,
                                            // paddingHorizontal: 10,
                                            backgroundColor: 'white',
                                            color: 'black',
                                            // width:150
                                            alignItems:'center'
                                            }}
                                            placeholderStyle={{ color: 'black' }}
                                            selectedTextStyle={{ color: 'black' }}
            
                                            
                                        />
                           

                           
                            <Text style={styles.wrong}>{wrongTime}</Text> 
                            
                            {/* Place */}
                            <Text style={styles.label}>Place:</Text>
                            <View style={{borderWidth:1,borderColor:'lightgray'}}>
                                <Text style={styles.location}>{location}</Text>
                            </View>
                            
                            
                            {/* Description */}
                            <Text style={styles.label}>Description:</Text>

                            <TextInput
                                placeholder="Description"
                                style={[styles.input, styles.multilineInput]}
                                value={description}
                                onChangeText={setDescription}
                                multiline={true}
                                numberOfLines={3} 
                                placeholderTextColor={"lightgray"}

                            />

                            <Text style={styles.wrong}>{wrongDes}</Text> 

                        </View>
                 </ScrollView>

                    <View style={styles.inputContainer}>
                        
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
        paddingTop:10,
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
        height:350,
      },
      close:{
        margin:30,
        fontSize:15,
        backgroundColor:'black',
        width:100,
        alignItems:'center'
        
      },
      wrong:{
        fontSize: 15,
        color:'red',
        
      }
      

});

export default CreatePartyScreen;