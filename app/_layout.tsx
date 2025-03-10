import { Stack} from "expo-router";
import { View,StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {


  return (
    <Stack> 
      <Stack.Screen name="index" options={{ title: "index", headerShown:false }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerShown:false }} />
      <Stack.Screen name="login" options={{ title: "Login", headerShown:false }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign-Up", headerShown:false }} />
      <Stack.Screen name="createpartry2" options={{ title: "creat2", headerShown:false }} /> 
      <Stack.Screen name="party" options={{ title: "party", headerShown:false }} /> 
      <Stack.Screen name="point" options={{ title: "point", headerShown:true }} /> 
      <Stack.Screen name="(home_tabs)" options={{ title: "(home_tabs)", headerShown:false }} /> 
      <Stack.Screen name="(home_tabs)/home" options={{ title: "(home_tabs)/home", headerShown:false }} /> 
      <Stack.Screen name="(stadium)" options={{ title: "(stadium)", headerShown:false }} /> 
      <Stack.Screen name="(home_tabs)/cart" options={{title: "(home_tabs)/cart" , headerShown:false}}/>
      <Stack.Screen name="pay-slip" options={{title: "pay-slip" , headerShown:false}}/>
      <Stack.Screen name="partyjoin" options={{title: "partyjoin" , headerShown:false}}/>
      <Stack.Screen name="partyin" options={{title: "partyin" , headerShown:false}}/>
    </Stack>
  );
}