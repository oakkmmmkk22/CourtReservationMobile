import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to First</Text>
      <Button title="Go to About" onPress={() => router.push("/about")} />
      <Button title="Go to Profile" onPress={() => router.push("/profile")} />
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
     

    </View>
  );
}
