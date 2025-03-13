import { View, Text, Button, TouchableOpacity,Image, Dimensions  } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";


const { width, height } = Dimensions.get("window");
export default function HomeScreen() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า
  const [route, setRoute] = useState("/login");
  const fetchParties = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      if (!token) {
        console.log("go to login")
        setRoute("/login");
        return;
      }
      else{
        setRoute("/home");
        console.log("go to home")
        return
      }
    } catch (error) {
    } 
  };
  fetchParties();
  return (
    <TouchableOpacity 
      onPress={() => router.push(route)}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"black" }}
    >

      {/* <Text style={{ fontSize: 24, marginBottom: 20, color:"white" }}>Welcome to First</Text> */}
      <Image source={require('../assets/images/sport_image.png')} style={{ width: width , height: 100 }} />

      {/* <Button title="Go to Profile" onPress={() => router.push("/profile")} />
      <Button title="Go to Login" onPress={() => router.push("/login")} />
      <Button title="Go to Sign up" onPress={() => router.push("/sign-up")} />
      <Button title="Go to Home" onPress={() => router.push("/home")} />
      <Button title="Go to Setting" onPress={() => router.push("/setting")} />
      <Button title="Go to Create2" onPress={() => router.push("/createpartry2")} />
      <Button title="Go to party" onPress={() => router.push("/party")} />
      <Button title="Go to point" onPress={() => router.push("/point")} />
      <Button title="Go to find" onPress={() => router.push("/find_friend")} />
      <Button title="Go to my_booking" onPress={() => router.push("/(home_tabs)/my_booking")} />
      <Button title="Go to booking" onPress={() => router.push("/(stadium)/booking")} />
      <Button title="Go to cart" onPress={()=> router.push("/(home_tabs)/cart")}></Button>
      <Button title="Go to slip" onPress={()=> router.push("/pay-slip")}></Button>
      <Button title="Go to partyjoin" onPress={() => router.push("/partyjoin")}></Button>
      <Button title="Go to testapi" onPress={() => router.push("/testapi")} />
      <Button title="Go to partyin" onPress={() => router.push("/partyin")}></Button> */}
    </TouchableOpacity>
  );
}
