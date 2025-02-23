import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen() {
    const [selectedSport, setSelectedSport] = useState("BADMINTON");

    const courts = [
        { id: "1", name: "BADMINTON", zone: "Zone 1", price: 150, available: true },
        { id: "2", name: "BADMINTON", zone: "Zone 2", price: 150, available: false },
    ];

    return (
        <View style={styles.container}>
            {/* Facilities Section */}
            <View style={styles.facilities}>
                {["Toilet", "Parking Sport", "Lending", "Room", "Store", "CCTV"].map((item, index) => (
                    <View key={index} style={styles.facilityItem}>
                        <Ionicons name="checkmark-circle" size={18} color="green" />
                        <Text style={styles.facilityText}>{item}</Text>
                    </View>
                ))}
            </View>

            {/* Period Selection */}
            <View style={styles.periodContainer}>
                <Picker
                    selectedValue={selectedSport}
                    onValueChange={(itemValue) => setSelectedSport(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="BADMINTON" value="BADMINTON" />
                    {/* เพิ่มกีฬาอื่นๆ ได้ที่นี่ */}
                </Picker>
                <View style={styles.dateTimeContainer}>
                    <TouchableOpacity style={styles.dateTimeButton}>
                        <Ionicons name="calendar" size={18} color="white" />
                        <Text style={styles.dateTimeText}>25/12/2567</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeButton}>
                        <Ionicons name="time" size={18} color="white" />
                        <Text style={styles.dateTimeText}>20.00 - 21.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchButton}>
                        <Ionicons name="search" size={18} color="blue" />
                    </TouchableOpacity>
                </View>
            </View>

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
                            <TouchableOpacity style={styles.addButton}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
    },
    facilities: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    facilityItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 5,
    },
    facilityText: {
        marginLeft: 5,
        fontSize: 14,
        color: "black",
    },
    periodContainer: {
        backgroundColor: "#eef",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    picker: {
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 10,
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateTimeButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 5,
    },
    dateTimeText: {
        color: "white",
        marginLeft: 5,
    },
    searchButton: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 5,
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
});
