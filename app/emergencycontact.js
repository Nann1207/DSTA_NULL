import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const policeIcon = require('../Images/policeman.png');
const smsIcon = require('../Images/sms.png');

const contacts = [
  {
    title: 'EMERGENCY POLICE HOTLINE',
    icon: require('../Images/policeman.png'),
    phoneLeft: '999',
    phoneRight: '70999',
    iconLeft: policeIcon,
    iconRight: smsIcon,
    sub: 'Police Call  /   SMS',
  },
  {
    title: 'EMERGENCY AMBULANCE AND FIRE HOTLINE',
    icon: require('../Images/ambulance.png'),
    phoneLeft: '995',
    sub: 'Singapore Civil Defense Force (SCDF)',
  },
  {
    title: 'NON-EMERGENCY AMBULANCE HOTLINE',
    icon: require('../Images/ambulance.png'),
    phoneLeft: '1777',
    sub: 'Singapore Civil Defense Force (SCDF)',
  },
  {
    title: 'DRUG AND POISON',
    icon: require('../Images/drug.png'),
    phoneLeft: '995 (Emergency)',
    phoneRight: '6423 9119 (Non-Emergency)',
  },
  {
    title: 'TRAFFIC POLICE',
    icon: require('../Images/trafficpolice.png'),
    phoneLeft: '6547 0000',
  },
];

export default function EmergencyContact() {
  const router = useRouter();

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')} style={{ paddingRight: 10 }}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Emergency Contact</Text>
      </View>



      <ScrollView contentContainerStyle={styles.container}>
        {contacts.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Image source={item.icon} style={styles.icon} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.phoneRow}>
                  {item.iconLeft && <Image source={item.iconLeft} style={styles.inlineIcon} />}
                  <Text style={styles.phone}>{item.phoneLeft}</Text>
                  {item.phoneRight && (
                    <>
                      <Text style={styles.phone}> / </Text>
                      {item.iconRight && <Image source={item.iconRight} style={styles.inlineIcon} />}
                      <Text style={styles.phone}>{item.phoneRight}</Text>
                    </>
                  )}
                </View>
                {item.sub && (
                  <Text
                    style={[
                      styles.sub,
                      item.title === 'DRUG AND POISON' ? { fontWeight: 'normal' } : {},
                    ]}
                  >
                    {item.sub}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#ffecec',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    minHeight: 120,
    justifyContent: 'center',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android elevation
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginTop: 5,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#aa2e45',
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    fontWeight: '600',
  },
  inlineIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginHorizontal: 4,
  },
  sub: {
    color: '#333',
    fontSize: 13,
    flexWrap: 'wrap',
  },
});
