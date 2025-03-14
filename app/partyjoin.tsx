import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import api from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { Bold } from "lucide-react-native";

const JoinParty = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { party_id } = params;

  const [partyInfo, setPartyInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    setUsername(user.userData.username);
  };

  const fetchPartyInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      console.log("🔹 Fetching party info from /party/pending");

      const response = await api.get("/party/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Party Pending Response:", response.data);

      const selectedParty = response.data.find((p) => p.party_id == party_id);

      if (selectedParty) {
        setPartyInfo(selectedParty);
      } else {
        console.error("❌ Party not found in /party/pending");
        setPartyInfo(null);
      }
    } catch (error) {
      console.error("❌ Error fetching party info:", error);
    }
  };

  useEffect(() => {
    fetchPartyInfo();
  }, [party_id]);


  const fetchPartyMembers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await api.get(`/getparty/${party_id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMembers(response.data.members);

      if (
        response.data.members.some((member) => member.username === username)
      ) {
        setIsJoined(true);
      } else {
        setIsJoined(false);
      }
    } catch (error) {
      console.error("❌ Error fetching party members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinParty = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      console.log("🔹 Joining party ID:", party_id);

      const response = await api.post(
        "/party/join",
        { partyid: Number(party_id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("party_id", party_id.toString());
        Alert.alert("Success", "You have joined the party!");
        fetchPartyMembers(); // ✅ โหลดข้อมูลสมาชิกใหม่
      }
    } catch (error) {
      Alert.alert("Error", "Failed to join party.");
    }
  };

  // ✅ ออกจากปาร์ตี้
  const handleLeaveParty = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      console.log("🔹 Leaving party ID:", party_id);

      const response = await api.post(
        "/party/leave",
        { partyId: Number(party_id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("party_id");
        Alert.alert("Success", "You have left the party!");
        fetchPartyMembers(); // ✅ โหลดข้อมูลสมาชิกใหม่
      }
    } catch (error) {
      Alert.alert("Error", "Failed to leave party.");
    }
  };

  useEffect(() => {
    getUsername().then(() => {
      fetchPartyInfo();
      fetchPartyMembers();
    });
  }, [party_id, username]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Party Details</Text>
      </View>

      {/* Party Info */}
      <View style={styles.partyInfo}>
        <FontAwesome5
          name="user-circle"
          size={50}
          color="gray"
          style={styles.icon_lead}
        />
        <Text style={styles.leader_name}>
          {partyInfo?.leader_username || "Unknown Leader"}
        </Text>
      </View>

      {/* Topic */}
      <View style={styles.topicRow}>
        <Text style={styles.topicLabel}>Topic: </Text>
        <Text style={styles.topicText}>{partyInfo?.topic || "No Topic"}</Text>
      </View>

      {/* Total Members */}
      <View style={styles.detailRow}>
        <FontAwesome5 name="users" size={35} color="blue" />
        <Text style={styles.detailText}>
          Total: {partyInfo?.members.length || 0}/
          {partyInfo?.total_members || "?"}
        </Text>
      </View>

      {/* Location */}
      <View style={styles.detailRow}>
        <FontAwesome5
          name="map-marker-alt"
          size={30}
          color="red"
          style={styles.icon}
        />
        <Text style={styles.detailText}>
          Location: 
          {partyInfo?.stadium_location || "Unknown Location"}
        </Text>
      </View>
      {/* Time */}
      <View style={styles.detailRow}>
        <FontAwesome5
          style={styles.icon}
          name="clock"
          size={30}
          color="black"
        />
        <Text style={styles.detailText}>
          Time:
          {partyInfo?.start_time?.slice(0, 5)} -{" "}
          {partyInfo?.end_time?.slice(0, 5)}
        </Text>
      </View>
      {/* Member List*/}
      <View style={styles.memberBox}>
        <Text style={styles.memberTitle}>Members:</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading members...</Text>
        ) : members.length === 0 ? (
          <Text style={styles.noDataText}>No members in this party</Text>
        ) : (
          <FlatList
            data={members}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.memberItem}>
                <FontAwesome5 name="user-circle" size={14} />
                <Text style={styles.memberName}> {item.username}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Broadcast*/}
      <View style={styles.broadcastBox}>
        <Text style={styles.broadcastTitle}>
          <FontAwesome5 name="crown" size={14} /> Broadcast
        </Text>
        <Text style={styles.broadcastText}>
          {partyInfo?.detail || "No Broadcast available"}
        </Text>
      </View>

      {/*  ปุ่ม Join หรือ Leave */}
      <View style={styles.buttonContainer}>
        {isJoined ? (
          <TouchableOpacity
            style={styles.leaveButton}
            onPress={handleLeaveParty}
          >
            <Text style={styles.leaveButtonText}>Leave Party</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinParty}>
            <Text style={styles.joinButtonText}>Join Party</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  broadcastBox: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  memberBox: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  broadcastTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  broadcastText: { fontSize: 16 },
  memberTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  memberItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  memberName: { fontSize: 18, marginLeft: 10 },
  leader_name: { fontSize: 20, fontWeight: "bold" },
  loadingText: { textAlign: "center", fontSize: 16, color: "gray" },
  noDataText: { textAlign: "center", fontSize: 16, color: "red" },
  buttonContainer: { alignItems: "center", marginTop: 20 },
  joinButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  leaveButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  leaveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  partyDetails: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 2,
  },
  icon: {
    marginLeft: 10,
  },
  icon_lead: {
    marginRight: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "black",
  },
  partyInfo: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 10,
  },
  topicRow: {
    flexDirection: "row", 
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
  },

  topicText: {
    fontSize: 18,
    color: "gray",
    marginLeft: 5, // เพิ่มระยะห่างระหว่างไอคอนกับข้อความ
  },
  topicLabel: {
    fontSize: 25,
    fontWeight: "bold", // ทำให้ "Topic:" เป็นตัวหนา
    color: "black", // สีดำ
  },
});

export default JoinParty;
