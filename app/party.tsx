import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For newer React Native versions and Expo
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date/Time pickers
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // For handling safe areas
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
// import axios from "axios";

const CreatePartyScreen = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // Get safe area insets
    const [text, setText] = useState(""); // Initial value
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
                <Ionicons name="chevron-back-outline" size={30} color="black" onPress={() => router.push("/find_friend")}/>
                    <Text style={styles.headerTitle}>Join Party</Text>
            </View>

            <View style={styles.memberItem}> 
                <View style={styles.memberIcon} />  
                <Text style={styles.memberName}>{memberName}</Text>
            </View>
            

            <View style={styles.inputContainer}>
                

               

                  <View style={styles.box}>

                      <Ionicons name="people-circle-outline" size={30}  />
                      {/* <Text style={styles.tt}>write some people </Text> */}
                          
                  </View>

                  <View style={styles.box}>
                      <FontAwesome name="phone" size={30}/>
                      
                      {/* <Text style={styles.tt}>phone number </Text> */}
                        
                  </View>
                

                
                
                {/* Member */}
                <Text style={styles.label}>Member:</Text>
                  <View style={styles.boxMem}>
                  <Text style={styles.member}>👑 Oak</Text>
                  <Text style={styles.member}>😎 ABC</Text>
                  <Text style={styles.member}>😎 ABC</Text>
                  <Text style={styles.member}>😎 ABC</Text>
                  </View>

                  {/* Member */}
                  <View style={styles.boxMem}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Broadcast:</Text>
                        <TextInput 
                            placeholder="Text" 
                            style={styles.input} 
                            value={text} 
                            onChangeText={setText} 
                          
                            />
                  </View>

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
        fontSize: 20,
        marginBottom: 5,
        marginTop: 10, 
        fontWeight:'bold',
        
    },
    label1: {
      fontSize: 20,
      fontWeight:'bold',
      paddingRight:10
      
  },
    input: {
        
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
        paddingBottom:20,
        
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

      box:{
        paddingBottom:20,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:5,

      },
      boxMem:{
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth:2
        
      },
      member: {
        fontSize: 16,
        marginBottom: 5,
      },
      tt:{
        fontSize:18,
        fontWeight:'bold'
      }
      

});

export default CreatePartyScreen;