import { Tabs } from 'expo-router';
import { Image, TouchableOpacity , Text, Modal,TouchableWithoutFeedback,View,StyleSheet} from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState ,useEffect} from "react";
import { Pencil } from 'lucide-react-native';
import axios from "axios";
import api from '../axiosinstance';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function Stadium() {
  const router = useRouter(); // ใช้เปลี่ยนหน้า
  const handlePress = () => {
    router.push('/setting')
  };
  const [showModal,setShowModal] = useState(false);
  const [crytal,setCrytal] = useState(0);
  

  useFocusEffect(
    useCallback(() => {
      const fetchPoint = async () => {
        try {
          const response = await api.get("/point");
          if (response.data.length > 0) {
            setCrytal(response.data[0].point);
          }
        } catch (error) {
          console.error("API Error:", error);
        }
      };
  
      fetchPoint();
      const interval = setInterval(fetchPoint, 10000);
  
      return () => {
        clearInterval(interval); // หยุด Interval เมื่อออกจากหน้า
      };
    }, [])
  );


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

            <View>
              
              <View style={styles.header}>
                    <View style={styles.pointsContainer}>
                      
                    <TouchableOpacity onPress={() => router.push('/point')}>
                 <Text style={styles.price}>💎 </Text>
              </TouchableOpacity>
                      <Text style={styles.points}>{crytal}</Text>
                      <Ionicons name="person-circle" size={35} color="white" onPress={() => setShowModal(true)} />
                    </View>
                </View>

              <Modal visible={showModal} animationType="fade" transparent={true}>
                    <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                          <View style={styles.centerview}>
                              <TouchableWithoutFeedback>
                                  <View style={styles.modalview}>
                                    
                                      <TouchableOpacity style={styles.btn} onPress={() => {router.push('/account');  setShowModal(false); }} >
                                        
                                        <Ionicons name="person" size={18} color="black"  />
                                        <Text style={{ marginLeft: 8}}>User</Text>
                                      </TouchableOpacity>
                                      <View style={styles.line}/>
        
                                      <TouchableOpacity style={styles.btn} onPress={() => {router.push('/setting');  setShowModal(false);}}>
                                        <Ionicons name="settings" size={18} color="black" />
                                        <Text style={{ marginLeft: 8 }}>Setting</Text>
                                      </TouchableOpacity>
                                      <View style={styles.line}/>
                                    
                                      <TouchableOpacity style={styles.btn} onPress={() => {router.push('/login');  setShowModal(false);}}>
                                        <Ionicons name="log-out" size={18} color="black" />
                                        <Text style={{ marginLeft: 8 }}>Logout</Text>
                                      </TouchableOpacity>
                                    
                                  </View>
                                </TouchableWithoutFeedback>
                            </View>
                      </TouchableWithoutFeedback>
                  </Modal>
              
            </View>
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
        name='cart'  
        options={{ 
          title: " Cart", 
          headerShown: true,
          tabBarItemStyle: { display: 'flex' }, 
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#ffffff',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" size={size} color={color} />
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
          title: "change email", 
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
          title: "change username", 
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
            <TouchableOpacity onPress={() => router.push('/setting')}>
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

const styles = StyleSheet.create({
  centerview:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    padding:'7%',
    alignItems:'flex-end'

  },
  modalview:{
    borderRadius:20,
    shadowColor:'#000',
    width:130,
    height:160,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10,
    
  },
  line:{
    backgroundColor:'black',
    height:0.5 ,
    width:'75%',
    marginVertical:5,
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 15 
  },
  pointsContainer: { 
    flexDirection: "row",
     alignItems: "center" 
    },
  points: { 
    color: "white", 
    marginHorizontal: 5 
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
},

})
