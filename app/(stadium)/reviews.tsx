import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { Receipt } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from "react-native";
import api from "../axiosinstance";
import { useGlobalSearchParams } from "expo-router";

interface ree {
    id: number;
    stadium_id: number;
    user_id: number;
    rating: number;
    comment: string;
    date: string;
  }

export default function App() {

    const { idsss } = useGlobalSearchParams();

    const [ispost, setispost] = useState(false);
    const [rating, setRating] = useState(0); 
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<ree[]>([]);
    useEffect(() => {
        api.get(`/reviews/${idsss}`)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                  const filteredData = response.data.data.map((review: any) => ({
                    id: review.id,
                    stadium_id: review.stadium_id,
                    user_id: review.user_id,
                    rating: review.rating,
                    comment : review.comment,
                    date: review.date,
                  }));
                  setReviews(filteredData); // ตั้งค่า stadiums ด้วยข้อมูลที่กรองมา
                } else {
                  console.error("Expected an array but got:", response.data.data);
                }
            })
    })
    // const reviews = [
    //     {
    //         username : "user1",
    //         star : 1,
    //         date : "10/2/2568",
    //         comment : "goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี goodgood สวัสดี good"
    //     },
    //     {
    //         username : "user2",
    //         star : 2,
    //         date : "10/2/2568",
    //         comment : "good good"
    //     },
    //     {
    //         username : "user3",
    //         star : 5,
    //         date : "10/2/2568",
    //         comment : "good สวัสดี good"
    //     },
    //     {
    //         username : "user4",
    //         star : 0,
    //         date : "10/2/2568",
    //         comment : "good สวัสดี good"
    //     },
    // ]
    const closeee = () => {
        setispost(false);
    }
    const postreview = () => {
        if (rating === 0) {
          alert("Error Please select a star before submitting!");
          return;
        }
        const currentTimeUTC = new Date().toUTCString();
        console.log(currentTimeUTC);  // Example: "Wed, 05 Mar 2025 11:45:30 GMT"

        alert("star : " + rating + " comment : " + comment + " time : "  + currentTimeUTC)
        setRating(0);
        setComment("");
    }
    return (
        <View style={styles.container} >
            <Text style={styles.text1} >Rete & Reviews</Text>
            <View style={styles.write}>
                <Text style={{}}>
                    <FontAwesome name = "user-circle" size={37} style={styles.profile}> </FontAwesome>
                    <View style={styles.container1}>
                        <View style={styles.starContainer1}>
                            {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => {setRating(star);}}>
                                <AntDesign
                                name={star <= rating ? "star" : "staro"} // Filled if selected
                                size={40}
                                color={star <= rating ? "gold" : "gray"} // Gold for selected, gray for unselected
                                style={styles.star1}
                                />
                            </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Text>
                <TextInput 
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: 'gray',
                        padding: 10,
                        fontSize: 18,
                        width:350,
                        marginTop:10,
                    }}
                    placeholder="Share you own experience" 
                    placeholderTextColor={"gray"}
                    value={comment}
                    onChangeText={setComment}
                    onTouchStart={() => {
                        setispost(true)
                    }}
                />
                {ispost ? (<View style={{ alignItems:"center", marginTop:10 }}>
                    <Text >
                        <TouchableOpacity 
                            style={{
                                backgroundColor:"black",
                                padding:10,
                                borderColor:"black",
                                borderWidth:2,
                                borderRadius:10,
                                width:100,
                                alignItems:"center"
                            }}
                        >
                            <Text
                                style={{
                                    color:"white",
                                    fontWeight:"bold"
                                }}
                                onPress={postreview}
                            >POST</Text>
                        </TouchableOpacity>
                        <View style={{width:20}}></View>
                        <TouchableOpacity 
                            style={{
                                backgroundColor:"white",
                                padding:10,
                                borderColor:"black",
                                borderWidth:2,
                                borderRadius:10,
                                width:100,
                                alignItems:"center"
                            }}
                            onPress={closeee}
                        >
                            <Text 
                                style={{
                                    fontWeight:"bold"
                                }}
                            >CANCEL</Text>
                        </TouchableOpacity>
                    </Text>
                </View>) : (<></>)
                }
                

            </View>
            <View style={{backgroundColor:"lightgray", height:5, width:1000}}></View>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item } : { item: ree }) => (
                    <View style={styles.item}>
                        <View style={styles.item2}>
                            <FontAwesome name = "user-circle" size={37} style={styles.profile}> <Text style={styles.user}>{item.id}</Text></FontAwesome>
                            {item.rating == 0 && <Text>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Text style={styles.date}> {item.date}</Text>
                                </Text>}
                            {item.rating == 1 && <Text>
                                <Octicons name="star-fill" size={20} color={"gold"} > </Octicons> 
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Text style={styles.date}> {item.date}</Text>
                                </Text>}
                            {item.rating == 2 && <Text>
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Text style={styles.date}> {item.date}</Text>
                                </Text>}
                            {item.rating == 3 && <Text>
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star" size={20} > </Octicons>
                                <Octicons name="star" size={20} > </Octicons>
                                <Text style={styles.date}> {item.date}</Text>
                                </Text>}
                            {item.rating == 4 && <Text>
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star" size={20} > </Octicons>
                                <Text style={styles.date}> {item.date}</Text>
                                </Text>}
                            {item.rating == 5 && <Text>
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Octicons name="star-fill" size={20} color={"gold"}> </Octicons> 
                                <Text style={styles.date}> {item.date}</Text>
                                </Text>}
                            <Text style={styles.comment}>{item.comment}</Text>
                        </View>
                        <View style={{backgroundColor:"lightgray", height:5, width:1000}}></View>
                    </View>
                )} 
            >

            </FlatList>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor:"white",
    },
    text1: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 25,
        fontFamily: 'Arial', 
    },
    item: {
        marginBottom:0,
    },
    item2: {
        padding:20,
    },
    date:{
        color:"slategray",
        fontWeight:"bold",
    },
    comment:{
        fontFamily:"Roboto",
        fontSize:20,
        width: '40%'

    },
    user:{
        fontSize:20,
    },
    profile:{
        marginBottom:10,
    },
    write:{
        paddingTop:0,
        padding:20,
    },
    button:{
        marginRight:10,  
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title1: {
      fontSize: 20,
      marginBottom: 10,
    },
    starContainer1: {
      flexDirection: 'row',
    },
    star1: {
      marginHorizontal: 5,
    },
    selectedText1: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
})