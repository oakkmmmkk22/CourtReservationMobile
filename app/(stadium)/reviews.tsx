import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { Receipt } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import api from "../axiosinstance";
import { useGlobalSearchParams } from "expo-router";

interface ree {
    id: number;
    stadium_id: number;
    user_id: number;
    rating: number;
    comment: string;
    date: string;
    username: string;
}

export default function App() {

    const { idsss } = useGlobalSearchParams();
    const [ispost, setispost] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<ree[]>([]);
    useEffect(() => {
        if (!idsss) {
            return;
        }
    
        try{
            api.get(`/reviews/${idsss}`)
            .then(response => {
                const data = response.data?.data; // ใช้ optional chaining
                if (!Array.isArray(data)) {
                    console.error("Expected an array but got:", data);
                    return;
                }

                const filteredData = data.map((review: any) => ({
                    id: review.id,
                    stadium_id: review.stadium_id,
                    user_id: review.user_id,
                    rating: review.rating,
                    comment: review.comment,
                    date: review.date,
                    username: review.username,
                }));
                setReviews(filteredData);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.error("Error 404: Data not found.");
                        setReviews([]); // ตั้งค่าให้เป็น array ว่าง
                    } else {
                        console.error(`API Error: ${error.response.status}`);
                    }
                } else {
                    console.error("Network Error or Server Down:", error);
                }
            });
        }
        catch(error){
        }
    
    }, []); 
    const closeee = () => {
        setispost(false);
    }
    const postreview = () => {
        if (rating === 0) {
            alert("Error Please select a star before submitting!");
            return;
        }
        const currentTimeUTC = new Date().toISOString();
        console.log(currentTimeUTC);
        
        api.post('/add_review/',{
            rating:rating,
            stadium_id:idsss,
            comment:comment,
            date:currentTimeUTC,
        })
        .then(response => {
            alert("star : " + rating + " comment : " + comment + " time : " + currentTimeUTC + " \n" + response.data.message)
            setRating(0);
            setComment(""); 
            setispost(false);
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
        });
        if (!idsss) {
            return;
        }
    
            
        try{
            api.get(`/reviews/${idsss}`)
                .then(response => {
                    const data = response.data?.data; // ใช้ optional chaining
        
                    if (!Array.isArray(data)) {
                        console.error("Expected an array but got:", data);
                        return;
                    }
        
                    const filteredData = data.map((review: any) => ({
                        id: review.id,
                        stadium_id: review.stadium_id,
                        user_id: review.user_id,
                        rating: review.rating,
                        comment: review.comment,
                        date: review.date,
                        username: review.username,
                    }));
                    setReviews(filteredData);
                })
                .catch();
            console.log("out useeffect")
        }
        catch(error){
            console.log("na jaa");
        }
    }
    return (
        <ScrollView>
            <View style={styles.container} >
                <Text style={styles.text1} >Rete & Reviews</Text>
                <View style={styles.write}>
                    <Text style={{}}>
                        <FontAwesome name="user-circle" size={37} style={styles.profile}> </FontAwesome>
                        <View style={styles.container1}>
                            <View style={styles.starContainer1}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => { setRating(star); }}>
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
                            width: 350,
                            marginTop: 10,
                        }}
                        placeholder="Share you own experience"
                        placeholderTextColor={"gray"}
                        value={comment}
                        onChangeText={setComment}
                        onTouchStart={() => {
                            setispost(true)
                        }}
                    />
                    {ispost ? (<View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "black",
                                    padding: 10,
                                    borderColor: "black",
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    width: 100,
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "bold"
                                    }}
                                    onPress={postreview}
                                >POST</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }}></View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "white",
                                    padding: 10,
                                    borderColor: "black",
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    width: 100,
                                    alignItems: "center"
                                }}
                                onPress={closeee}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >CANCEL</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>) : (<></>)
                    }


                </View>
                <View style={{ backgroundColor: "lightgray", height: 5, width: 1000 }}></View>
                <FlatList
                    data={reviews || []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: { item: ree }) => (
                        <View key={item.id} style={styles.item}>
                            <View style={styles.item2}>
                                <FontAwesome name="user-circle" size={37} style={styles.profile}> <Text style={styles.user}>{item.username}</Text></FontAwesome>
                                {item.rating == 1 && <Text>
                                    <Octicons name="star-fill" size={20} color={"gold"} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Text style={styles.date}> {item.date ? item.date.slice(0, 10) : "N/A"}</Text>
                                </Text>}
                                {item.rating == 2 && <Text>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Text style={styles.date}> {item.date ? item.date.slice(0, 10) : "N/A"}</Text>
                                </Text>}
                                {item.rating == 3 && <Text>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Text style={styles.date}> {item.date ? item.date.slice(0, 10) : "N/A"}</Text>
                                </Text>}
                                {item.rating == 4 && <Text>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star" size={20} > </Octicons>
                                    <Text style={styles.date}> {item.date ? item.date.slice(0, 10) : "N/A"}</Text>
                                </Text>}
                                {item.rating == 5 && <Text>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Octicons name="star-fill" size={20} color={"gold"}> </Octicons>
                                    <Text style={styles.date}> {item.date ? item.date.slice(0, 10) : "N/A"}</Text>
                                </Text>}
                                <Text style={styles.comment}>{item.comment}</Text>
                            </View>
                            <View style={{ backgroundColor: "lightgray", height: 5, width: 1000 }}></View>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "white",
    },
    text1: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 25,
        fontFamily: 'Arial',
    },
    item: {
        marginBottom: 0,
    },
    item2: {
        padding: 20,
    },
    date: {
        color: "slategray",
        fontWeight: "bold",
    },
    comment: {
        fontFamily: "Roboto",
        fontSize: 20,
        width: '40%'

    },
    user: {
        fontSize: 20,
    },
    profile: {
        marginBottom: 10,
    },
    write: {
        paddingTop: 0,
        padding: 20,
    },
    button: {
        marginRight: 10,
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