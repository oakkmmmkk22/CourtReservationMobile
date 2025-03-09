import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from "react-native-element-dropdown";
import api from '../axiosinstance';



export default function BookingScreen() {
    const [selectedSport, setSelectedSport] = useState("BADMINTON");
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formattedTime, setFormattedTime] = useState("");
    const [showTimepicker, setShowTimepicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [reservationData, setReservationData] = useState<number[]>([]);
    const [stadiumData, setStadiumData] = useState<{
      id: number;
      stadium: string;
      openHour: string;
      closeHour: string;
    } | null>(null);
    const [stadiumCourtData, setStadiumCourtData] = useState<
      { stadium_id: number; court_id: number; court_number: number; stadium: string; Facility_Type: string; Status: string; price: number }[]
    >([]);


    const router = useRouter();
    const { facility_names, facility_type, idsss, open_hour, close_hour } = useGlobalSearchParams();
    const facilities = facility_names?.split(",") || [];
    const facilitiesType = facility_type?.split(",") || [];

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

    
    const OpenTime = open_hour || "00:00"; // เวลาเปิด
    const CloseTime = close_hour || "18:00"; // เวลาเปิด

    const [timeSlots, setTimeSlots] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        if (OpenTime && CloseTime) {
            setTimeSlots(generateTimeSlots(OpenTime, CloseTime, 1)); // 1 ชั่วโมงเป็น gap time
        }
    }, [OpenTime, CloseTime]);

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

    const [type, setType] = useState(null);

    const sports = [
        { label: "🏸 Badminton", value: "badminton" },
        { label: "⚽ Football", value: "football" },
        { label: "🎾 Tennis", value: "tennis" },
        { label: "🏐 Volleyball", value: "volleyball" },
        { label: "🏀 Basketball", value: "basketball" },
        { label: "🏈 American Football", value: "american_football" },
        { label: "🎱 Billiards", value: "billiards" },
        { label: "⛳ Golf", value: "golf" },
        { label: "🏏 Cricket", value: "cricket" },
        { label: "🏒 Ice Hockey", value: "ice_hockey" },
        { label: "🤾‍♂️ Handball", value: "handball" },
        { label: "🤸‍♀️ Gymnastics", value: "gymnastics" },
        { label: "🏌️‍♂️ Golf", value: "golf" },
        { label: "🏄‍♀️ Surfing", value: "surfing" },
        { label: "🏊‍♂️ Swimming", value: "swimming" },
        { label: "🏓 Table Tennis", value: "table_tennis" },
        { label: "🏉 Rugby", value: "rugby" },
        { label: "⚽ Soccer", value: "soccer" },

    ];
    const availableSports = sports.filter(sport =>
        facilitiesType.some(facility => facility.toLowerCase() === sport.value.toLowerCase()) // ตรวจสอบแบบ case-insensitive
    );

    const filter_court = async () => {
        console.log("at on press")
        const utcDate = new Date(formattedDate + "T00:00:00Z").toISOString();
        console.log(utcDate); 
        const [startTime, endTime] = selectedTime ? selectedTime.split("-") : [null, null];
        console.log(startTime)
        console.log(endTime)
        console.log(type)
        const response = await api.post("/getCourtDetailsBooking", {
            date:utcDate,
            start:startTime,
            end:endTime,
            type:type,
            id_stadium:idsss,
        });
        // console.log(response.data)

        setReservationData(response.data.reservationData);
        setStadiumData(response.data.stadiumData);
        setStadiumCourtData(response.data.stadiumCourtData);


        console.log(reservationData);
        console.log(stadiumData);
        console.log(stadiumCourtData); 
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fac}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Facilities :
                </Text>
                <View style={styles.ifac}>
                    <Text>
                        {facilities.map((facility, index) => (
                            <View key={index}>
                                <Text style={styles.itype}>
                                    <AntDesign name={"checkcircle"} color={"green"} size={18} style={{ marginLeft: 10 }}></AntDesign> {facility}
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
                <View style={{ paddingRight: 10, paddingLeft: 10, backgroundColor: 'white' }}>
                    <View style={styles.choose}>
                        <View style={styles.pickerContainer}>
                            <Dropdown
                                data={availableSports}
                                labelField="label"
                                valueField="value"
                                value={type}
                                onChange={(item) => { setType(item.value); }}
                                placeholder="Select Sport"
                                style={{
                                    height: 50,
                                    borderColor: '#3B82F6',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                }}
                                placeholderStyle={{ color: '#3B82F6' }}
                                selectedTextStyle={{ color: '#3B82F6' }}
                            // dropdownStyle={{
                            // backgroundColor: '#3B82F6',
                            // borderRadius: 5,
                            // marginTop: 5,
                            // }}
                            />

                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
                                <AntDesign name="calendar" size={18} color="white" />
                                <Text style={styles.buttonText}>{formattedDate ? formattedDate : "Choose Date"}</Text>
                            </TouchableOpacity>

                            <View style={styles.buttontime}>
                                <Ionicons name="time-outline" size={18} color="white" style={{ paddingRight: 5 }} />
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
                                        borderColor: '#3B82F6',
                                        borderRadius: 5,
                                        // paddingHorizontal: 10,
                                        backgroundColor: '#3B82F6',
                                        color: '#fff',
                                        width: 150
                                    }}
                                    placeholderStyle={{ color: '#fff' }}
                                    selectedTextStyle={{ color: '#fff' }}
                                // dropdownStyle={{
                                // backgroundColor: '#fafafa',
                                // borderRadius: 5,
                                // marginTop: 5,
                                // }}

                                />
                            </View>

                            <TouchableOpacity style={styles.button} >
                                <AntDesign name="search1" size={18} color="white" onPress={filter_court}/>

                            </TouchableOpacity>
                        </View>


                    </View>
                    <Modal visible={showModal} animationType="fade" transparent={true} >
                        <View style={styles.centerview1}>
                            <View style={styles.modalview1}>
                                <Calendar style={styles.calendar}

                                    onDayPress={date => {
                                        //console.log(date);
                                        let selectedDate = date.dateString;
                                        // selectedDate.setHours(0, 0, 0, 0);
                                        // setDate(selectedDate);
                                        setFormattedDate(selectedDate);
                                        console.log(selectedDate);
                                        setShowModal(false);
                                    }}
                                    minDate={"2025-01-01"}
                                    maxDate={"2025-12-31"}

                                />

                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                    <View style={styles.close}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }} >Close</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </View>

            </View>

            <View style={styles.container}>
                {/* Cart Button */}

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

                <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
                    <Ionicons name="cart" size={30} color="blue" />
                </TouchableOpacity>
                {/* Court List */}
                <FlatList
                    data={stadiumCourtData}
                    keyExtractor={(item) => item.court_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.courtName}>{item.Facility_Type}</Text>
                            <Text style={styles.zone}>{item.court_number}</Text>
                            <Text style={styles.price}>💎 {item.price} /Hr</Text>
                            
                            {/* เช็คเงื่อนไขการแสดงปุ่ม */}
                            {reservationData.includes(item.court_number) ? (
                                <View style={styles.fullButton}>
                                    <Text style={styles.fullButtonText}>Full</Text>
                                </View>
                            ) : item.Status === "available" ? (
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


const pickerStyles = StyleSheet.create({
    inputAndroid: {
        backgroundColor: "#3B82F6",
        color: "#fff",
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 5,
        width: 300,
    },
    inputIOS: {
        paddingHorizontal: 10,
        height: 50, // เพิ่มความสูง
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#3B82F6",
        width: 200,
        color: "#fff",
        justifyContent: "center", // แนวตั้งกลาง
        paddingVertical: 10, // เพิ่ม padding เพื่อให้คลิกได้ง่ายขึ้น
    },
});

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
    fac: {
        backgroundColor: "white",
        marginBottom: 5,
        padding: 15,
    },
    ifac: {
        backgroundColor: "#0001",
        borderColor: "lightgray",
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
    },
    per: {
        marginBottom: 0,
        backgroundColor: "white",
        padding: 15,
        fontWeight: 'bold',
        fontSize: 16,

    },
    choose: {
        borderWidth: 2,
        borderColor: "lightgray",
        borderRadius: 20,
        backgroundColor: "white",
        padding: 20,
        alignItems: 'center',

    },
    itype: {

    },
    pickerContainer: {

        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        width: 300,

    },
    picker: {
        backgroundColor: '#3B82F6',
        color: 'white',
        borderRadius: 10,
        height: 50,
        fontWeight: 'bold',
        width: "100%",


        // paddingLeft:,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3B82F6", // ปรับสีตามต้องการ
        borderRadius: 8,
        margin: 5,
        padding: 10,
        height: 50
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        marginLeft: 6,
    },
    calendar: {
        width: 280,
        height: 350,
    },
    centerview1: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalview1: {
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        width: 300,
        height: 420,
        backgroundColor: 'white',

    },
    close: {
        margin: 30,
        fontSize: 15,
        backgroundColor: '#3B82F6',
        width: 100,
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,

    },
    pickerItem: {
        fontSize: 18, // ปรับขนาดฟอนต์ของ iOS
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#3B82F6",
    },
    buttontime: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3B82F6", // ปรับสีตามต้องการ
        borderRadius: 8,
        margin: 5,
        paddingLeft: 10,
        //borderWidth:10
    },

});
