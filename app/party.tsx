import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Party = () => {
  const partyName = "PP";
  const totalMembers = 3;
  const currentMembers = 2;
  const phoneNumber = "090-000-0000";
  const members = ["Oak", "ABC"];
  const broadcastMessage = "เล่นชิวๆ ไม่จริงจัง เน้นออกกำลังกาย";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Handle back navigation */ }}>
          <Text style={styles.backButton}>&lt; Join Party</Text>
        </TouchableOpacity>
        <View style={styles.partyInfo}>
          <Text style={styles.partyName}>{partyName}</Text>
          <View style={styles.memberCount}>
            <Text style={styles.memberText}>Total: {currentMembers}/{totalMembers}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Member:</Text>
          <View style={styles.memberList}>
            {members.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <View style={styles.memberIcon} /> {/* Replace with actual icon */}
                <Text>{member}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Broadcast</Text>
          <View style={styles.broadcastBox}>
            <Text>{broadcastMessage}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.joinButton} onPress={() => { /* Handle join party */ }}>
        <Text style={styles.joinButtonText}>Join Party</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background color
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: 'blue',
    marginRight: 10,
  },
  partyInfo: {
    flex: 1,
  },
  partyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    fontSize: 16,
    color: 'gray',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberList: {
    // No specific styles needed, default layout is fine
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  memberIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'gray', // Placeholder for user icon
    marginRight: 5,
  },
  broadcastBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  joinButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Party;