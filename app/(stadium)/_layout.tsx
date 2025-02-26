import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { router, withLayoutContext} from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet , Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function App() {

  return (
    <View style={styles.container}>
      <View style={{flex:4}}>
        <Image 
          source={{ uri: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Labrador.jpg?v=1645179151' }} 
          style={styles.image} 
          resizeMode="cover"
          />
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
          <Ionicons name="chevron-back-outline" size={30} color="white"/>
        </TouchableOpacity>
        <View
          style={styles.title}
        >
          <Text style={styles.name}>Ruamimitr court</Text>
          <Text style={styles.star}>⭐5.0 | <Text style={styles.location}>SRIRACHA, CHONBURI</Text></Text>
          <Text style={styles.type}>Type: <Text style={styles.itype}>BADMINTON</Text></Text>
        </View>
      </View>

      {/* MaterialTopTabs Navigation */}
      <View style={{ flex: 10}}>
        <MaterialTopTabs>
          <MaterialTopTabs.Screen 
            name="reviews" 
            options={{ 
              title: "Reviews", 
            }}
          />
          <MaterialTopTabs.Screen 
            name="about" 
            options={{ 
              title: "About", 
            }}
          />
          <MaterialTopTabs.Screen 
            name="booking" 
            options={{ 
              title: "Booking", 
            }}
          />
        </MaterialTopTabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    flex:6,
    marginBottom:-15,
    // marginTop:-20,
  },
  title:{
    flex:4,
    padding:20,
    borderTopLeftRadius: 20,  // Rounded top-left corner
    borderTopRightRadius: 20, 
    backgroundColor:"white"
  },
  name:{
    fontWeight:"bold",
    fontSize:25,
  },
  star:{
    marginTop:7,
    fontSize:20,
  },
  type:{
    fontSize:15,
    fontWeight:"bold",
    marginTop:10,
  },
  itype:{
    backgroundColor:"#1834C0",
    color:"white",
    padding:4,
    paddingTop:0,
    paddingBottom:1,
    borderRadius:20,
    borderColor:"black",
    borderWidth:2,
    fontSize:12,
    fontWeight:"500"
  },
  location:{
    fontSize:15
  },

  backButton: {
    position: 'absolute',
    padding: 10,
    borderRadius: 20,
  },
  arrow: {
    fontSize: 24,  // Size of the arrow
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

