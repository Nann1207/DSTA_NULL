import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PastFloodReportDetail() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={[styles.header, styles.horizontalPadding]}>
          <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
          <Text style={styles.headerText}>Flood Report</Text>
        </View>
      </View>

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>Status Updated: 12/05/2025 , 08:45am</Text>
      </View>

      <Image
        source={{ uri: 'https://tinyurl.com/ycx43myn' }}
        style={styles.image}
      />

      <View style={styles.body}>
        <Text style={styles.label}><Text style={styles.bold}>Location:</Text> Bedok North Ave 4</Text>
        <Text style={styles.label}><Text style={styles.bold}>Date:</Text> 12/05/2025</Text>
        <Text style={styles.label}><Text style={styles.bold}>Time:</Text> 08:00am</Text>
        <Text style={styles.label}><Text style={styles.bold}>Incident:</Text> Flash Flood</Text>
        <Text style={styles.label}><Text style={styles.bold}>Description:</Text> Heavy rainfall caused water levels to rise along Bedok North Ave 4. Motorists faced delays. PUB issued alert.</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={styles.statusNote}>The flood has receded. PUB has cleared the area and resumed normal traffic flow.</Text>
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
  statusText: { color: '#333', fontSize: 12 },
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
