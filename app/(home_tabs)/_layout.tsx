import { Tabs } from 'expo-router';

export default function Stadium() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {height : 60}
      }}
    >
      <Tabs.Screen name='home' options={{ title: "home", headerShown:false }}/>
      <Tabs.Screen name='find_friend'  options={{ title: "find friend", headerShown:false }} />
      <Tabs.Screen name='my_booking'  options={{ title: "my booking", headerShown:false }}/>
      <Tabs.Screen name='setting'  options={{ title: "setting", headerShown:false }}/>
    </Tabs>
  );
};