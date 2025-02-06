import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="profile"> 
      <Stack.Screen name="index" options={{ title: "index", headerShown:false }} />
      <Stack.Screen name="about" options={{ title: "About Us", headerShown:false }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerShown:false }} />
      <Stack.Screen name="login" options={{ title: "Login", headerShown:false }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign-Up", headerShown:false }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
    </Stack>
  );
}
