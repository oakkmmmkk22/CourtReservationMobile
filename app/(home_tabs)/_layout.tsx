import { Tabs } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

export default function Stadium() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า
  const handlePress = () => {
    router.push('/setting')
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 60 }
      }}
    >
      <Tabs.Screen 
        name='home' 
        options={{ 
          title: "home", 
          headerShown: false 
        }}
      />
      <Tabs.Screen 
        name='find_friend'  
        options={{ 
          title: "find friend", 
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name='my_booking'  
        options={{ 
          title: "my booking", 
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name='setting'  
        options={{ 
          title: "setting", 
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name='account'  
        options={{ 
          title: "account", 
          tabBarItemStyle: { display: 'none' }, 
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require('../../assets/images/arrow_back.png')} // เปลี่ยนเป็น URL หรือ path ของรูปที่คุณต้องการ
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }} 
      />
      <Tabs.Screen 
        name='changeemail'  
        options={{ 
          title: "changeemail", 
          tabBarItemStyle: { display: 'none' }, 
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/account')}>
              <Image
                source={require('../../assets/images/arrow_back.png')} // เปลี่ยนเป็น URL หรือ path ของรูปที่คุณต้องการ
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }} 
      />
      <Tabs.Screen 
        name='changepassword'  
        options={{ 
          title: "changepassword", 
          tabBarItemStyle: { display: 'none' }, 
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/account')}>
              <Image
                source={require('../../assets/images/arrow_back.png')} // เปลี่ยนเป็น URL หรือ path ของรูปที่คุณต้องการ
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }} 
      />
      <Tabs.Screen 
        name='changeusername'  
        options={{ 
          title: "changeusername", 
          tabBarItemStyle: { display: 'none' }, 
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/account')}>
              <Image
                source={require('../../assets/images/arrow_back.png')} // เปลี่ยนเป็น URL หรือ path ของรูปที่คุณต้องการ
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }} 
      />
      <Tabs.Screen 
        name='report'  
        options={{ 
          title: "report", 
          tabBarItemStyle: { display: 'none' }, 
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/account')}>
              <Image
                source={require('../../assets/images/arrow_back.png')} // เปลี่ยนเป็น URL หรือ path ของรูปที่คุณต้องการ
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }} 
      />
    </Tabs>
  );
};
