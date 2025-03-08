import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from "react-native-picker-select";


export default function BookingScreen() {
    const [selectedSport, setSelectedSport] = useState("BADMINTON");
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [type, setType] = useState('badminton');
    const [formattedDate, setFormattedDate] = useState("");
    const [showModal,setShowModal] = useState(false);
    const [formattedTime, setFormattedTime] = useState("");
    const [showTimepicker, setShowTimepicker] = useState(false);
    

    
  
    const router = useRouter();
    const { facility_names } = useGlobalSearchParams();
    const facilities = facility_names?.split(",") || []; 
    // const facility_names = "Swimming Pool,Gym,Parking,WiFi,Restaurant";
    // const facilities = facility_names.split(","); 
    const courts = [
        { id: "1", name: "BADMINTON", zone: "Zone 1", price: 150, available: true },
        { id: "2", name: "BADMINTON", zone: "Zone 2", price: 150, available: false },
    ];

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
        setCartVisible(true);
    };

        const fakeOpenTime = "08:00"; // เวลาเปิด
        const fakeCloseTime = "18:00"; // เวลาเปิด
      
        const [timeSlots, setTimeSlots] = useState([]);
      
        useEffect(() => {
          if (fakeOpenTime && fakeCloseTime) {
            generateTimeSlots(fakeOpenTime, fakeCloseTime, 1); // 1 ชั่วโมงเป็น gap time
          }
    }, [fakeOpenTime, fakeCloseTime]);

    const generateTimeSlots = (open, close, gap) => {
        const times = [];
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
        
        setTimeSlots(times);
    };
        

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fac}>
                <Text style={{fontWeight:"bold",fontSize:16}}>
                    Facilities :
                </Text>
                <View style={styles.ifac}>
                    <Text>
                    {facilities.map((facility, index) => (
                        <View key={index}>
                            <Text style={styles.itype}>
                                <AntDesign name={"checkcircle"} color={"green"} size={18} style={{marginLeft:10}}></AntDesign> {facility} 
                            </Text>
                        </View>
                    ))}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.per}>
                    Period:
                </Text>
                <View style={{paddingRight:10,paddingLeft:10,backgroundColor:'white'}}>
                    <View style={styles.choose}>
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
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
                                    <AntDesign name="calendar" size={18} color="white" />
                                    <Text style={styles.buttonText}>{formattedDate ? formattedDate : "Choose Date"}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={() => setShowTimepicker(true)}>
                                    <Ionicons name="time-outline" size={18} color="white" style={{paddingRight:5}} />
                                    <RNPickerSelect
                                                    onValueChange={(value) => console.log(value)} // ใช้ค่านี้เมื่อเลือกช่วงเวลา
                                                    items={timeSlots}
                                                    placeholder={{ label: "Choose time", value: null }}
                                                    style={{
                                                    inputAndroid: {
                                                        paddingHorizontal: 10,
                                                        height: 40,
                                                        borderWidth: 1,
                                                        borderRadius: 5,    
                                                        backgroundColor:'#3B82F6',
                                                    },
                                                    iconContainer: {
                                                        position: "absolute",
                                                        right: 10, // ย้ายลูกศรไปทางขวา
                                                        top: 12,
                                                    
                                                    },
                                                    inputIOS:{
                                                        paddingHorizontal: 10,
                                                        height: 40,
                                                        borderWidth: 1,
                                                        borderRadius: 5,    
                                                        backgroundColor:'#3B82F6',
                                                    },
                                                    
                                                    }}
                                                />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} >
                                    <AntDesign name="search1" size={18} color="white" />
                                    
                                </TouchableOpacity>
                            </View>

                                <Modal visible={showModal} animationType="fade" transparent={true} >
                                    <View style={styles.centerview1}> 
                                        <View style={styles.modalview1}>
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

                                {/* <Modal visible={showTimepicker} animationType="fade" transparent={true} >
                                    <View style={styles.centerview1}> 
                                        <View style={styles.modalview1}>

                                            <RNPickerSelect
                                                    onValueChange={(value) => console.log(value)} // ใช้ค่านี้เมื่อเลือกช่วงเวลา
                                                    items={timeSlots}
                                                    placeholder={{ label: "เลือกช่วงเวลา", value: null }}
                                                    style={{
                                                    inputAndroid: {
                                                        paddingHorizontal: 10,
                                                        height: 40,
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    },
                                                    iconContainer: {
                                                        position: "absolute",
                                                        right: 10, // ย้ายลูกศรไปทางขวา
                                                        top: 12,
                                                    },
                                                    }}
                                                />

                                            <TouchableOpacity onPress={() => setShowModal(false) }>    
                                                <View style={styles.close}>
                                                    <Text style={{color:'white',fontWeight:'bold'}} >Close</Text>     
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View> 
                                </Modal> */}

                    </View>
                </View>   

            </View>

            <View style={styles.container}>
                {/* Cart Button */}
                <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
                    <Ionicons name="cart" size={30} color="blue" />
                </TouchableOpacity>

                {/* Cart Modal */}
                <Modal visible={cartVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Shopping Cart</Text>
                            {cartItems.map((item, index) => (
                                <Text key={index} style={styles.cartItem}>{item.name} - {item.zone}</Text>
                            ))}
                            <TouchableOpacity onPress={() => setCartVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Court List */}
                <FlatList
                    data={courts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.courtName}>{item.name}</Text>
                            <Text style={styles.zone}>{item.zone}</Text>
                            <Text style={styles.price}>💎 {item.price} /Hr</Text>
                            {item.available ? (
                                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                                    <Text style={styles.addButtonText}>Add</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.fullButton}>
                                    <Text style={styles.fullButtonText}>Full</Text>
                                </View>
                            )}
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
    },
    cartButton: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cartItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 10,
    },
    closeText: {
        color: "red",
        fontSize: 16,
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    courtName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    zone: {
        fontSize: 14,
        color: "gray",
    },
    price: {
        fontSize: 16,
        marginVertical: 5,
    },
    addButton: {
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
    },
    fullButton: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    fullButtonText: {
        color: "white",
        fontSize: 16,
    },
    fac:{
        backgroundColor:"white",
        marginBottom:5,
        padding:15,
    },
    ifac:{
        backgroundColor:"#0001",
        borderColor:"lightgray",
        borderWidth:2,
        borderRadius:10,
        padding:5,
    },
    per:{
        marginBottom:0,
        backgroundColor:"white",
        padding:15,
        fontWeight:'bold',
        fontSize:16,

    },
    choose:{
        borderWidth:2,
        borderColor:"lightgray",
        borderRadius:20,
        backgroundColor:"white",
        padding:20,
        alignItems:'center',
        
    },
    itype:{

    },
    pickerContainer: { 
        
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10, 
        width:300,        
        
    },
    picker: { 
        fontSize:20,
        backgroundColor:'#3B82F6',
        color:'white',
        borderRadius:5,
        height:40,
        paddingLeft:5,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3B82F6", // ปรับสีตามต้องการ
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin:5,
      },
      buttonText: {
        color: "white",
        fontSize: 14,
        marginLeft: 6,
      },
      calendar:{
        width:280,
        height:350,
      },
      centerview1:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        alignItems:'center',
        justifyContent:'center'
      },
      modalview1:{
        borderRadius:20,
        padding:5,
        alignItems:'center',
        shadowColor: '#000',
        width:300,
        height:420,
        backgroundColor:'white',
        
      },
      close:{
        margin:30,
        fontSize:15,
        backgroundColor:'#3B82F6',
        width:100,
        alignItems:'center',
        
      },
      buttonContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        
      },
});
