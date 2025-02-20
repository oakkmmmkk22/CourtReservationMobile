// import { View, Text } from "react-native";

// export default function App() {

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>hello this is find friend</Text>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePickerExample = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    setShowPicker(false); // ปิด Picker หลังจากเลือกเวลา
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>เลือกเวลา: {time.toLocaleTimeString()}</Text>
      <Button title="เลือกเวลา" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TimePickerExample;
