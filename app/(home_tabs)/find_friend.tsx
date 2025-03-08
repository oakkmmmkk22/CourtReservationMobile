import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Button , FlatList, Image, StyleSheet,TouchableWithoutFeedback, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Bell, MapPin, Sliders } from "lucide-react-native";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Calendar } from 'react-native-calendars';


const FindFriend = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  
  const [party, setparty] = useState([
    {
      id: "1",
      name: "หาเพื่อนเตะครับ",
      location: "MUAY STADIUM",
      time: "TIME 12.00 AM - 1.00 PM",
      phone: "099-405-2444",
      image: "../assets/images/foot.jpg",
    },
    {
      id: "2",
      name: "หาคนจริงจังตึงๆ",
      location: "SRIRACHA, ARENA",
      time: "TIME 12.00 AM - 2.00 PM",
      phone: "088-303-4784",
      image: "https://your-image-url.com/image2.jpg",
    },
    {
      id: "3",
      name: "หาเพื่อนชิวๆ",
      location: "SRIRACHA, ARENA",
      time: "TIME 2.00 PM - 4.00 PM",
      phone: "065-988-3508",
      image: "https://your-image-url.com/image3.jpg",
    },
    {
      id: "4",
      name: "ขาด5คน ครับ",
      location: "BAN PIM",
      time: "TIME 6.00 PM - 8.00 PM",
      phone: "099-788-3555",
      image: "https://your-image-url.com/image3.jpg",
    },
  ]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        {/* Search Bar */}
        <TextInput 
          placeholder="Search Party" 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          style={{ flex: 1, padding: 10, borderWidth: 1, borderRadius: 8, marginRight: 12 }}
        />
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Bell size={24} />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 16 }}>
        {/* Date Button */}
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
          <AntDesign name="calendar" size={18} color="white" />
          {/* <Text style={styles.buttonText}>28/12/2567</Text> */}
          <Text style={styles.buttonText}>{formattedDate ? formattedDate : "Choose Date"}</Text>
        </TouchableOpacity>

        <Modal visible={showModal} animationType="fade" transparent={true} >
                                <View style={styles.centerview1}> 
                                    <View style={styles.modalview1}>
                                        <Calendar style={styles.calendar}

                                            onDayPress={ date => {
                                                //console.log(date);
                                                let selectedDate = date.dateString;
                                                // selectedDate.setHours(0, 0, 0, 0);
                                                // setDate(selectedDate);
                                                setFormattedDate(selectedDate);
                                                setShowModal(false);
                                            }} 
                                            minDate={"2025-01-01"}
                                            maxDate={"2025-12-31"}
                                        
                                        />

                                        <TouchableOpacity onPress={() => setShowModal(false) }>    
                                            <View style={styles.close}>
                                                <Text style={{color:'white',fontWeight:'bold'}} >Close</Text>     
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View> 
                </Modal>



        {/* Location Button */}
        <TouchableOpacity style={styles.button}>
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>I am modal</Text>
            <Button title="Close" onPress={() => setModalOpen(false)} />
          </View>
        </View>
      </Modal>

      {/* //all stadiums  */}
      <Text style={styles.sectionTitle}>FIND PARTY</Text>
          <FlatList
            data={party}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push({ pathname: "/partyjoin", params: item })}>
                <View style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardLocation}>{item.location}</Text>
                    <Text style={styles.cardHours}>{item.time}</Text>
                    <View style={styles.cardFooter}>
                    </View>
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
  header: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "black", padding: 15 },
  logo: { color: "white", fontSize: 20, fontWeight: "bold" },
  pointsContainer: { flexDirection: "row", alignItems: "center" },
  points: { color: "white", marginHorizontal: 5 },

  searchContainer: { flexDirection: "row", backgroundColor: "white", margin: 10, padding: 10, borderRadius: 10 },
  searchIcon: { padding: 10 },
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
  calendar:{
    width:280,
    height:350,
  },
  centerview1:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
    justifyContent:'center'
  },
  modalview1:{
    borderRadius:20,
    padding:5,
    alignItems:'center',
    shadowColor: '#000',
    width:300,
    height:420,
    backgroundColor:'white',
    
  },
  close:{
    margin:30,
    fontSize:15,
    backgroundColor:'black',
    width:100,
    alignItems:'center',
    
  },
});

export default FindFriend;
