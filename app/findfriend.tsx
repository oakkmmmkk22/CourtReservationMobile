import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Button } from "react-native";
import { useRouter } from "expo-router";
import { Bell, Pencil } from "lucide-react-native";

const FindFriend = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "black", padding: 16, paddingTop: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Find Friends</Text>
        <TouchableOpacity onPress={() => router.push("/createpartry2")}> 
          <Pencil size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={{ padding: 16 }}>
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

export default FindFriend;
