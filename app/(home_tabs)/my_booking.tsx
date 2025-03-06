import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, Modal, TouchableWithoutFeedback,TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../axiosinstance";


interface Reservations {
  id:number;
  court_id:number ;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  rating: number;
  stadium_name:string;
  court_number:number;
  type:string;
  price:number;
  
}


const HomeScreen = () => {

  const [mybook, setMybook] = useState<Reservations[]>([]);
    // {
    //   id: "1",
    //   name: "Ruammitr Court",
    //   court: "Basketball Court",
    //   time: "12.00 - 13.00 ",
    //   price: "50",
    //   status: "Paid",
    //   image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    // },
    // {
    //   id: "2",
    //   name: "Muay STADIUM",
    //   court: "Basketball Court",
    //   time: "12.00 - 13.00 ",
    //   price: "50",
    //   status: "Paid",
    //   image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    // },
    // {
    //   id: "3",
    //   name: "Muay STADIUM",
    //   court: "Basketball Court",
    //   time: "12.00 - 13.00 ",
    //   price: "50",
    //   status: "Paid",
    //   image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    // },
    // {
    //   id: "4",
    //   name: "Muay STADIUM",
    //   court: "Basketball Court",
    //   time: "12.00 - 13.00 ",
    //   price: "50",
    //   status: "Paid",
    //   image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    // },
    // {
    //   id: "5",
    //   name: "Muay STADIUM",
    //   court: "Basketball Court",
    //   time: "12.00 - 13.00 ",
    //   price: "50",
    //   status: "Paid",
    //   image: "https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=164517915",
    // },

    useEffect(() => {      
      api.get("/reservations")
          .then(response => {

            const data = response.data?.data; // ใช้ optional chaining เพื่อป้องกัน error

            if (!data || !Array.isArray(data)) {
                console.error("Expected an array but got:", data);
                return;
            }
          
              const filteredData = response.data.data.map((reser: any) => ({
                court_id:reser.court_id,
                date:reser.date ,
                start_time: reser.start_time,
                end_time: reser.end_time,
                status: reser.status,
                rating: reser.rating,
                stadium_name:reser.stadium_name,
                court_number:reser.court_number,
                type:reser.type,
                price:reser.price,
                id:reser.id,
              }));

              setMybook(filteredData); // ตั้งค่า stadiums ด้วยข้อมูลที่กรองมา
          
          })
          .catch(error => {
              console.error("Error fetching data:", error);
          });
      }, []);


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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }:{ item: Reservations }) =>( 
              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={{flex:4}}>
                    {/* <Image source={{ uri: item.image }} style={styles.cardImage} /> */}
                  </View>
                  <View style={styles.cardContent}>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Place: </Text>
                      <Text style={styles.cardTitle}>{item.stadium_name}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Court: </Text>
                      <Text style={styles.cardCourt}>{item.type} Court {item.court_number}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                      <Text style={styles.t}>Time: </Text>
                      <Text style={styles.cardTime}>{item.start_time} - {item.end_time}</Text>
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

