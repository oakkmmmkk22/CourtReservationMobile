import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, Modal, TouchableWithoutFeedback,TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";


const HomeScreen = () => {
  
  const renderCount = useRef(0);

  const [mybook, setMybook] = useState([
    {
      id: "1",
      name: "Ruammitr Court",
      court: "Basketball Court",
      time: "12.00 - 13.00 ",
      price: "50",
      status: "Paid",
      image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    },
    {
      id: "2",
      name: "Muay STADIUM",
      court: "Basketball Court",
      time: "12.00 - 13.00 ",
      price: "50",
      status: "Paid",
      image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    },
    {
      id: "3",
      name: "Muay STADIUM",
      court: "Basketball Court",
      time: "12.00 - 13.00 ",
      price: "50",
      status: "Paid",
      image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    },
    {
      id: "4",
      name: "Muay STADIUM",
      court: "Basketball Court",
      time: "12.00 - 13.00 ",
      price: "50",
      status: "Paid",
      image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    },
    {
      id: "5",
      name: "Muay STADIUM",
      court: "Basketball Court",
      time: "12.00 - 13.00 ",
      price: "50",
      status: "Paid",
      image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
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
          {/* //all stadiums  */}
          <View style={styles.left}>
            <Text style={styles.sectionTitle}>Reservation</Text>
            <View style={styles.center}>
              <Text style={styles.itemCount}> {mybook.length} </Text> 
            </View>
          </View>
          <FlatList
            data={mybook}
            keyExtractor={(item) => item.id}
            renderItem={({ item,index }) =>( 
              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={{flex:4}}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                  </View>
                  <View style={styles.cardContent}>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Place: </Text>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Court: </Text>
                      <Text style={styles.cardCourt}>{item.court}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Time: </Text>
                      <Text style={styles.cardTime}>{item.time}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Price: </Text>
                      <Text style={styles.cardPrice}>{item.price}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Status: </Text>
                      <Text style={styles.cardStatus}>{item.status}</Text>
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

  container: {flex:1,backgroundColor: "#F5F5F5" },
  sectionTitle: { fontSize: 20, fontWeight: "bold",marginRight:10 },

  left: { alignItems:'flex-end',padding:15 },

  card: { 
    flexDirection: "row", 
    backgroundColor: "white", 
    margin: 10, 
    borderRadius: 10, 
    overflow: "hidden", 
    flex:1,
    
  },
  cardImage: { 
    flex:1,
    
  },
  cardContent: { 
    padding: 10,
    flex:6,
  },
  cardTitle: { 
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine:'underline',
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
  renderCountText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    padding: 10, 
    textAlign: "center" 
  },
  itemCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  center:{
    paddingRight:50,
  },
  t:{
    fontSize:16,
    color:'gray',
    paddingRight:5,
  },
  
});

export default HomeScreen;

