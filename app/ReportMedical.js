import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const medicalConditions = [
  'Allergic Reaction', 'Stroke',
  'Cardiac Arrest', 'Choking',
  'Unconsciousness', 'Seizures',
  'Breathlessness', 'Major Trauma',
  'Asthma', 'Head Injury',
  'Open Wound', 'Bone Fracture'
];

export default function MedicalCondition() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const keywords = ['seizure', 'epilepsy', 'faint'];
    if (keywords.some(word => search.toLowerCase().includes(word))) {
      router.push({
        pathname: '/conditiondetail',
        params: {
          title: 'Seizure / Fainting',
          steps: JSON.stringify([
            'Ensure the person is safe.',
            'Do not hold them down or put anything in their mouth.',
            'Call emergency if seizure lasts >5 min.',
            'Stay with them until fully recovered.'
          ])
        }
      });
    }
  };

  const handlePress = (condition) => {
    if (condition === 'Cardiac Arrest') {
      router.push('/ReportCardiacArrest');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Consistent Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Medical Condition</Text>
      </View>

      {/* Emergency Banner */}
      <View style={styles.fullWidthAlert}>
        <Ionicons name="call-outline" size={28} color="darkred" />
        <Text style={styles.alertText}>What is your emergency?</Text>
      </View>

      {/* Grid Buttons */}
      <View style={styles.grid}>
        {medicalConditions.map((condition, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.conditionButton}
            onPress={() => handlePress(condition)}
          >
            <Text style={styles.conditionText}>{condition}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Others Input */}
      <Text style={styles.othersLabel}>Others</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Type Here ..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40, // match CardiacArrest
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
  othersLabel: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "grey",
  },
});

