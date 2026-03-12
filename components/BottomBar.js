import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import useKeyboardOpen from '../hooks/useKeyboardOpen';


export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const isKeyboardOpen = useKeyboardOpen(); 

  const isActive = (route) => pathname === route;

  // Hide BottomBar if keyboard is open
  if (isKeyboardOpen) return null;

  return (
    <View style={styles.barBackground}>
      <View style={styles.wrapper}>
        <View style={styles.bottomBar}>
          <TabButton
            icon={<Feather name="phone" size={22} color={isActive('/emergencycontact') ? '#D75649' : '#000'} />}
            label="Contact"
            onPress={() => router.push('/emergencycontact')}
            active={isActive('/emergencycontact')}
            styleOverride={{ marginRight: 3 }}
          />


          <TabButton
            icon={<Feather name="file-text" size={22} color={isActive('/Report') ? '#D75649' : '#000'} />}
            label="Report"
            onPress={() => router.push('/Report')}
            active={isActive('/Report')}
            styleOverride={{ marginRight: -5 }}
          />


          <View style={styles.spacer} /> {/* Center circle spacer */}

          <TabButton
            icon={
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={isActive('/checklist') ? '#D75649' : '#000'}
              />
            }
            label="Checklist"
            onPress={() => router.push('/checklist')}
            active={isActive('/checklist')}
            styleOverride={{ marginLeft: 30 }}
          />


          <TabButton
            icon={<Feather name="book-open" size={22} color={isActive('/Guides') ? '#D75649' : '#000'} />}
            label="Guides"
            onPress={() => router.push('/Guides')}
            active={isActive('/Guides')}
          />
        </View>


        {/* Center Circle Floating Button */}
        <TouchableOpacity
          onPress={() => router.push('/News')}
          style={styles.centerCircleWrapper}
          activeOpacity={0.8}
        >
          <View style={[styles.centerCircle, isActive('/News') && styles.centerCircleActive]}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color="#fff" />
            <Text style={styles.centerCircleText}>News</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const TabButton = ({ icon, label, onPress, active, styleOverride }) => (
  <TouchableOpacity onPress={onPress} style={[styles.tab, styleOverride]}>
    {icon}
    <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  barBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    paddingVertical: 47,
    marginHorizontal: -16,
    shadowColor: '#000',
  },
  bottomBar: {
    backgroundColor: '#F5F5FA',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    marginHorizontal: 12,
    borderRadius: 30,
    shadowColor: '#f',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 3,
    color: '#000',
  },
  activeLabel: {
    color: '#D75649',
  },
  spacer: {
    width: 50,
  },
  centerCircleWrapper: {
    position: 'absolute',
    top: -23,
    left: '50%',
    transform: [{ translateX: -40 }],
    zIndex: 10,
  },
  centerCircle: {
    width: 80,
    height: 80,
    borderRadius: 45,
    backgroundColor: '#F97E71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircleActive: {
    backgroundColor: '#D75649',
  },
  centerCircleText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
});
