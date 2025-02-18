import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, Modal, TouchableWithoutFeedback,TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";


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
      {/* <View style={styles.header}>
        <Text style={styles.logo}>sports</Text>
        <View style={styles.pointsContainer}>
          <Ionicons name="diamond" size={20} color="purple" />
          <Text style={styles.points}>2,000</Text>
          <Ionicons name="person-circle" size={30} color="white" onPress={() => setShowModal(true)} />
        </View>
      </View> */}
      
      <Modal visible={showModal} animationType="fade" transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.centerview}>
              <TouchableWithoutFeedback>
                <View style={styles.modalview}>
                  
                    <TouchableOpacity style={styles.btn}>
                      <Ionicons name="person" size={18} color="black"  />
                      <Text style={{ marginLeft: 8}}>User</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity style={styles.btn}>
                      <Ionicons name="settings" size={18} color="black" />
                      <Text style={{ marginLeft: 8 }}>Setting</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                  
                    <TouchableOpacity style={styles.btn}>
                      <Ionicons name="log-out" size={18} color="black" />
                      <Text style={{ marginLeft: 8 }}>Logout</Text>
                    </TouchableOpacity>
                  
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="SEARCH STADIUM" style={styles.searchInput} />
        <Ionicons name="filter" size={20} color="black" />
      </View>

      {/* Category Icons */}
      <View style={{ margin: 5 }}>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }} // เพิ่ม padding ด้านข้าง
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
            <FontAwesome5 name="futbol" style={styles.ic}  />
            <FontAwesome5 name="table-tennis" style={styles.ic} />
            <FontAwesome5 name="basketball-ball" style={styles.ic} />
            <Ionicons name="tennisball"  style={styles.ic} />
            <MaterialCommunityIcons name="badminton"  style={styles.ic} />
            <FontAwesome5 name="golf-ball" style={styles.ic} />
            <MaterialCommunityIcons name="rugby"  style={styles.ic} />
            
          </View>
        </ScrollView>
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
                <Ionicons name="call" size={18} color="green" />
                <Text style={styles.cardPhone}>{item.phone}</Text>
                <MaterialIcons name="star" size={20} color="gold" />
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
  cardImage: { width: 100, height: 150 },
  cardContent: { flex: 1, padding: 30 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardLocation: { fontSize: 15, color: "gray" },
  cardHours: { fontSize: 15, color: "gray" },
  cardFooter: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  cardPhone: { marginLeft: 5, marginRight: 10,fontSize: 15 },
  cardRating: { marginLeft: 5,fontSize: 15 },

  bottomNav: { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "white" },
  centerview:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    padding:'7%',
    alignItems:'flex-end'
    

  },
  modalview:{
    borderRadius:20,
    shadowColor:'#000',
    width:130,
    height:160,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10,
    
  },
  line:{
    backgroundColor:'black',
    height:0.5 ,
    width:'75%',
    marginVertical:5,
  },
  ic:{
    fontSize:34 ,
    color:'black',
    marginRight: 40,
    // paddingBottom:'10%'
  }
});

export default HomeScreen;

