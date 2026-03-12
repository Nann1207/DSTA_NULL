import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Report() {
  const router = useRouter();

  const routes = {
    "Medical Condition": "/ReportMedical",         // matches 'Medical' pill ➜ ReportMedical.jsx
    "Terrorism Threat": "/ReportTerrorism",        // matches 'Terrorism' pill ➜ ReportTerrorism.jsx
    "Fire Incidents": "/ReportFire",               // matches 'Fire' pill ➜ ReportFire.jsx
    "Natural Disasters": "/ReportNaturalDisaster", // matches 'NaturalDisaster' pill ➜ ReportNaturalDisaster.jsx
    "Flood Report": "/ReportFlood",                // matches 'Flood' pill ➜ ReportFlood.jsx
    "Accidents": "/ReportAccident",                // matches 'Accident' pill ➜ ReportAccident.jsx
    "Violence": "/ReportViolence",                 // matches 'Violence' pill ➜ ReportViolence.jsx
  };

  return (
    <View style={styles.page}>

      {/* Header with My Reports on the right */}
      
      <View style={styles.headerContainer}>
        <View style={[styles.headerRow, styles.horizontalPadding]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.push('/home')} style={{ paddingRight: 10 }}>
            <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>

            <MaterialCommunityIcons name="file-document-multiple-outline" size={26} color="black" />
            <Text style={styles.headerText}>Report</Text>
            

          </View>
          <TouchableOpacity onPress={() => router.push('/MyReports')}>
            <Text style={styles.myReportsText}>My Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBackground}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput placeholder="search" style={styles.searchInput} placeholderTextColor="#999" />
          <Feather name="filter" size={18} color="#000" style={styles.filterIcon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {Object.keys(routes).map((label, i) => (
          <TouchableOpacity
            key={i}
            style={styles.reportButton}
            onPress={() => router.push(routes[label])}
          >
            <Text style={{ fontWeight: '600' }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  horizontalPadding: { paddingHorizontal: 16 },
  headerContainer: { backgroundColor: '#F5F5FA' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
    marginBottom: 10,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerText: { fontSize: 20, fontWeight: '600' },
  myReportsText: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#810D0D',
  },
  searchBackground: {
    backgroundColor: '#F5A6A6',
    borderRadius: 2,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 10,
    marginHorizontal: -16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#000' },
  filterIcon: { marginLeft: 8 },
  body: { paddingHorizontal: 26 },
  reportButton: {
    backgroundColor: '#F4F2F9',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
});