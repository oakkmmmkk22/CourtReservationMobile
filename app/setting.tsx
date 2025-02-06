import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Import for icons (if needed)

export default function SettingPage() {
    const router = useRouter();

    const settingsOptions = [
        {
            title: "Account",
            subtitle: "Personal Details",
            route: "/account", // Replace with your actual route
            icon: "person", // Example icon name (if using icons)
        },
        {
            title: "Report",
            subtitle: "Report an issue with Usage",
            route: "/report", // Replace with your actual route
            icon: "alert-circle-outline", // Example icon name
        },
        {
            title: "Log out",
            route: "/logout", // Or handle logout logic directly
            icon: "log-out", // Example icon name
        },
        // Add more settings options as needed
    ];

    const handlePress = (route) => {
        if (route === "/logout") {
            // Handle logout logic here (e.g., clear tokens, etc.)
            console.log("Logging out...");
            // After logout logic, navigate or reset navigation state if needed
            router.push("/login"); // Example: navigate to login screen
        } else if (route) {
            router.push(route);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Setting</Text>
            </View>
            {settingsOptions.map((option, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.option} 
                    onPress={() => handlePress(option.route)}
                >
                    {/* Render icon if provided */}
                    {option.icon && (
                        <Ionicons name={option.icon} size={24} color="black" style={styles.optionIcon} />
                    )}
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>{option.title}</Text>
                        {option.subtitle && (
                            <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                        )}
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="gray" /> {/* Right arrow */}
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20, // Adjust as needed for safe area
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align title to the left
        alignItems: 'center', // Vertically center
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionIcon: {
        marginRight: 15,
    },
    optionTextContainer: {
        flex: 1, // Make text container take up available space
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    optionSubtitle: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
});