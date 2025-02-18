import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, Modal } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DropProfile from "./dropprofile";
import { Colors } from "react-native/Libraries/NewAppScreen";

const HomeScreen = () => {
  const [showModal,setShowModal] = useState(false);
  
  const [stadiums, setStadiums] = useState([
    {
      id: "1",
      name: "Ruammitr Court",
      location: "SRIRACHA, CHONBURI",
      openHours: "OPEN 12.00 AM - 08.00 PM",
      phone: "089-404-2414",
      rating: 5.0,
      image: "https://your-image-url.com/image1.jpg",
    },
    {
      id: "2",
      name: "Muay STADIUM",
      location: "SRIRACHA, CHONBURI",
      openHours: "OPEN 12.00 AM - 08.00 PM",
      phone: "089-404-2414",
      rating: 5.0,
      image: "https://your-image-url.com/image2.jpg",
    },
    {
      id: "3",
      name: "Muay STADIUM",
      location: "SRIRACHA, CHONBURI",
      openHours: "OPEN 12.00 AM - 08.00 PM",
      phone: "089-404-2414",
      rating: 5.0,
      image: "https://your-image-url.com/image3.jpg",
    },
    
  ]);

//   useEffect(() => {
//     axios.get("")
//         .then(response => {
//             setStadiums(response.data);
//         })
//         .catch(error => {
            
//         });
// }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>sports</Text>
        <View style={styles.pointsContainer}>
          <Ionicons name="diamond" size={20} color="purple" />
          <Text style={styles.points}>2,000</Text>
          <Ionicons name="person-circle" size={30} color="white" onPress={() => setShowModal(true)} />
        </View>
      </View>
      
      <Modal visible={showModal} animationType="fade" transparent={true} >
        <View style={styles.centerview}>
          <View style={styles.modalview}>
              <button>
                <Text>Profile</Text>
              </button>

              <button>
                <Text>Setting</Text>
              </button>

              <button>
                <Text>logout</Text>
              </button>
          </View>
        </View>
      </Modal>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="SEARCH STADIUM" style={styles.searchInput} />
        <Ionicons name="filter" size={20} color="black" />
      </View>

      {/* Category Icons */}
      <View style={styles.categoryContainer}>
      <FontAwesome5 name="futbol" size={24} color="black" />
      <FontAwesome5 name="table-tennis" size={24} color="black" />
      <FontAwesome5 name="basketball-ball" size={24} color="black" />
      <Ionicons name="tennisball" size={24} color="black" />
      </View>


      <Text style={styles.sectionTitle}>RECOMMEND STADIUM</Text>
      <FlatList
        data={stadiums}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardLocation}>{item.location}</Text>
              <Text style={styles.cardHours}>{item.openHours}</Text>
              <View style={styles.cardFooter}>
                <Ionicons name="call" size={16} color="green" />
                <Text style={styles.cardPhone}>{item.phone}</Text>
                <MaterialIcons name="star" size={16} color="gold" />
                <Text style={styles.cardRating}>{item.rating}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "black", padding: 15 },
  logo: { color: "white", fontSize: 20, fontWeight: "bold" },
  pointsContainer: { flexDirection: "row", alignItems: "center" },
  points: { color: "white", marginHorizontal: 5 },

  searchContainer: { flexDirection: "row", backgroundColor: "white", margin: 10, padding: 10, borderRadius: 10 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1 },

  categoryContainer: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 },

  sectionTitle: { fontSize: 16, fontWeight: "bold", padding: 10 },

  card: { flexDirection: "row", backgroundColor: "white", margin: 10, borderRadius: 10, overflow: "hidden" },
  cardImage: { width: 100, height: 100 },
  cardContent: { flex: 1, padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardLocation: { fontSize: 12, color: "gray" },
  cardHours: { fontSize: 12, color: "gray" },
  cardFooter: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  cardPhone: { marginLeft: 5, marginRight: 10 },
  cardRating: { marginLeft: 5 },

  bottomNav: { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "white" },
  centerview:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    padding:'7%',
    alignItems:'flex-end'
    

  },
  modalview:{
    borderRadius:20,
    paddingTop:'10%',
    shadowColor:'#000',
    width:130,
    height:160,
    backgroundColor:'white',
    
  },
});

export default HomeScreen;

