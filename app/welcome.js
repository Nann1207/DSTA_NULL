
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../Images/crisisWatch.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>CRISIS WATCH</Text>
        <Text style={styles.tagline}>PROACTIVE, PREPARED, PROTECTED</Text>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFDADA',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
