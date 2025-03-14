import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Bell, MapPin, Sliders } from "lucide-react-native";
import api from "../axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";

const FindFriend = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [party, setParty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("Location");
  const [dates, setDates] = useState([]);
  const [sports, setSports] = useState([]); // สร้าง state สำหรับเก็บข้อมูลประเภทกีฬา
  const [selectedSport, setSelectedSport] = useState(null); // เก็บข้อมูลประเภทกีฬาที่เลือก
  const [showSportsModal, setShowSportsModal] = useState(false);
  const [noti, setNoti] = useState([])



  const fetchParties = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setParty([]);
        setLoading(false);
        return;
      }

      const response = await api.get("/party/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedData = response.data.map((party) => ({
        ...party,
        date: party.date.split("T")[0], // แปลงให้เหลือแค่ YYYY-MM-DD
        location: party.stadium_location.split(",")[0].trim(), // ดึงชื่อจังหวัด
        sport_type: party.court_type// เพิ่ม sport_type เพื่อใช้ในการกรอง
      }));

      setParty(formattedData);

      // console.log(response.data)

    } catch (error) {
      setParty([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  useEffect(() => {
    console.log("Selected Date:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
        );
        const provinceList = response.data.map((province) => ({
          label: province.name_en,
          value: province.id,
        }));
        setProvinces(provinceList); // ตั้งค่า provinces
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);



  const filterParties = () => {
    return party.filter((item) => {
      const matchSearch = searchQuery
        ? item.topic.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
  
      const matchDate = selectedDate
        ? new Date(item.date).toISOString().split('T')[0] === selectedDate
        : true;
  
      const matchLocation = selectedLocation
        ? item.stadium_location && item.stadium_location.split(",")[0].trim().toLowerCase() === selectedLocation.toLowerCase()
        : true;
  
      const matchSport = selectedSport
        ? (item.sport_type && item.sport_type.trim().toLowerCase() === selectedSport?.trim().toLowerCase())
        : true;
  
      const matchCourtType = selectedSport
        ? item.court_type && item.court_type.toLowerCase() === selectedSport.toLowerCase()
        : true;
  
      return matchSearch && matchDate && matchLocation && matchSport && matchCourtType;
    });
  };




  useEffect(() => {
    console.log("Selected Date:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log("Selected Location:", selectedLocation);
  }, [selectedLocation]);


  const sportsList = [
    { label: "Soccer", value: "Soccer" },
    { label: "Badminton", value: "Badminton" },
    { label: "Table Tennis", value: "Table Tennis" },
    { label: "Basketball", value: "Basketball" },
    { label: "Tennis", value: "Tennis" },
    { label: "Golf", value: "Golf" },
    { label: "Rugby", value: "Rugby" },
    
  ];


  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response1 = await api.get("/notifications");
        setNoti(response1.data)
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };
    fetchSports();
  }, []);


  const openNoti = async () => {
    setModalOpen(true)
    try {
      const response = await api.get("/notifications");
      setNoti(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const latestNotifications = noti.slice(0, 5);

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
      <View key={notification.id} style={{ padding: 10, width: "100%", borderRadius: 10, marginTop: 15, backgroundColor: "#D0F9DC" }}>
        <Text style={styles.description}>{notification.notification}</Text>
        <Text style={styles.timestamp}>{notification.date.slice(0, 10)}</Text>
        {/* <Text>{notification.time}</Text> */}
        <Text style={styles.timestamp}>
          Time Ago: {days > 0 ? `${days} days` : `${hours} hours, ${minutes % 60} minutes`}
        </Text>
      </View>
    );
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        {/* Search Bar */}
        <TextInput
          placeholder="Search Party"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={openNoti}>
          <MaterialCommunityIcons name={"bell"} size={30} />
        </TouchableOpacity>
      </View>


      {/* Modal สำหรับแจ้งเตือน */}
      <Modal visible={modalOpen} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Notifications
            </Text>
            <ScrollView>
              {renderedNotifications}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowCalendarModal(true)}>
          <AntDesign name="calendar" size={18} color="white" />
          <Text style={styles.buttonText}>{selectedDate ? selectedDate : "Date"}</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => setShowLocationModal(true)}>
          <MapPin size={18} color="white" />
          <Text style={styles.buttonText}>{selectedLocation ? selectedLocation : "Location"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setShowSportsModal(true)}>
          <Sliders size={18} color="white" />
          <Text style={styles.buttonText}>{selectedSport ? selectedSport : "Filter"}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal visible={showCalendarModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Date</Text>
            <Calendar
              style={styles.calendar}
              onDayPress={(date) => {
                setSelectedDate(date.dateString); // Set selected date
                setShowCalendarModal(false); // Close modal
              }}
              minDate={new Date().toISOString().split("T")[0]} // Set minimum date to today
              maxDate={"2025-12-31"}
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity
    onPress={() => {
      setSelectedDate(null); // Reset selected date
      setShowCalendarModal(false); // Close modal after resetting
    }}
  >
    <Text style={styles.resetText}>Reset</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => setShowCalendarModal(false)}>
    <Text style={styles.closeText}>Close</Text>
  </TouchableOpacity>
  
            </View>
          </View>
        </View>
      </Modal>


      {/* Location Modal */}
      <Modal visible={showLocationModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Location</Text>

            <Dropdown
              style={styles.dropdown}
              data={provinces} // ใช้ข้อมูลจังหวัดที่โหลดมา
              labelField="label"
              valueField="value"
              placeholder="Select Location" // แสดงข้อความ placeholder ถ้ายังไม่ได้เลือกจังหวัด
              value={selectedProvince} // แสดงจังหวัดที่เลือก
              onChange={(item) => {
                setSelectedLocation(item.label); // อัปเดตชื่อจังหวัดที่เลือก
                setShowLocationModal(false); // ปิด Modal
              }}
              search
              searchPlaceholder="Search Province..." // Placeholder สำหรับค้นหา
              renderSearch={(searchQuery) => {
                return provinces.filter((province) =>
                  province.label.toLowerCase().includes(searchQuery.toLowerCase())
                );
              }}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedProvince("Location"); // เปลี่ยนเป็น "Location"
                  setShowLocationModal(false); // ปิด Modal หลังจากรีเซ็ต
                  setSelectedLocation(null);
                }}
              >
                <Text style={styles.resetText}>Reset</Text>


              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sports Filter Modal */}
      <Modal visible={showSportsModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Sport</Text>
            <Dropdown
              style={styles.dropdown}
              data={sportsList} // ใช้ข้อมูลกีฬา
              labelField="label" // label ของกีฬาที่แสดงใน dropdown
              valueField="value" // value ของกีฬาที่ใช้
              placeholder="Select Sport"
              value={selectedSport} // ค่าเลือกที่เลือก
              onChange={(item) => {
                setSelectedSport(item.value); // เก็บค่า sport ที่เลือก
                setShowSportsModal(false); // ปิด modal หลังเลือก
              }}
            />
            <View style={styles.buttonContainer}>
             
              <TouchableOpacity
                onPress={() => {
                  setSelectedSport(null); // รีเซ็ตค่ากีฬาเป็น null
                  setShowSportsModal(false); // ปิด modal หลังจากรีเซ็ต
                }}
              >
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>

              
              <TouchableOpacity onPress={() => setShowSportsModal(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      {/* Section Title */}
      <Text style={styles.sectionTitle}>FIND PARTY</Text>

      {/* แสดง Loading ถ้ากำลังโหลดข้อมูล */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : party.length === 0 ? (
        <Text style={styles.noDataText}>No parties available</Text>
      ) : (
        <FlatList
          data={filterParties()}
          keyExtractor={(item, index) => (item.party_id ? item.party_id.toString() : index.toString())}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/partyjoin",
                  params: { party_id: item.party_id }
                })
              }
            >
              <View style={styles.card}>
                <Image
                  source={{
                    uri:
                      item.pictures.length > 0
                        ? item.pictures[0].photoUrl
                        : "https://via.placeholder.com/100",
                  }}
                  style={styles.cardImage}
                />
                  <View style={styles.cardContent}>
                    <View style={styles.rowContainer}>
                      <View style={styles.memberInfo}>
                        <Text style={{ fontSize: 16 }}>👤 </Text>
                        <Text style={styles.cardLocation}>
                          {item.current_members}/{item.total_members}
                        </Text>
                      </View>
                      <View style={styles.cardCourtTypeContainer}>
                        <Text style={styles.cardCourtType}>{item.court_type}</Text>
                      </View>
                    </View>

                    <Text style={styles.cardTitle}>{item.topic}</Text>
                    <Text style={styles.cardLocation}>{item.stadium_name}</Text>
                    <Text style={styles.cardHours}>
                      {`${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`}
                    </Text>

                    <Text style={styles.partyDateLocation}>
                      {item.date} | {item.location}
                    </Text>

                  </View>

                
              </View>
            </TouchableOpacity>
            
          )}
        />
      )}
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 12,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginTop: 10, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: "50%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCourtType: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    color: "white",
  },
  cardCourtTypeContainer: {
    backgroundColor: "#2A36B1", // สีน้ำเงิน
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  closeText: {
    color: "black",
    fontSize: 16,
    textAlign: "right",
    marginTop: 2,
  },
  resetText: {
    color: "red",
    fontSize: 16,
    textAlign: "left",
    marginTop: 2,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardLocation: {
    fontSize: 15,
    color: "gray",
  },
  cardHours: {
    fontSize: 15,
    color: "gray",
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 13,
    color: '#999',
  },
});

export default FindFriend;
