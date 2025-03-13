import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
import api from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

const JoinParty = () => {
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const params = useLocalSearchParams();
  const { party_id } = params;

  const [partyInfo, setPartyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchParties = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found! Authentication required.");
        setLoading(false);
        return;
      }

      const response = await api.get("/party/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length > 0) {
        const selectedParty = response.data.find((p) => p.party_id == party_id);
        if (selectedParty) {
          setPartyInfo(selectedParty);

          const userToken = await AsyncStorage.getItem("token");
          const user = JSON.parse(atob(userToken.split(".")[1])); // Decode JWT
          if (
            selectedParty.members?.some(
              (member) => member.username === user.userData.username
            )
          ) {
            setIsJoined(true);
          }
        } else {
          console.error("Party not found");
          setPartyInfo(null);
        }
      } else {
        setPartyInfo(null);
      }
    } catch (error) {
      console.error("Error fetching parties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (party_id) {
      fetchParties();
    }
  }, [party_id]);

  const handleJoinParty = async () => {
    if (!party_id) {
      Alert.alert("Error", "No party selected!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Authentication Error", "User token not found!");
        return;
      }

      console.log("🔹 [Frontend] Sending Request to /party/join");
      console.log("📝 Data Sent:", { partyid: party_id });

      const response = await api.post(
        "/party/join",
        { partyid: Number(party_id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("party_id", party_id.toString());

        Alert.alert("Success", "You have successfully joined the party! 🎉");
        router.push("/partyin");
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to join the party or you have already joined. Please check again or not have enough points to join the party."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Join Party</Text>
        <MaterialCommunityIcons name="party-popper" size={24} color="red" />
      </View>

      {/* เช็คว่าโหลดข้อมูลเสร็จหรือไม่ */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : partyInfo ? (
        <>
          {/* Party Info */}
          <View style={styles.partyInfo}>
            <FontAwesome5 name="user-circle" size={40} color="gray" />
            <Text style={styles.partyName}>{partyInfo.leader_username}</Text>
          </View>

          {/* Total Members */}
          <View style={styles.totalContainer}>
            <FontAwesome5 name="user-friends" size={24} color="blue" />
            <Text style={styles.totalText}>
              Total :{" "}
              <Text style={styles.bold}>
                {partyInfo.current_members}/{partyInfo.total_members}
              </Text>
            </Text>
          </View>

          {/* Location */}
          <View style={styles.contactContainer}>
            <FontAwesome5 name="map-marker-alt" size={22} color="red" />
            <Text style={styles.contactText}>{partyInfo.stadium_location}</Text>
          </View>

          {/* Broadcast */}
          <View style={styles.broadcastBox}>
            <View style={styles.memberItem}>
              <FontAwesome5 name="crown" size={16} color="orange" />
              <Text style={styles.memberText}> Broadcast</Text>
            </View>
            <Text style={styles.broadcastText}>
              {partyInfo.detail || "No Description"}
            </Text>
          </View>

          {/* Join Party Button */}
          {/* ถ้าเคยเข้าร่วมแล้วให้แสดงข้อความแทนปุ่ม */}
          {isJoined ? (
            <Text style={styles.joinedText}>คุณได้เข้าร่วมปาร์ตี้นี้แล้ว!</Text>
          ) : (
            <TouchableOpacity
              style={styles.joinButton}
              onPress={handleJoinParty}
            >
              <Text style={styles.joinButtonText}>Join Party</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={styles.noDataText}>No parties available</Text>
      )}
    </View>
  );
};

export default JoinParty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  partyInfo: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  partyName: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  totalText: { fontSize: 16, marginLeft: 10 },
  bold: { fontWeight: "bold" },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  contactText: { fontSize: 16, marginLeft: 10 },
  broadcastBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  broadcastText: { fontSize: 16, marginTop: 5, color: "gray" },
  joinButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  loadingText: { textAlign: "center", fontSize: 16, color: "gray" },
  noDataText: { textAlign: "center", fontSize: 16, color: "red" },
  joinedText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
});
