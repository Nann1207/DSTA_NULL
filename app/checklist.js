import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // import Ionicons

const checklistItems = [
  { icon: require('../icons/checklistfire.png'), label: 'Fires' },
  { icon: require('../icons/checklistbomb.png'), label: 'Terrorism Threat' },
  { icon: require('../icons/checklistpandemic.png'), label: 'Pandemic' },
  { icon: require('../icons/checklisttsunami.png'), label: 'Natural Disasters' },
  { icon: require('../icons/checklistrocket.png'), label: 'War Crisis' },
  { icon: require('../icons/checklistmedical.png'), label: 'Medical Condition' },
  { icon: require('../Images/checklistdisease.png'), label: 'Diseases' },
  { icon: require('../Images/checklistflood.png'), label: 'Flood' },


];

// Map labels to routes (adjust routes to your file structure)
const routes = {
  Fires: '/ChecklistFire',
  'Terrorism Threat': '/ChecklistTerrorism',
  Pandemic: '/ChecklistPandemic',
  'Natural Disasters': '/ChecklistNaturalDisaster',
  'War Crisis': '/ChecklistWar',
  'Medical Condition': '/ChecklistMedical',
  Diseases: '/ChecklistDisease',
  Flood: '/ChecklistFlooding'

};

function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/home')} style={{ paddingRight: 8 }}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
}

export default function ChecklistScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Filter items based on search text (case-insensitive)
  const filteredItems = checklistItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerWrapper}>
        
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
            <Image source={require('../icons/checklist.png')} style={styles.logo} />
            <Text style={styles.headerTitle}>Checklists</Text>
          </View>

          {/* Search */}
          <View style={styles.searchBackground}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search"
                style={styles.searchInput}
                placeholderTextColor="#888"
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>
            <ScrollView contentContainerStyle={styles.container}>
              {/* Checklist Grid */}
              <View style={styles.grid}>
                {filteredItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => {
                      const route = routes[item.label];
                      if (route) router.push(route);
                    }}
                  >
                    <Image source={item.icon} style={styles.cardIcon} />
                    <Text style={styles.cardText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View> {/* ← this was missing */}
            </ScrollView>
      

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  containerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginHorizontal : 10,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },

  searchBackground: {
    backgroundColor: '#f8a8a8',
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },

  card: {
    width: '47%',
    height: 130,
    backgroundColor: '#f6f6fa',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
  },


});



