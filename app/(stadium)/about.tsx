import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default function App() {
    // const latitude = 13.116563600155295;
    // const longitude = 100.9217618257891;

    
    const { location_link, open_hour, close_hour, phone_number, email } = useGlobalSearchParams();
    const [latitude, longitude] = location_link?.split(",").map(Number) || [0, 0];

    // const stadium = {
    //     open: "9:00",
    //     close: "18:00",
    //     phone: "0902968779",
    //     email: "ruammitrcourt@gmail.com",
    //     price: 150,
    // };
    const { width, height } = Dimensions.get('window');
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container} >
                <Text style={styles.text1} >Details</Text>
                <AntDesign name="clockcircle" size={30} color={"gray"}><Text style={styles.text1}> Hour : {open_hour} - {close_hour}</Text></AntDesign>
                <FontAwesome name="phone" size={30} color={"gray"}><Text style={styles.text1}> Phone number : {phone_number}</Text></FontAwesome>
                <Fontisto name="email" size={30} color={"gray"}><Text style={styles.text1}> Email : {email}</Text></Fontisto>
                <FontAwesome5 name="map-marker-alt" size={30} color={"gray"}><Text style={styles.text1}> Map : </Text></FontAwesome5>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text>
                        {latitude} , {longitude}
                    </Text>
                    {/* <MapView
                        style={{
                            width: 300,    // Set the width of the mini map
                            height: 300,   // Set the height of the mini map
                            borderRadius: 10, // Optional: Round corners of the mini map
                        }}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.01,  // Adjust zoom level
                            longitudeDelta: 0.01, // Adjust zoom level
                        }}
                        scrollEnabled={true} // Disable map scroll
                        zoomEnabled={true}   // Disable zoom
                        rotateEnabled={false} // Disable rotation
                    >
                        <Marker coordinate={{ latitude, longitude }} title={"Eiffel Tower"} />
                    </MapView> */}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 25,
        backgroundColor: "white",
        lineHeight: 100,
    },
    text1: {
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 50,
        fontFamily: 'Arial', // หรือ 'serif', 'sans-serif', 'monospace'
        color: "black",
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading1: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    map1: {
        width: '100%',
        height: '80%',
    },

})