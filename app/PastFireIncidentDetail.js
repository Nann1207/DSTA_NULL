import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PastFireIncidentDetail() {
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
        <Text style={styles.statusText}>Status Updated: 04/03/2025 , 11:55pm</Text>
      </View>

      <Image
        source={{ uri: 'https://tinyurl.com/e3fhc6b2' }}
        style={styles.image}
      />

      <View style={styles.body}>
        <Text style={styles.label}><Text style={styles.bold}>Location:</Text> Block 616 Woodlands Avenue 4</Text>
        <Text style={styles.label}><Text style={styles.bold}>Date:</Text> 04/03/2025</Text>
        <Text style={styles.label}><Text style={styles.bold}>Time:</Text> 10:50pm</Text>
        <Text style={styles.label}><Text style={styles.bold}>Incident:</Text> Fire at Void Deck</Text>
        <Text style={styles.label}><Text style={styles.bold}>Description:</Text> There is a huge fire in the void deck from trash pile on the ground at Blk 616 Woodlands Avenue 475.</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={styles.statusNote}>SCDF has attended to the fire.</Text>
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
  headerText: { fontSize: 20, fontWeight: '600' },
  statusBar: {
    backgroundColor: '#F5A6A6', padding: 18, borderRadius: 1, marginBottom: 12,
  },
  statusText: { color: '#333', fontSize: 12, alignContent: 'right', flexDirection: 'row' },
  image: { width: '100%', height: 180, borderRadius: 1, marginBottom: 16 },
  body: { paddingHorizontal: 16, gap: 8 },
  label: { fontSize: 14 },
  bold: { fontWeight: 'bold' },
  statusContainer: {
    backgroundColor: '#F5DCDC', padding: 19, marginTop: 20, borderRadius: 1
  },
  statusLabel: { fontWeight: 'bold', marginBottom: 4, fontSize: 14 },
  statusNote: { color: '#811212', fontSize: 14 }
});
