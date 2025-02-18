import { Tabs } from 'expo-router';

export default function Stadium() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {height : 60}
      }}
    >
      <Tabs.Screen name='home' />
      <Tabs.Screen name='booking' />
      <Tabs.Screen name='reviews' />
      <Tabs.Screen name='about' />
    </Tabs>
  );
};