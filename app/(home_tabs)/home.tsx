import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, Modal, TouchableWithoutFeedback,TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showFilter, setShowFilter] = useState(false);
  const [searchText, setSearchText] = useState(""); 
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
      image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    },
    
  ]);


  const handleSearchChange = (event) => {
      
    
  };
  const handleSearchSubmit = (event) => {
      setSearchText(searchQuery);
      setShowFilter(true);
      // setSearchQuery("");
      
  };
  const filteredStadiums = stadiums.filter(stadium => 
    stadium.name.toLowerCase().includes(searchText.toLowerCase()||searchQuery.toLowerCase())
   
    
  );

  

//   useEffect(() => {
//     axios.get("")
//         .then(response => {
//             setStadiums(response.data);
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//         });
// }, []);


  return (
    <View style={styles.container}>
   
          {/* //search bar */}
          <View style={styles.searchContainer}>

            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} onPress={handleSearchSubmit}  />  
            <TextInput 
                placeholder="SEARCH STADIUM" 
                style={styles.searchInput} 
                value={searchQuery} 
                onChangeText={setSearchQuery} 
              />
            <Ionicons name="filter" size={20} color="black" style={styles.searchIcon} />
          </View>

          {/* // Category Icons  */}
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

          {/* //all stadiums  */}
          <Text style={styles.sectionTitle}>RECOMMEND STADIUM</Text>
          <FlatList
            data={filteredStadiums}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push('/booking')}>
                {/* //input some const for api*/}


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
              </TouchableOpacity>
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
  searchIcon: { padding: 10 },
  searchInput: { flex: 1,padding:10 },

  categoryContainer: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 },

  sectionTitle: { fontSize: 16, fontWeight: "bold", padding: 10 },

  card: { flexDirection: "row", backgroundColor: "white", margin: 10, borderRadius: 10, overflow: "hidden" },
  cardImage: { flex:1 },
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

