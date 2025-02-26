// TestScreen.tsx
import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import api from "./axiosinstance"; // Import API Instance

const TestScreen = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/test"); // เรียก API
      setData(JSON.stringify(response.data)); // เก็บผลลัพธ์ไว้ใน state
    } catch (error: any) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="เรียก API /test" onPress={fetchData} />
      {loading ? <ActivityIndicator size="large" color="blue" /> : null}
      {data && <Text style={{ marginTop: 20 }}>Response: {data}</Text>}
    </View>
  );
};

export default TestScreen;
