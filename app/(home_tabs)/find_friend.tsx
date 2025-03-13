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
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { Dropdown } from 'react-native-element-dropdown';

const FindFriend = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [party, setParty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);


  
  // Sample Location
  const locations = [
    { label: "Arena 1", value: "arena_1" },
    { label: "Arena 2", value: "arena_2" },
    { label: "Stadium A", value: "stadium_a" },
    { label: "Stadium B", value: "stadium_b" },
    { label: "Field 1", value: "field_1" },
    { label: "Field 2", value: "field_2" }
  ];


  
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
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        setParty(response.data);
      } else {
        setParty([]);
      }
      
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
  

  const filterParties = () => {
    return party.filter((item) => {
      const matchSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDate = selectedDate ? item.date === selectedDate : true;
      const matchLocation = selectedLocation ? item.stadium_name.toLowerCase().includes(selectedLocation.toLowerCase()) : true;
      return matchSearch && matchDate && matchLocation;
    });
  };

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
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Bell size={24} />
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
              <Text>ยังไม่มีการแจ้งเตือน</Text>
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

        <TouchableOpacity style={styles.button}>
          <Sliders size={18} color="white" />
          <Text style={styles.buttonText}>Filter</Text>
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
            <TouchableOpacity onPress={() => setShowCalendarModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
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
              data={locations}
              labelField="label"
              valueField="value"
              placeholder="Select Location"
              value={selectedLocation}
              onChange={(item) => setSelectedLocation(item.value)} // Set selected location
            />
            <TouchableOpacity onPress={() => setShowLocationModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
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
                  <Text style={styles.cardTitle}>{item.topic}</Text>
                  <Text style={styles.cardLocation}>{item.stadium_name}</Text>
                  <Text style={styles.cardHours}>
                    {`${item.start_time} - ${item.end_time}`}
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
  closeText: {
    color: "red",
    textAlign: "right",
    marginTop: 10,
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
});

export default FindFriend;
