import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CustomButton } from '../../components/CustomButton';

export const MapTrackingScreen = () => {
  // In a real app, this would use react-native-maps and real-time WebSocket data
  const handleAssignArea = (area: string) => {
    Alert.alert(
      "Assign Employee",
      `Send alert to nearest employee to cover ${area}? If they decline, it will route to the next available employee.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Dispatch", onPress: () => console.log(`Alert sent for ${area}`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Live Store Heatmap</Text>
      
      <View style={styles.mapMockup}>
        <Text style={styles.mapText}>[ Map view displaying employee coordinates ]</Text>
        <View style={styles.unattendedZone}>
          <Text style={{color: '#fff'}}>Section B is Empty!</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>Quick Actions</Text>
      <CustomButton title="Send Staff to Section A" onPress={() => handleAssignArea('Section A')} />
      <CustomButton title="Send Staff to Section B" onPress={() => handleAssignArea('Section B')} variant="danger" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  subHeader: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  mapMockup: { height: 300, backgroundColor: '#e9ecef', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  mapText: { color: '#6c757d' },
  unattendedZone: { position: 'absolute', top: 50, right: 50, backgroundColor: 'red', padding: 10, borderRadius: 5 },
});