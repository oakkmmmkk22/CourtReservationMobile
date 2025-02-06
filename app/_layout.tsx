import { Stack} from "expo-router";
import { View,StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {


  return (
    <Stack initialRouteName="profile"> 
      <Stack.Screen name="index" options={{ title: "index", headerShown:false }} />
      <Stack.Screen name="about" options={{ title: "About Us", headerShown:false }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerShown:false }} />
      <Stack.Screen name="login" options={{ title: "Login", headerShown:false }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign-Up", headerShown:false }} />
      <Stack.Screen name="createparty" options={{ title: "creaet", headerShown:false }} />
      <Stack.Screen name="createpartry2" options={{ title: "creat2", headerShown:false }} />
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
