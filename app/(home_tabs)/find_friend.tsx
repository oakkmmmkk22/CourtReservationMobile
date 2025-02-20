import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Button } from "react-native";
import { useRouter } from "expo-router";
import { Bell, Calendar, MapPin, Sliders } from "lucide-react-native";

const FindFriend = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        {/* Search Bar */}
        <TextInput 
          placeholder="Search Stadium" 
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
        <TouchableOpacity style={styles.button}>
          <Calendar size={18} color="white" />
          <Text style={styles.buttonText}>28/12/2567</Text>
        </TouchableOpacity>

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
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>I am modal</Text>
            <Button title="Close" onPress={() => setModalOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
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
};

export default FindFriend;
