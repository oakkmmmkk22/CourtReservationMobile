import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { router, useFocusEffect, useGlobalSearchParams, withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Contact } from 'lucide-react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const { width, height } = Dimensions.get("window");

export default function App() {
    const { name, rating ,location ,facility_type, pictures } = useGlobalSearchParams();
    console.log("pictures : " + pictures);
    const parsedPictures = pictures ? JSON.parse(pictures) : [];
    const facilities = facility_type?.split(",") || []; 
    return (
        <View style={styles.container}>
            <View style={{ flex: 4 }}>
                <View style={styles.image1}>
                    <FlatList
                        data={parsedPictures}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item.photoUrl }} style={styles.image2} />
                        )}
                    />
                </View>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
                    <Ionicons name="chevron-back-outline" size={30} color="white" />
                </TouchableOpacity>
                <View
                    style={styles.title}
                >
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                    <Text style={styles.star} numberOfLines={1} ellipsizeMode="tail"><MaterialIcons name="star" size={20} color="gold" /> {parseFloat(rating)} | <Text style={styles.location}>{location}</Text></Text>
                    <Text style={styles.type} numberOfLines={1} ellipsizeMode="tail">Sport : 
                    
                    {facilities.map((facility, index) => (
                        <View key={index}>
                            <Text style={styles.itype}> {facility} </Text>
                        </View>
                    ))}
                    </Text>
                </View>
            </View>

            {/* MaterialTopTabs Navigation */}
            <View style={{ flex: 10 }}>
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
    image1: {
        width: '100%',
        flex: 6,
        marginBottom: -15,
        // marginTop:-20,
    },
    image2: {
        // width: '100%',
        marginBottom: -15,
        width: width,
        height:200,
        resizeMode: "cover",
    },
    title: {
        flex: 4,
        padding: 20,
        borderTopLeftRadius: 20,  // Rounded top-left corner
        borderTopRightRadius: 20,
        backgroundColor: "white"
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
    },
    star: {
        marginTop: 7,
        fontSize: 20,
    },
    type: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: -100,
        flex: 1,
    },
    itype: {
        backgroundColor: "#1834C0",
        color: "white",
        padding: 4,
        paddingTop: 0,
        paddingBottom: 1,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        fontSize: 12,
        fontWeight: "500",
        marginLeft:3,
    },
    location: {
        fontSize: 15
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
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      margin: 5,
    },
});

