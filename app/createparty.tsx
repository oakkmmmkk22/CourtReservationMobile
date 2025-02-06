import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า

  return (
    <View style={myStyleSheet.container}>
        <View style={myStyleSheet.iconTextContainer}>
            <Ionicons name="chevron-back-outline" size={30} color="black"
            onPress={() => router.push("/index")}/>
            <Text style={{fontSize:24 }}>Create Party  </Text>
            <Ionicons name="create-outline" size={40} color="black"></Ionicons>
        </View>
    
    </View>
  );

}


  const myStyleSheet = StyleSheet.create({
      container: {
          flex: 1,
          paddingTop: "13%",
          paddingLeft:"5%",

      },
      iconTextContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        fontWeight:'bold',
      },
    
  })



