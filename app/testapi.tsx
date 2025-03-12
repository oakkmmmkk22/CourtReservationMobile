import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./axiosinstance";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

interface Reservations {
  id: number;
  court_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  rating: number;
  stadium_name: string;
  court_number: number;
  type: string;
  price: number;
  party_id: number;
  pictures: { path: string; photoUrl: string }[]; // เพิ่ม pictures ใน interface
}

const HomeScreen = () => {
  const [mybook, setMybook] = useState<Reservations[]>([]);
  const [mode, setMode] = useState<"party" | "individual" | "all">("all");

  const fetchData = () => {
    api
      .get("/reservations")
      .then((response) => {
        console.log("API Response:", response.data);
        setMybook(response.data); // อัพเดทข้อมูลใหม่ทั้งหมดที่ได้จาก API
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleCancel = () => {
    console.log("Cancel button clicked");
    // ใส่ฟังก์ชันที่จะทำเมื่อกด Cancel ที่นี่
  };

  const filteredData = mybook.filter((item) => {
    if (mode === "party") {
      return item.party_id !== null && item.party_id !== 0;
    }
    if (mode === "individual") {
      return item.party_id === null || item.party_id === 0;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.sectionTitle}>Reservation</Text>
        <View style={styles.center}>
          <Text style={styles.itemCount}> {mybook.length} </Text>
        </View>
      </View>
      <View style={styles.modeSelection}>
        <TouchableOpacity
          onPress={() => setMode("all")}
          style={[styles.button, mode === "all" && styles.activeButton]}
        >
          <Text
            style={mode === "all" ? styles.activeMode : styles.inactiveMode}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode("party")}
          style={[styles.button, mode === "party" && styles.activeButton]}
        >
          <Text
            style={mode === "party" ? styles.activeMode : styles.inactiveMode}
          >
            Party
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode("individual")}
          style={[styles.button, mode === "individual" && styles.activeButton]}
        >
          <Text
            style={
              mode === "individual" ? styles.activeMode : styles.inactiveMode
            }
          >
            Individual
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData.sort((a, b) => {
          const now = new Date().getTime(); // เวลาปัจจุบัน
          const dateA = new Date(a.date).toISOString().split("T")[0];
          const dateB = new Date(b.date).toISOString().split("T")[0];
          const dateTimeA = new Date(`${dateA}T${a.start_time}`).getTime();
          const dateTimeB = new Date(`${dateB}T${b.start_time}`).getTime();

          if (dateTimeA < now && dateTimeB < now) {
            return dateTimeB - dateTimeA; // ล่าสุดอยู่บน
          }

          if (dateTimeA < now) return 1;
          if (dateTimeB < now) return -1;

          if (dateA !== dateB) {
            return dateTimeA - dateTimeB;
          }

          return dateTimeA - dateTimeB;
        })}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Reservations }) => {
          const isIndividual = !item.party_id;
          return (
            <TouchableOpacity onPress={() => router.push("/pay-slip")}>
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.dateText}>{item.date.slice(0, 10)}</Text>

                  {/* แสดงรูปภาพ */}
                  {item.pictures && item.pictures.length > 0 ? (
                    <FlatList
                      horizontal
                      data={item.pictures}
                      keyExtractor={(picture, index) => index.toString()}
                      renderItem={({ item: picture }) => (
                        <Image
                          source={{ uri: picture.photoUrl }}  // ใช้ photoUrl เพื่อแสดงรูปภาพ
                          style={styles.cardImage}
                          onError={(e) =>
                            console.log("Error loading image:", e.nativeEvent.error)
                          }
                        />
                      )}
                    />
                  ) : (
                    <Text style={styles.noImageText}>No images available</Text>
                  )}

                  <View style={styles.cardFooter}>
                    <Text style={styles.t}>Place: </Text>
                    <Text style={styles.cardTitle}>{item.stadium_name}</Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.t}>Court: </Text>
                    <Text style={styles.cardCourt}>
                      {item.type} Court {item.court_number}
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.t}>Time: </Text>
                    <Text style={styles.cardTime}>
                      {item.start_time.slice(0, 5)} - {item.end_time.slice(0, 5)}
                    </Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.t}>Price: </Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.t}>Status: </Text>
                    <Text style={styles.cardStatus}>{item.status}</Text>
                  </View>

                  <View style={styles.modeContainer}>
                    <View style={{ marginBottom: 13 }}>
                      <Text
                        style={
                          item.party_id ? styles.partyMode : styles.notPartyMode
                        }
                      >
                        {item.party_id ? "🎉 Party" : "⚡ Individual"}
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end", flex: 1 }}>
                      {isIndividual && (
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={handleCancel}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginRight: 10 },
  left: { alignItems: "flex-end", padding: 15 },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  noImageText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  cardContent: {
    padding: 10,
    flex: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  cardCourt: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  cardTime: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    marginTop: 5,
  },
  cardPrice: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  cardStatus: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  itemCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  center: {
    paddingRight: 50,
  },
  t: {
    fontSize: 16,
    color: "gray",
    paddingRight: 5,
  },
  dateText: {
    position: "absolute",
    top: 5,
    right: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
  modeContainer: {
    paddingVertical: 5,
    alignItems: "flex-end",
    borderRadius: 8,
    flexDirection: "row",
  },
  partyMode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f", // สีแดง
  },
  notPartyMode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff", // สีน้ำเงิน
  },
  cancelButton: {
    backgroundColor: "#d9534f", // สีแดง
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: 80,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modeSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#f0f0f0", // พื้นหลังปกติ
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "black", // พื้นหลังเมื่อถูกเลือก
  },
  activeMode: {
    color: "#fff", // สีข้อความเมื่อถูกเลือก
    fontWeight: "bold",
  },
  inactiveMode: {
    color: "black", // สีข้อความเมื่อไม่ได้เลือก
  },
});

export default HomeScreen;