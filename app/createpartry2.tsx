import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // For newer React Native versions and Expo
import DateTimePicker from "@react-native-community/datetimepicker"; // For Date/Time pickers
import { useSafeAreaInsets } from "react-native-safe-area-context"; // For handling safe areas
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useGlobalSearchParams, useRouter } from "expo-router";
import api from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Dropdown } from "react-native-element-dropdown";

// import axios from "axios";

const CreatePartyScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Get safe area insets
  const [topic, setTopic] = useState(""); // Initial value
  const [type, setType] = useState("badminton");
  const [total, setTotal] = useState(1);
  // const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState(""); // Initial value
  // const [showTimepicker, setShowTimepicker] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [formattedTime, setFormattedTime] = useState("");
  // const [formattedDate, setFormattedDate] = useState("");
  const [wrongt, setWrongT] = useState("");
  const [wrongDes, setWrongDes] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const {
    location_for_party,
    type_for_party,
    date_for_party,
    start_time_for_party,
    end_time_for_party,
    court_id,
  } = useGlobalSearchParams();

  const formattedDate =
    date_for_party instanceof Date
      ? date_for_party.toISOString().slice(0, 10)
      : String(date_for_party || "").slice(0, 10);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(token); // test decode
    setMemberName(decoded.userData.username);
  };

  useEffect(() => {
    getToken();
    // console.log(location);
  }, []);

  const handleCreateParty = () => {
    // console.log("Creating party with data:", {
    //   topic,
    //   type,
    //   total,
    //   date_for_party,
    //   start_time_for_party,
    //   end_time_for_party,
    //   description,
    //   court_id
    // });
    if (topic != "" && description != "") {
      api
        .post("/createparty", {
          topic: topic,
          type: type,
          total_members: total,
          date: date_for_party,
          startTime: start_time_for_party,
          endTime: end_time_for_party,
          detail: description,
          court_id: court_id,
        })
        .then(() => {
          console.log("PHONE HERE!!!");

          console.log("Create successfully");
          router.push("/find_friend");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
      // console.log(username, password)
      // setUsername("")
      // setPassword("")
    } else {
      console.log("input some data");

      if (topic == "") {
        setWrongT("*input Topic");
      }
      if (description == "") {
        setWrongDes("*input Description");
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {/* header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={() => router.push("/find_friend")}
        />
        <Text style={styles.headerTitle}>Create Party</Text>
      </View>

      <ScrollView>
        {/* username */}
        <View style={styles.memberItem}>
          <View style={styles.memberIcon} />
          <Text style={styles.memberName}>{memberName}</Text>
        </View>

        <View style={styles.inputContainer}>
          {/* Topic */}
          <Text style={styles.label}>Topic:</Text>
          <TextInput
            placeholder="Topic"
            style={styles.input}
            value={topic}
            onChangeText={setTopic}
            placeholderTextColor={"lightgray"}
          />
          <Text style={styles.wrong}>{wrongt}</Text>

          {/* Type sport */}
          <Text style={styles.label}>Type:</Text>
          <View style={styles.pickerContainer}>
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {type_for_party}
            </Text>
          </View>

          {/* Total people */}
          <Text style={styles.label}>Total:</Text>
          <TextInput
            style={styles.input}
            value={total.toString()}
            onChangeText={(text) => setTotal(parseInt(text) || 0)}
            keyboardType="numeric"
          />

          {/* /Date */}
          <Text style={styles.label}>Date:</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {formattedDate}
            </Text>
          </View>

          {/* Time*/}
          <Text style={styles.label}>Time:</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {start_time_for_party} - {end_time_for_party}
            </Text>
          </View>

          {/* Place */}
          <Text style={styles.label}>Place:</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgray",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {location_for_party}
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.label}>Description:</Text>

          <TextInput
            placeholder="Description"
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={"lightgray"}
          />

          <Text style={styles.wrong}>{wrongDes}</Text>
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        {/* BTN Create */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateParty}
        >
          <Text style={styles.createButtonText}>Create Party</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 20,
    paddingTop: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  picker: {},

  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#000",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  memberIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEEEEE",
  },
  memberName: {
    fontSize: 26,
    color: "#333333",
    marginLeft: 20,
    fontWeight: "bold",
  },
  centerview: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalview: {
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    width: 300,
    height: 420,
    backgroundColor: "white",
  },
  calendar: {
    width: 280,
    height: 350,
  },
  close: {
    margin: 30,
    fontSize: 15,
    backgroundColor: "black",
    width: 100,
    alignItems: "center",
  },
  wrong: {
    fontSize: 15,
    color: "red",
  },
});

export default CreatePartyScreen;
