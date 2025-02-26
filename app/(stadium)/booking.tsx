import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BookingScreen() {
    const [selectedSport, setSelectedSport] = useState("BADMINTON");
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    const courts = [
        { id: "1", name: "BADMINTON", zone: "Zone 1", price: 150, available: true },
        { id: "2", name: "BADMINTON", zone: "Zone 2", price: 150, available: false },
    ];

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
        setCartVisible(true);
    };

    return (
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
});
