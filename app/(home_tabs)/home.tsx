import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import api from "../axiosinstance";
import { router, } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import * as Location from "expo-location";
 import AsyncStorage from "@react-native-async-storage/async-storage";

interface Stadium {
  id: string;
  name: string;
  location: string;
  open_hour: string;
  close_hour: string;
  rating: number;
  phone_number: string;
  pictures: [];
  facility_type: string;
  facility_names: string;
  location_link: string;
  email: string;
}

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [selectedFacilityTypes, setSelectedFacilityTypes] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTextprovince, setSearchTextprovince] = useState("");
  const [location, setLocation] = useState(null);
  const [tempSelectedProvince, setTempSelectedProvince] = useState("");


  useEffect(() => {
    api
      .get("/home")
      .then((response) => {
        const data = response.data?.data; // ใช้ optional chaining เพื่อป้องกัน error

        if (!data || !Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }

        const filteredData = response.data.data.map((stadium: any) => ({
          id: stadium.id,
          name: stadium.name,
          location: stadium.location,
          open_hour: stadium.open_hour,
          close_hour: stadium.close_hour,
          rating: stadium.rating,
          phone_number: stadium.phone_number,
          pictures: stadium.pictures,
          facility_type: stadium.facility_type,
          facility_names: stadium.facility_names,
          location_link: stadium.location_link,
          email: stadium.email,
        }));

        setStadiums(filteredData); // ตั้งค่า stadiums ด้วยข้อมูลที่กรองมา
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchSubmit = (event) => {
    if (searchText.trim() === "") {
      setSelectedProvince(""); // ล้างจังหวัด
    }
  };

  const handleIconPress = (facilityType: string) => {
    setSelectedFacilityTypes((prevState) =>
      prevState.some((f) => f.toLowerCase() === facilityType.toLowerCase())
        ? []
        : [facilityType]
    );
  };

  const filteredStadiums = stadiums.filter((stadium) => {
    // การกรองตามประเภทของสนามกีฬา
    const matchesFacilityType =
      selectedFacilityTypes.length === 0 ||
      selectedFacilityTypes
        .map((f) => f.toLowerCase())
        .some((facility) =>
          stadium.facility_type
            .split(",")
            .map((f) => f.trim().toLowerCase())
            .includes(facility)
        );
  
    // การกรองตามคำค้นหาของผู้ใช้
    const searchText = searchQuery.toLowerCase();
    const matchesSearchQuery =
      stadium.name.toLowerCase().includes(searchText) ||
      stadium.location.toLowerCase().includes(searchText);

    //กรอง province
    const matchesProvince =
    selectedProvince === "" ||
    stadium.location.toLowerCase().includes(selectedProvince.toLowerCase());

    //กรองall
    const matchesSearch =
    searchText.trim() === "" || stadium.name.includes(searchText);
  
    // รวมเงื่อนไขการกรองทั้งหมด
    return matchesFacilityType && matchesSearchQuery && matchesProvince;
  });
  
  
  
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      await AsyncStorage.setItem("latitude", location?.latitude ?? 0);
      await AsyncStorage.setItem("longitude", location?.longitude ?? 0);
    })();
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
        );
        const provinceList = response.data.map((province) => ({
          label: province.name_en, // ชื่อจังหวัด
          value: province.id, // id ของจังหวัด
        }));
        setProvinces(provinceList); // ตั้งค่าข้อมูลจังหวัดใน state
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false); // เมื่อดึงข้อมูลเสร็จ ให้หยุดแสดง loading
      }
    };

    fetchProvinces();
  }, []);

  const filteredProvinces = provinces.filter((province) =>
    province.label.toLowerCase().includes(searchTextprovince.toLowerCase())
  );

  

  return (
    <View style={styles.container}>
      {/* //search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
          onPress={handleSearchSubmit}
        />
        <TextInput
          placeholder="SEARCH STADIUM"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons
          name="filter"
          size={20}
          color="black"
          style={styles.searchIcon}
          onPress={() => setModalOpen(true)}
        />
        <Modal visible={modalOpen} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              paddingBottom:200
              
            }}
          >
            <View
              style={{
                padding: 25,
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
                height:200
                
              }}
            >
              <View style={styles.containerdrop}>
                <Text style={styles.label}>Choose Province</Text>
                {loading ? (
                  <ActivityIndicator size="large" color="blue" />
                ) : (
                  <Dropdown
                    style={styles.dropdown}
                    data={filteredProvinces} // ใช้ข้อมูลที่กรองแล้ว
                    labelField="label" // ค่าที่จะแสดงใน dropdown
                    valueField="value" // ค่าที่จะถูกส่งเมื่อเลือก
                    placeholder={
                      tempSelectedProvince
                        ? tempSelectedProvince
                        : "Please choose province..."
                    }
                    value={tempSelectedProvince}
                    onChange={(item) => setTempSelectedProvince(item.label)} // เมื่อเลือกจังหวัดจะเก็บค่า id
                    search
                    searchText={searchTextprovince} // ตั้งค่าข้อความค้นหา
                    onSearch={(text) => setTempSelectedProvince(text)} // อัพเดทข้อความค้นหาตามที่ผู้ใช้พิมพ์
                    searchPlaceholder="Find Province..."
                  />
                )}
                {/* {selectedProvince && (
                                              <Text style={styles.result}>คุณเลือกจังหวัด ID: {selectedProvince}</Text>
                                            )} */}
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Done" color={"black"} onPress={() => {
                  setSelectedProvince(tempSelectedProvince); // อัปเดตตัวกรองจังหวัดจริง
                  setTempSelectedProvince("");
                  setModalOpen(false);}}/>
                <Button title="Close" color={"black"} onPress={() => setModalOpen(false)}/>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* // Category Icons  */}
      <View style={{ margin: 5 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }} // เพิ่ม padding ด้านข้าง
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="futbol"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("football")
                        
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("football") }
            />
            <FontAwesome5
              name="table-tennis"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("Table Tennis")
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("Table Tennis")}
            />
            <FontAwesome5
              name="basketball-ball"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("Basketball")
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("Basketball")}
            />
            <Ionicons
              name="tennisball"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("tennis")
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("tennis")}
            />
            <MaterialCommunityIcons
              name="badminton"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("badminton")
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("badminton")}
            />
            <FontAwesome5
              name="golf-ball"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("golf")
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("golf")}
            />
            <MaterialCommunityIcons
              name="rugby"
              style={[
                styles.ic,
                {
                  color: selectedFacilityTypes.includes("rugby")
                    ? "gray"
                    : "black",
                },
              ]}
              onPress={() => handleIconPress("rugby")}
            />
          </View>
        </ScrollView>
      </View>

      {/* //all stadiums  */}
      <Text style={styles.sectionTitle}>RECOMMEND STADIUM</Text>
      <FlatList
        data={filteredStadiums}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Stadium }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/booking",
                params: {
                  idsss: item.id,
                  name: item.name,
                  location_link: item.location_link,
                  rating: item.rating,
                  open_hour: item.open_hour,
                  close_hour: item.close_hour,
                  facility_type: item.facility_type,
                  facility_names: item.facility_names,
                  email: item.email,
                  pictures: item.pictures,
                  location: item.location,
                  phone_number: item.phone_number,
                },
              })
            }
          >
            <View style={styles.card}>
              {/* <Image source={{ uri: item.pictures }} style={styles.cardImage} /> */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardHours}>
                  Open: {item.open_hour.slice(0, 5)} -{" "}
                  {item.close_hour.slice(0, 5)}
                </Text>

                <View style={styles.cardFooter}>
                  <Ionicons name="call" size={18} color="green" />
                  <Text style={styles.cardPhone}>{item.phone_number}</Text>
                  <MaterialIcons name="star" size={20} color="gold" />
                  <Text style={styles.cardRating}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    padding: 15,
  },
  logo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  points: {
    color: "white",
    marginHorizontal: 5,
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
  },
  cardContent: {
    flex: 1,
    padding: 30,
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
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardPhone: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 15,
  },
  cardRating: {
    marginLeft: 5,
    fontSize: 15,
  },

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
  containerdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: "blue",
  },
  buttonContainer: {
    flexDirection: "row", // ตั้งให้ปุ่มอยู่ในแนวนอน
    justifyContent: "space-between", // จัดระยะห่างระหว่างปุ่ม
    width: "40%", // กำหนดความกว้างให้พอดีกับปุ่ม
  },
});

export default HomeScreen;
