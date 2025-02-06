import { Stack} from "expo-router";
import { View,StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {


  return (
    <Stack initialRouteName="profile"> 
      <Stack.Screen name="index" options={{ title: "Home", headerShown:false }} />
      <Stack.Screen name="about" options={{ title: "About Us", headerShown:false }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerShown:false }} />
      <Stack.Screen name="login" options={{ title: "Login", headerShown:false }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign-Up", headerShown:false }} />
      <Stack.Screen name="createparty" options={{ title: "creaet", headerShown:false }} />
      <Stack.Screen name="createpartry2" options={{ title: "creat2", headerShown:false }} />


        {/* <Stack.Screen
          name="createparty"
          options={{
            title: "Create Party",
            headerLeft: () => (
              <View style={myStyleSheet.container}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={30}
                      color="black"
                      onPress={() => router.push("/index")} // ฟังก์ชันที่จะเรียกเมื่อกดไอคอน
                    />
            </View>
            ),
            headerTitleStyle: {
              fontSize: 30, // ขนาดของข้อความใน header
              fontWeight: 'bold',
            },
            headerStyle: {
              height: 100, // ขนาดของ header
              backgroundColor: 'lightgray', // สีพื้นหลังของ header
            },
          }}
        /> */}
      </Stack>
  );
}
// const myStyleSheet = StyleSheet.create({
//   container: {
//       flex: 1,
//       paddingTop: "25%",
//       paddingLeft:"45%",

//   },
//   iconTextContainer: {
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     fontWeight:'bold',
//   },

// })
