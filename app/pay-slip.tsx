import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";



const Slip = () => {
  const router = useRouter();
  
  const { mode_party, place, court, type, date_pay, start_time, end_time, price, idslip_for_pay} = useGlobalSearchParams();
  const [memberName, setMemberName] = useState("");
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(token); // test decode
    setMemberName(decoded.userData.username);
  };

    useEffect(() => {
      getToken();
      console.log(location);
      console.log(idslip_for_pay);
    }, []);

    const getPartyMode = (mode_party: string | null) => {
      return mode_party === null || mode_party === "null" ? "Individual" : "Party";
    };

    
  return (
    <View style={styles.container}>
      {/* ปุ่มกลับไปหน้า Home */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Return To Home</Text>
      </TouchableOpacity>

      {/* ใบเสร็จ */}
      <View style={styles.receipt}>
        <Text style={styles.logo}>sports</Text>
        <Text style={styles.date}>{date_pay
    ? (() => {
        const [date, time] = date_pay.split("T"); // แยกวันที่และเวลา
        const [hours, minutes] = time.split(":"); // แยกชั่วโมงและนาที
        return `${date} ${hours}:${minutes}`; // แสดงวันที่และเวลา
      })()
    : "Invalid Date"}</Text>

        <View style={styles.receiptIdBox}>
          <Text style={styles.receiptIdLabel}>Receipt ID</Text>
          <Text style={styles.receiptId}>{idslip_for_pay}</Text>
        </View>

        {/* ข้อมูลการจอง */}
        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{getPartyMode(mode_party)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Name:</Text>
            <Text style={styles.value}>{memberName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Place:</Text>
            <Text style={styles.value}>{place}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Court:</Text>
            <Text style={styles.value}>{type} Zone {court}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>25/12/2567</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}> {start_time ? start_time.split(":").slice(0, 2).join(":") : "N/A"} - 
            {end_time ? end_time.split(":").slice(0, 2).join(":") : "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Count:</Text>
            <Text style={styles.value}>1 court</Text>
          </View>
        </View>

        {/* สรุปยอดเงิน */}
        <View style={styles.summary}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>{price} 💎</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.value}>{price} 💎</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Remaining Balance:</Text>
            <Text style={styles.value}>50 💎</Text>
          </View>
        </View>

        {/* ผู้ดำเนินการ */}
        <View style={styles.summary}>
          <Text style={styles.label}>Operator:</Text>
          <Text style={styles.value}>Admin</Text>
        </View>


        {/* โลโก้ */}
        <Text style={styles.logo}>sports</Text>
      </View>

      {/* ปุ่ม Done */}
      <TouchableOpacity style={styles.doneButton} onPress={() => router.push("/home")}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Slip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 30,
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "black",
  },
  receipt: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10,
  },
  receiptIdBox: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  receiptIdLabel: {
    fontSize: 12,
    color: "gray",
  },
  receiptId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    alignSelf: "stretch",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  value: {
    fontSize: 14,
    color: "black",
  },
  bold: {
    fontWeight: "bold",
  },
  summary: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderColor: "gray",
    borderStyle: "dotted",
    paddingTop: 10,
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  doneText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
