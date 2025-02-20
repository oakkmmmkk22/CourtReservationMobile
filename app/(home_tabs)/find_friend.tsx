// import { View, Text } from "react-native";

// export default function App() {

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>hello this is find friend</Text>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePickerExample = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShowPicker(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>เลือกเวลา: {time.toLocaleTimeString()}</Text>
      <Button title="เลือกเวลา" onPress={() => setShowPicker(true)} />

      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <DateTimePickerModal
          isVisible={showPicker}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={() => setShowPicker(false)}
        />
      ) : (
        showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowPicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )
      )}
    </View>
  );
};

export default TimePickerExample;

