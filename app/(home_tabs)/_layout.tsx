import { Tabs } from 'expo-router';
import { Image, TouchableOpacity , Text} from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";


export default function Stadium() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า
  const handlePress = () => {
    router.push('/setting')
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarActiveTintColor: 'black', // สีเมื่อแท็บถูกเลือก
        
      }}
    >
      <Tabs.Screen 
        name='home' 
        options={{ 
          title: "Sports", 
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#ffffff',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require('../../assets/images/crystal.png')} // เปลี่ยนเป็น URL หรือ path ของรูปที่คุณต้องการ
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )
        }}
      />
      <Tabs.Screen 
        name='find_friend'  
        options={{ 
          title: "Find Friend", 
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#ffffff',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name='my_booking'  
        options={{ 
          title: "My book", 
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#ffffff',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name='setting'  
        options={{ 
          title: "Setting", 
          headerShown: true,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#ffffff',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
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
