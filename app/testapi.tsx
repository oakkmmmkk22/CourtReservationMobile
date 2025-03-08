import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import api from './axiosinstance';


type CourtData = {
  stadium_id: number;
  court_id: number;
  stadium: string;
  Facility_Type: string;
  Status: string;
};

const CourtScreen: React.FC = () => {
  const [courtData, setCourtData] = useState<CourtData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourtData = async () => {
      try {
        const response = await api.get("getCourtDetailsBooking/1");
        if (response.status === 200) {
          console.log("Data:", response.data);
          setCourtData(response.data.stadiumCourtData);
        } else {
          console.log("Unexpected status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching court data:", error);
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchCourtData();
  }, []);
  

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        รายการสนามกีฬา
      </Text>
      <FlatList
  data={courtData}
  keyExtractor={(item) => item.court_id.toString()}
  renderItem={({ item }) => (
    <View
      style={{
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
      }}
    >
      <Text>สนาม: {item.stadium}</Text>
      <Text>ประเภทกีฬา: {item.Facility_Type}</Text>
      <Text>สถานะ: {item.Status}</Text>
    </View>
  )}
/>
    </View>
  );
};

export default CourtScreen;