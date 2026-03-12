import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WorkInProgress() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerText}>Coming Soon</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Work in Progress</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
  },
});