import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FormSubmittedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>
          Please head to the nearest{"\n"}safe location!
        </Text>

        <View style={styles.checkmark}>
          <Ionicons name="checkmark-circle-outline" size={120} color="#D96E6E" />
        </View>

        <Text style={styles.submitted}>Report Submitted</Text>

        <Text style={styles.description}>
          SPF have been notified, they will be{"\n"}heading to the location.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BEBE',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  heading: {
    fontSize: 20, 
    textAlign: 'center',
    marginBottom: 20,
    color: '#802020',
    fontWeight: '600',
  },
  checkmark: {
    marginBottom: 20,
  },
  submitted: {
    fontSize: 24, 
    fontWeight: '900',
    color: '#802020',
    marginBottom: 12,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});