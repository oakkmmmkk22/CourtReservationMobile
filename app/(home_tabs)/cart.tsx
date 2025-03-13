import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button,Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { Dimensions } from "react-native";
import api from '../axiosinstance';
import { Platform } from "react-native"; // ใช้ Platform เพื่อตรวจสอบว่ากำลังใช้งานอยู่บนเว็บหรือมือถือ

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

interface caa {
  id: number;
  stadium_id: number;
  court_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  stadium_name: string;
  court_type: string;
  court_number: number;
  selected: boolean;
  point: number;
}
const BookingSelection = () => {
  const [balance, setBalance] = useState(200);
  const router = useRouter();
  const [cart, setCart] = useState<caa[]>([]);
  const [crytal,setCrytal] = useState(0);



  const fetchData = async () => {
    try {
      const response = await api.get("/getcart");
      const data = response.data?.cartItems;

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        return;
      }

      setCart((prevCart) => {
        return data.map((cartItem) => {
          const existingItem = prevCart.find((item) => item.id === cartItem.id);
          const updatedDate = new Date(cartItem.date);
          updatedDate.setHours(updatedDate.getHours() + 7);
          return {
            id: cartItem.id,
            stadium_id: cartItem.stadium_id,
            court_id: cartItem.court_id,
            date: updatedDate.toISOString().slice(0, 10),
            start_time: cartItem.start_time.slice(0, 5),
            end_time: cartItem.end_time.slice(0, 5),
            status: cartItem.status,
            stadium_name: cartItem.stadium_name,
            court_type: cartItem.court_type,
            court_number: cartItem.court_number,
            selected: existingItem ? existingItem.selected : false, // เก็บค่า selected เดิม
            point: cartItem.point,
          };
        });
      });
      const response2 = await api.get("/point");
      if (response2.data.length > 0) {
        setCrytal(response2.data[0].point);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  // คำนวณ totalAmount จากรายการที่ถูกเลือก
  // const totalAmount = bookings
  //   .filter((item) => item.selected)
  //   .reduce((sum, item) => {
  //     const effectivePrice = item.type === "Group" && item.peopleCount ? item.price / item.peopleCount : item.price;
  //     return sum + effectivePrice * (item.quantity || 1);
  //   }, 0);
  // คำนวณ Remaining Balance
  // const remainingBalance = balance - totalAmount;
  // Toggle Checkbox และอัปเดต Amount + Remaining Balance
  // const toggleSelection = (item: caa) => {
  //   setBookings((prev) =>
  //     prev.m
  // ap((item) =>
  //       item.id === id ? { ...item, selected: !item.selected, quantity: item.selected ? 1 : (item.quantity || 1) } : item
  //     )
  //   );

  // };
  // คำนวณ totalAmount จากรายการที่ถูกเลือก
  const totalAmount = cart
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.point, 0);

  // คำนวณ Remaining Balance
  const remainingBalance = crytal - totalAmount;


  const toggleSelection = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const handleDelete = (item: caa) => {
    console.log("press delete");
  
    if (Platform.OS === "web") {
      // สำหรับเว็บใช้ window.confirm() แทน
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
        deleteItem(item);
      }
    } else {
      // สำหรับมือถือใช้ Alert.alert
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this item?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteItem(item);
            },
          },
        ]
      );
    }
  };
  
  const deleteItem = async (item: caa) => {
    try {
      console.log("Deleting:", item.id);
      
      const response = await api.delete("/cart", {
        data: { cartId: item.id },
      });
  
      fetchData(); // รีเฟรชข้อมูลหลังจากลบสำเร็จ
      console.log("Delete success:", response.data);
    } catch (error) {
      console.error("Delete failed:");
    }
  };
  
  
  const pay_court = async () => {
    try {
      // ดึง cart_ids ที่ถูกเลือก
      const selectedCartIds = cart.filter(item => item.selected).map(item => item.id);
      console.log(selectedCartIds)
      if(selectedCartIds.length === 0){
        alert("โปรดเลือกรายการชำระ");
        return ;
      }
      const response = await api.post("/checkout", {
        cart_ids: selectedCartIds,
        // user_id: 1, // ตัวอย่าง user_id
      });

      if (response.data.success) {
        alert("การจองสำเร็จ");
        router.push('/my_booking');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("เกิดข้อผิดพลาดในการจอง");
    } finally {
    }
  };

  // อัปเดต Quantity และ Amount ตามการเปลี่ยนแปลง
  // const updateQuantity = (id: string, change: number) => {
  //   setBookings((prev) =>
  //     prev.map((item) =>
  //       item.id === id && item.selected
  //         ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
  //         : item
  //     )
  //   );
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleSelection(item.id)}>
              <Ionicons
                name={item.selected ? "checkbox" : "square-outline"}
                size={24}
                color={item.selected ? "blue" : "gray"}
              />
            </TouchableOpacity>

            <View style={styles.info}>
              <Text style={styles.place}>Place: <Text style={styles.bold}>{item.stadium_name}</Text></Text>
              <Text style={styles.detail}>Court: {item.court_type} {item.court_number}</Text>
              <Text style={styles.detail}>Date: {item.date}</Text>
              <Text style={styles.detail}>Time: {item.start_time} {item.end_time}</Text>
              <Text style={styles.price}>Price: 💎 {item.point}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDelete(item)}
            >
              <MaterialCommunityIcons
                name={"delete"}
                size={24}
                color={"red"}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add More */}
      <TouchableOpacity onPress={() => router.push("/(home_tabs)/cart")}>
        <Text style={styles.addMore}>Add more</Text>
      </TouchableOpacity>

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.amount}>💎 {crytal}</Text>
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
        onPress={pay_court}
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
