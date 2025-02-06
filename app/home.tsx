import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        hello this is Home
    </View>
  );
}
