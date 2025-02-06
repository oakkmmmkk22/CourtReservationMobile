import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="profile"> 
      <Stack.Screen name="index" options={{ title: "Home", headerShown:false }} />
      <Stack.Screen name="about" options={{ title: "About Us", headerShown:false }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerShown:false }} />
    </Stack>
  );
}
