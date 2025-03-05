import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Slip = () => {
  const router = useRouter();

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
        <Text style={styles.date}>Wed, May 27, 2028 • 9:27:53 AM</Text>

        <View style={styles.receiptIdBox}>
          <Text style={styles.receiptIdLabel}>Receipt ID</Text>
          <Text style={styles.receiptId}>0237-7746-8981-9028-5626</Text>
        </View>

        {/* ข้อมูลการจอง */}
        <View style={styles.details}>
  <View style={styles.row}>
    <Text style={styles.label}>Type:</Text>
    <Text style={styles.value}>Individual</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Customer Name:</Text>
    <Text style={styles.value}>Victor Shoaga</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Place:</Text>
    <Text style={styles.value}>Ruammitr court</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Court:</Text>
    <Text style={styles.value}>BADMINTON Zone1</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Date:</Text>
    <Text style={styles.value}>25/12/2567</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Time:</Text>
    <Text style={styles.value}>20.00 - 21.00</Text>
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
    <Text style={styles.value}>150 💎</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Total:</Text>
    <Text style={styles.value}>150 💎</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Remaining Balance:</Text>
    <Text style={styles.value}>50 💎</Text>
  </View>
</View>

{/* ผู้ดำเนินการ */}
<View style={styles.row}>
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
    justifyContent: "space-between", // จัดให้ชื่อกับค่าผลลัพธ์อยู่คนละฝั่ง
    width: "100%", // ให้ขยายเต็มพื้นที่
    paddingVertical: 5, // เพิ่มระยะห่าง
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
