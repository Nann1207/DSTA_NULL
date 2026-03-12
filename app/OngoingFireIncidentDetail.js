import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OngoingFireIncidentDetail() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={[styles.header, styles.horizontalPadding]}>
          <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
          <Text style={styles.headerText}>Fire Incident</Text>
        </View>
      </View>
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>Status Updated: 12/06/2025 , 18:20pm</Text>
      </View>

      <Image
        source={{ uri: 'https://tinyurl.com/3ppyms7v' }}
        style={styles.image}
      />

      <View style={styles.body}>
        <Text style={styles.label}><Text style={styles.bold}>Location:</Text> Block 665C Tampines Street 64</Text>
        <Text style={styles.label}><Text style={styles.bold}>Date:</Text> 12/06/2025</Text>
        <Text style={styles.label}><Text style={styles.bold}>Time:</Text> 18:00pm</Text>
        <Text style={styles.label}><Text style={styles.bold}>Incident:</Text> Kitchen Fire in Flat Unit</Text>
        <Text style={styles.label}><Text style={styles.bold}>Description:</Text> A kitchen fire broke out in a unit on the 8th floor. Evacuation in progress, SCDF is on-site.</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={styles.statusNote}>SCDF is currently handling the fire. Residents advised to avoid the area.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  horizontalPadding: { paddingHorizontal: 16 },
  headerContainer: {
    backgroundColor: '#F5F5FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 10,
    gap: 8,
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: '600' 
  },
  statusBar: {
    backgroundColor: '#F5A6A6', 
    padding: 18, 
    borderRadius: 1, 
    marginBottom: 12,
  },
  statusText: { 
    color: '#333', 
    fontSize: 12 
  },
  image: { 
    width: '100%', 
    height: 180, 
    borderRadius: 1, 
    marginBottom: 16 },
  body: { 
    paddingHorizontal: 16, 
    gap: 8 
  },
  label: { fontSize: 14 },
  bold: { fontWeight: 'bold' },
  statusContainer: {
    backgroundColor: '#FFF0F0', 
    padding: 19, 
    marginTop: 20, 
    borderRadius: 1
  },
  statusLabel: { 
    fontWeight: 'bold', 
    marginBottom: 4, 
    fontSize: 14 
  },
  statusNote: { 
    color: '#A33B3B', 
    fontSize: 14 
  }
});