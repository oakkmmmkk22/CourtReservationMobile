import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import api from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PartyScreen = () => {
  const router = useRouter();
  const [partyInfo, setPartyInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partyID, setPartyID] = useState(null);

  // ✅ โหลด party_id จาก AsyncStorage
  const getStoredPartyID = async () => {
    const storedID = await AsyncStorage.getItem("party_id");
    if (storedID) {
      setPartyID(storedID);
    } else {
      console.error("❌ No stored party_id found!");
    }
  };

  // ✅ ดึงข้อมูลปาร์ตี้ (รวม Broadcast)
  const fetchPartyInfo = async () => {
    if (!partyID) return;
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("❌ Token not found!");
        setLoading(false);
        return;
      }

      const response = await api.get("/party/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Party Info Response:", response.data);

      // ✅ ค้นหา party_id ที่ตรงกัน
      const partyData = response.data.find((party) => party.party_id == partyID);

      if (partyData) {
        setPartyInfo(partyData);
      } else {
        console.error("❌ Party not found");
        setPartyInfo(null);
      }
    } catch (error) {
      console.error("❌ Error fetching party info:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ดึงข้อมูลสมาชิกของปาร์ตี้
  const fetchPartyMembers = async () => {
    if (!partyID) return;
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token || !partyID) {
        console.error("❌ Token or party_id not found!");
        setLoading(false);
        return;
      }

      const response = await api.get(`/getparty/${partyID}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Members Response:", response.data);

      if (response.data.members.length > 0) {
        setMembers(response.data.members);
      } else {
        console.error("❌ No members found in this party");
        setMembers([]);
      }
    } catch (error) {
      console.error("❌ Error fetching party members:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    getStoredPartyID();
  }, []);

  useEffect(() => {
    if (partyID) {
      fetchPartyInfo();
      fetchPartyMembers();
    }
  }, [partyID]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(home_tabs)/find_friend")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* ✅ Broadcast จาก API `/party/pending` */}
      <View style={styles.broadcastBox}>
        <Text style={styles.broadcastTitle}>
          <FontAwesome5 name="crown" size={14} /> Broadcast
        </Text>
        <Text style={styles.broadcastText}>
          {partyInfo ? partyInfo.detail || "No Description" : "Loading..."}
        </Text>
      </View>

      {/* Member Section */}
      <Text style={styles.CountText}>Members:</Text>

      {/* Member List */}
      <View style={styles.memberBox}>
        <View style={styles.memberHeader}>
          <Text style={styles.countText}>{members.length} Members</Text>
        </View>

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
    </View>
  );
};

// 🔥 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  broadcastBox: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  broadcastTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  broadcastText: { fontSize: 16 },
  CountText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  memberBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
  memberHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  countText: { fontSize: 18, fontWeight: "bold" },
  memberItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  memberName: { fontSize: 16, marginLeft: 10 },
  loadingText: { textAlign: "center", fontSize: 16, color: "gray" },
  noDataText: { textAlign: "center", fontSize: 16, color: "red" },
});

export default PartyScreen;
