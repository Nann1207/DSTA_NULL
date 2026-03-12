import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const naturalDisasters = [
  'Tsunamis', 'Earthquakes',
  'Volcanic Eruptions', 'Heatwaves',
  'Air Pollution', 'Wildfires',
  'Landslides', 'Typhoon',
  'Hail Storms', 'Drought',
];

export default function NaturalDisasters() {
  const router = useRouter();

  const handlePress = (condition) => {
    if (condition === 'Wildfires') {
      router.push('/ReportWildfire');
    } else {
      router.push('/WorkInProgress');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Natural Disasters</Text>
      </View>

      {/* Emergency Banner */}
      <View style={styles.fullWidthAlert}>
        <Ionicons name="call-outline" size={28} color="darkred" />
        <Text style={styles.alertText}>What is your emergency?</Text>
      </View>

      {/* Grid Buttons */}
      <View style={styles.grid}>
        {naturalDisasters.map((condition, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.conditionButton}
            onPress={() => handlePress(condition)}
          >
            <Text style={styles.conditionText}>{condition}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#F5F5FA',
    flexGrow: 1,
  },
  headerRow: {
    backgroundColor: '#F5F5FA',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
    paddingTop: 2,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 5,
    paddingTop: 3,
  },
  fullWidthAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef9a9a',
    padding: 20,
    marginHorizontal: -16,
    marginBottom: 16,
  },
  alertText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#6a1b1a',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  conditionButton: {
    width: '48%',
    backgroundColor: '#fee3e6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 6,
  },
  conditionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});