import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Bell, MapPin, Sliders } from "lucide-react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import api from "../axiosinstance";

interface Partyshow {
  party_id: string;
  leader_username: string;
  court_id: number;
  total_members: number;
  current_members: number;
  price_per_person: number;
  date: string;
  start_time: string;
  end_time: string;
  topic: string;
  detail: string;
  court_number: number;
  court_type: string;
  stadium_name: string;
  stadium_location: string;
  members: [];
  pictures: [];
}

const FindFriend = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [noti, setNoti] = useState([]);
  const [modalOpenlo, setModalOpenlo] = useState(false);
  const [party, setparty] = useState<Partyshow[]>([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/notifications");
      setNoti(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    api
      .get("/party/pending")
      .then((response) => {
        const data = response.data?.data; // ใช้ optional chaining เพื่อป้องกัน error
        console.log(response.data);

        if (!data || !Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }

        const filteredData = data.map((party: any) => ({
          party_id: party.party_id,
          leader_username: party.leader_username,
          court_id: party.court_id,
          total_members: party.total_members,
          current_members: party.current_members,
          price_per_person: party.price_per_person,
          date: party.date,
          start_time: party.start_time,
          end_time: party.end_time,
          topic: party.topic,
          detail: party.detail,
          court_number: party.court_number,
          court_type: party.court_type,
          stadium_name: party.stadium_name,
          stadium_location: party.stadium_location,
          members: party.members,
          pictures: party.pictures,
        }));

        setparty(filteredData); // ตั้งค่า stadiums ด้วยข้อมูลที่กรองมา
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const [party, setparty] = useState([
  //     {
  //         id: "1",
  //         name: "หาเพื่อนเตะครับ",
  //         location: "MUAY STADIUM",
  //         time: "TIME 12.00 AM - 1.00 PM",
  //         phone: "099-405-2444",
  //         image: "../assets/images/foot.jpg",
  //     },
  //     {
  //         id: "2",
  //         name: "หาคนจริงจังตึงๆ",
  //         location: "SRIRACHA, ARENA",
  //         time: "TIME 12.00 AM - 2.00 PM",
  //         phone: "088-303-4784",
  //         image: "https://your-image-url.com/image2.jpg",
  //     },
  //     {
  //         id: "3",
  //         name: "หาเพื่อนชิวๆ",
  //         location: "SRIRACHA, ARENA",
  //         time: "TIME 2.00 PM - 4.00 PM",
  //         phone: "065-988-3508",
  //         image: "https://your-image-url.com/image3.jpg",
  //     },
  //     {
  //         id: "4",
  //         name: "ขาด5คน ครับ",
  //         location: "BAN PIM",
  //         time: "TIME 6.00 PM - 8.00 PM",
  //         phone: "099-788-3555",
  //         image: "https://your-image-url.com/image3.jpg",
  //     },
  // ]);

  const openNoti = async () => {
    setModalOpen(true);
    fetchData();
  };

  // const filteredStadiums = stadiums.filter((stadium) => {
  //     // การกรองตามประเภทของสนามกีฬา
  //     const matchesFacilityType =
  //       selectedFacilityTypes.length === 0 ||
  //       selectedFacilityTypes
  //         .map((f) => f.toLowerCase())
  //         .some((facility) =>
  //           stadium.facility_type
  //             .split(",")
  //             .map((f) => f.trim().toLowerCase())
  //             .includes(facility)
  //         );

  //     // การกรองตามคำค้นหาของผู้ใช้
  //     // const searchText = searchQuery.toLowerCase();
  //     // const matchesSearchQuery =
  //     //   stadium.name.toLowerCase().includes(searchText) ||
  //     //   stadium.location.toLowerCase().includes(searchText);

  //     //กรอง province
  //     const matchesProvince =
  //     selectedProvince === "" ||
  //     stadium.location.toLowerCase().includes(selectedProvince.toLowerCase());

  //     //กรองall
  //     // const matchesSearch =
  //     // searchText.trim() === "" || stadium.name.includes(searchText);

  //     // รวมเงื่อนไขการกรองทั้งหมด
  //     return matchesFacilityType && matchesProvince;
  //   });

  // const filteredProvinces = provinces.filter((province) =>
  //     province.label.toLowerCase().includes(searchTextprovince.toLowerCase())
  // );

  const latestNotifications = noti.reverse().slice(0, 5);

  const renderedNotifications = latestNotifications.map((notification) => {
    const notificationTime = new Date(notification.date).getTime(); // เวลาของการแจ้งเตือน
    const currentTime = Date.now(); // เวลาปัจจุบัน
    const timestamp = currentTime - notificationTime; // คำนวณความแตกต่างระหว่างเวลา

    // แปลงความแตกต่างเป็นวินาที (หรือจะเป็นนาที/ชั่วโมงก็ได้)
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return (
      <View
        key={notification.id}
        style={{
          padding: 10,
          width: "100%",
          borderRadius: 10,
          marginTop: 15,
          backgroundColor: "#D0F9DC",
        }}
      >
        <Text style={styles.description}>{notification.notification}</Text>
        <Text style={styles.timestamp}>{notification.date.slice(0, 10)}</Text>
        {/* <Text>{notification.time}</Text> */}
        <Text style={styles.timestamp}>
          Time Ago:{" "}
          {days > 0
            ? `${days} days`
            : `${hours} hours, ${minutes % 60} minutes`}
        </Text>
      </View>
    );
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        {/* Search Bar */}
        <TextInput
          placeholder="Search Party"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ flex: 1, padding: 10, borderWidth: 1, marginRight: 12 }}
        />
        <TouchableOpacity onPress={openNoti}>
          <Bell size={24} />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 16,
        }}
      >
        {/* Date Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => setShowModal(true)}
        >
          <AntDesign name="calendar" size={18} color="white" />
          {/* <Text style={styles.buttonText}>28/12/2567</Text> */}
          <Text style={styles.buttonText}>
            {formattedDate ? formattedDate : "Choose Date"}
          </Text>
        </TouchableOpacity>

        <Modal visible={showModal} animationType="fade" transparent={true}>
          <View style={styles.centerview1}>
            <View style={styles.modalview1}>
              <Calendar
                style={styles.calendar}
                onDayPress={(date) => {
                  //console.log(date);
                  let selectedDate = date.dateString;
                  // selectedDate.setHours(0, 0, 0, 0);
                  // setDate(selectedDate);
                  setFormattedDate(selectedDate);
                  setShowModal(false);
                }}
                minDate={new Date().toISOString().split("T")[0]} // กำหนดให้เลือกได้ตั้งแต่วันนี้
                maxDate={"2025-12-31"}
              />

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <View style={styles.close}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Location Button */}
        <TouchableOpacity
          onPress={() => setModalOpenlo(true)}
          style={styles.button}
        >
          <MapPin size={18} color="white" />
          <Text style={styles.buttonText}>Location</Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity style={styles.button}>
          <Sliders size={18} color="white" />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalOpen} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              height: "50%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Notifications
            </Text>
            <ScrollView>{renderedNotifications}</ScrollView>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text style={{ color: "red", textAlign: "right", marginTop: 10 }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* //all stadiums  */}
      <Text style={styles.sectionTitle}>FIND PARTY</Text>
      <FlatList
        data={party}
        keyExtractor={(item) => item.party_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Partyshow }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: "/partyjoin", params: item })
            }
          >
            <View style={styles.card}>
              {/* <Image source={{ uri: item.image }} style={styles.cardImage} /> */}
              <View style={styles.cardContent}>
                <Text>KKK</Text>
                <Text style={styles.cardTitle}>{item.topic}</Text>
                <Text style={styles.cardLocation}>{item.stadium_location}</Text>
                <Text style={styles.cardHours}>
                  {item.start_time} - {item.end_time}{" "}
                </Text>
                <View style={styles.cardFooter}></View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
// const styles = {
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#3B82F6", // ปรับสีตามต้องการ
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 14,
//     marginLeft: 6,
//   },
// };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    padding: 15,
  },
  logo: { color: "white", fontSize: 20, fontWeight: "bold" },
  pointsContainer: { flexDirection: "row", alignItems: "center" },
  points: { color: "white", marginHorizontal: 5 },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: { padding: 10 },
  searchInput: { flex: 1 },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },

  sectionTitle: { fontSize: 16, fontWeight: "bold", padding: 10 },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: { width: 100, height: 150 },
  cardContent: { flex: 1, padding: 30 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardLocation: { fontSize: 15, color: "gray" },
  cardHours: { fontSize: 15, color: "gray" },
  cardFooter: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  cardPhone: { marginLeft: 5, marginRight: 10, fontSize: 15 },
  cardRating: { marginLeft: 5, fontSize: 15 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
  },
  centerview: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "7%",
    alignItems: "flex-end",
  },
  modalview: {
    borderRadius: 20,
    shadowColor: "#000",
    width: 130,
    height: 160,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  line: {
    backgroundColor: "black",
    height: 0.5,
    width: "75%",
    marginVertical: 5,
  },
  ic: {
    fontSize: 34,
    color: "black",
    marginRight: 40,
    // paddingBottom:'10%'
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6", // ปรับสีตามต้องการ
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 6,
  },
  calendar: {
    width: 280,
    height: 350,
  },
  centerview1: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalview1: {
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    width: 300,
    height: 420,
    backgroundColor: "white",
  },
  close: {
    margin: 30,
    fontSize: 15,
    backgroundColor: "black",
    width: 100,
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 13,
    color: "#999",
  },
});

export default FindFriend;
