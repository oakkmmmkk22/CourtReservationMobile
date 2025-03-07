import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const PartyScreen = () => {
  const router = useRouter();

  // รายละเอียดสมาชิก
  const members = [
    { id: "1", name: "Oak", isLeader: true },
    { id: "2", name: "ABC", isLeader: false },
    { id: "3", name: "PP", isLeader: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* ปุ่มย้อนกลับ */}
        <TouchableOpacity
          onPress={() => router.push("/(home_tabs)/find_friend")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>In Party </Text>
        <MaterialCommunityIcons name="party-popper" size={24} color="black" />

        <View style={styles.iconContainer}>
          {/* Bill Icon */}
          <TouchableOpacity onPress={() => router.push("/(home_tabs)/cart")}>
            <MaterialCommunityIcons
              name="wallet"
              size={24}
              color="black"
              style={styles.billIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Broadcast */}
      <View style={styles.broadcastBox}>
        <Text style={styles.broadcastTitle}>
          <FontAwesome5 name="crown" size={14} /> Broadcast
        </Text>
        <Text style={styles.broadcastText}>
          เล่นชิวๆ ไม่จริงจัง เน้นออกกำลังกาย
        </Text>
      </View>

      {/* Member Section */}
      <Text style={styles.memberTitle}>Member:</Text>
      <View style={styles.memberBox}>
        {/* Leader & Member Count */}
        <View style={styles.memberHeader}>
          <Text style={styles.leaderText}>
            <FontAwesome5 name="crown" size={14} /> Oak
          </Text>
          <Text style={styles.countText}>3/3</Text>
        </View>

        {/* Member List */}
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.memberItem}>
              <FontAwesome5 name="user-circle" size={14} />
              <Text style={styles.memberName}> {item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// สไตล์
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  billIcon: {
    marginLeft: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderColor:"red",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 10  , borderColor:"red"},

  broadcastBox: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  broadcastTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  broadcastText: { fontSize: 16 },

  memberTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  memberBox: { borderWidth: 1, borderRadius: 8, padding: 12 },
  memberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leaderText: { fontSize: 18, fontWeight: "bold" },
  countText: { fontSize: 18, fontWeight: "bold" },

  memberItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  memberName: { fontSize: 16, marginLeft: 10 },
});

export default PartyScreen;
