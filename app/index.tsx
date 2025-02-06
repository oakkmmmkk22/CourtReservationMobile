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
      <Button title="Go to Setting" onPress={() => router.push("/setting")} />

    </View>
  );
}
