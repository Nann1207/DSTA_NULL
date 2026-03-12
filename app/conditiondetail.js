import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConditionDetail() {
  const router = useRouter();
  const { title, steps } = useLocalSearchParams();

  // Parse steps from JSON string to array
  const stepList = steps ? JSON.parse(steps) : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={styles.header}>Medical Condition</Text>
      </TouchableOpacity>

      <View style={styles.redBox}>
        <Ionicons name="alert-circle" size={24} color="darkred" />
        <Text style={styles.alertText}>{title}</Text>
      </View>

      <ScrollView style={{ marginTop: 16 }}>
        {stepList.map((step, idx) => (
          <View key={idx} style={styles.stepRow}>
            <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    marginTop: 45, // match CardiacArrest
    padding: 16,
    backgroundColor: '#F5F5FA',
    flexGrow: 1,
  },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  header: { 
    fontSize: 20, 
    fontWeight: '600', 
    marginLeft: 8 
  },
  redBox: {
    backgroundColor: '#ef9a9a',
    padding: 16,
    marginHorizontal: -16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6a1b1a',
    marginLeft: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepText: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
  },
});