import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Dimensions } from "react-native";

const JoinParty = () => {
  const router = useRouter();const screenWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Join Party </Text>
        <MaterialCommunityIcons name="party-popper" size={24} color="black" />
      </View>

      {/* Party Info */}
      <View style={styles.partyInfo}>
        <FontAwesome5 name="user-circle" size={40} color="black" />
        <Text style={styles.partyName}>PP</Text>
      </View>

      {/* Total Members */}
      <View style={styles.totalContainer}>
        <FontAwesome5 name="user-friends" size={24} color="black" />
        <Text style={styles.totalText}>Total : <Text style={styles.bold}>2/3</Text></Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactContainer}>
        <FontAwesome5 name="phone" size={20} color="black" />
        <Text style={styles.contactText}>090-000-0000</Text>
      </View>

      {/* Member List */}
      <Text style={styles.sectionTitle}>Member:</Text>
      <View style={styles.memberBox}>
      <FontAwesome5 name="crown" size={16} color="black"  />
        <View style={styles.memberItem}>
          <FontAwesome5 name="user-circle" size={16} color="black" />
          <Text style={styles.memberText}>Oak</Text>
        </View>
        <View style={styles.memberItem}>
          <FontAwesome5 name="user-circle" size={16} color="black" />
          <Text style={styles.memberText}>ABC</Text>
        </View>
      </View>

      {/* Broadcast */}
      <View style={styles.broadcastBox}>
        <View style={styles.memberItem}>
          <FontAwesome5 name="crown" size={16} color="black" />
          <Text style={styles.memberText}> Broadcast</Text>
        </View>
        <Text style={styles.broadcastText}>
          เล่นชิวๆ ไม่จริงจัง เน้นออกกำลังกาย
        </Text>
      </View>

      {/* Join Party Button */}
      <TouchableOpacity style={styles.joinButton} onPress={() => router.push("/partyin")}>
        <Text style={styles.joinButtonText}>Join Party</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinParty;

const styles = StyleSheet.create({
  bottomNav: { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "white" },
  centerview:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    padding:'7%',
    alignItems:'flex-end'

  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  partyInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  partyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    marginLeft: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  memberBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  memberText: {
    lineHeight: 20, // ✅ ปรับให้ตรงกับไอคอน
    marginLeft: 8,
  },
  broadcastBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  broadcastText: {
    fontSize: 16,
    marginTop: 5,
    color: "gray",
  },
  joinButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
