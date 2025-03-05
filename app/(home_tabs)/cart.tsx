import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";

interface BookingItem {
  id: string;
  place: string;
  court: string;
  date: string;
  time: string;
  price: number;
  selected: boolean;
  type: "Individual" | "Group";
  peopleCount?: number;
  quantity: number;
}
const screenWidth = Dimensions.get("window").width;
const BookingSelection = () => {
  const [balance, setBalance] = useState(200);
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "1",
      place: "Ruammitr court",
      court: "BADMINTON Zone 1",
      date: "25/12/2567",
      time: "20.00 - 21.00",
      price: 150,
      selected: true,
      type: "Individual",
      quantity: 1,
    },
    {
      id: "2",
      place: "Ruammitr court",
      court: "BADMINTON Zone 1",
      date: "25/12/2567",
      time: "21.00 - 22.00",
      price: 150,
      selected: false,
      quantity: 1,
      type: "Group",
      peopleCount: 2,
    },
  ]);

  // คำนวณ totalAmount จากรายการที่ถูกเลือก
  const totalAmount = bookings
    .filter((item) => item.selected)
    .reduce((sum, item) => {
      const effectivePrice = item.type === "Group" && item.peopleCount ? item.price / item.peopleCount : item.price;
      return sum + effectivePrice * (item.quantity || 1);
    }, 0);
  // คำนวณ Remaining Balance
  const remainingBalance = balance - totalAmount;
  // Toggle Checkbox และอัปเดต Amount + Remaining Balance
  const toggleSelection = (id: string) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected, quantity: item.selected ? 1 : (item.quantity || 1) } : item
      )
    );
  };
  // อัปเดต Quantity และ Amount ตามการเปลี่ยนแปลง
  const updateQuantity = (id: string, change: number) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id && item.selected
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Booking</Text>
      {/* List of bookings */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* Checkbox */}
            <TouchableOpacity onPress={() => toggleSelection(item.id)}>
              <Ionicons
                name={item.selected ? "checkbox" : "square-outline"}
                size={24}
                color={item.selected ? "blue" : "gray"}
              />
            </TouchableOpacity>

            {/* Booking Info */}
            <View style={styles.info}>
              <Text style={styles.place}>Place: <Text style={styles.bold}>{item.place}</Text></Text>
              <Text style={styles.detail}>Court: {item.court}</Text>
              <Text style={styles.detail}>Date: {item.date}</Text>
              <Text style={styles.detail}>Time: {item.time}</Text>
              <Text style={styles.detail}>Type: {item.type}</Text>
              <Text style={styles.price}>Price: 💎 {item.price}</Text>
            </View>

            {/* Quantity Control */}
            {item.selected && (
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Ionicons name="remove-circle-outline" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Ionicons name="add-circle-outline" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      {/* Add More */}
      <TouchableOpacity onPress={() => router.push("/(home_tabs)/cart")}>
        <Text style={styles.addMore}>Add more</Text>
      </TouchableOpacity>

      {/* Summary Section */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.amount}>💎 {balance}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>💎 {totalAmount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Remaining Balance</Text>
          <Text style={[styles.amount, remainingBalance < 0 && styles.error]}>
            💎 {remainingBalance}
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          remainingBalance < 0 && styles.disabledButton,
        ]}
        disabled={remainingBalance < 0}
        onPress={() => {
          if (remainingBalance >= 0) {
            router.push('/pay-slip') // ✅ ใช้ router.push() ได้แล้ว
          }
        }}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  place: {
    fontSize: 16,
    color: "black",
  },
  detail: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  addMore: {
    textAlign: "right",
    fontSize: 18,
    color: "gray",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  summary: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  confirmButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  confirmText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
});
