import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import Swiper from 'react-native-swiper'
import { SafeAreaView } from 'react-native';
import { Platform } from 'react-native';


export default function HomeScreen() {
  const navigation = useRouter();
  const [locationText, setLocationText] = useState('Fetching location...');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationText('Permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let [place] = await Location.reverseGeocodeAsync(location.coords);
      if (place) {
        setLocationText(`${place.name || ''} ${place.street || ''}, ${place.city || place.subregion}`);
      }
    })();
  }, []);

  const handleReportPress = (type) => {
    navigation.push(`Report${type}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.location}>📍 {locationText}</Text>
        </View>

        {/* Alert Banner */}
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>🚨 Tsunami expected to hit coastal areas near Singapore around 12.30pm. Please stay away from the shoreline and follow official alerts.</Text>
        </View>

        {/* News Dashboard */}
      <View style={styles.newsSection}>
        <Text style={styles.newsHeader}>CURRENT NEWS</Text>
        <Text style={styles.subTitle}>NEAR YOUR AREA</Text>

        <View style={styles.newsItemRow}>
          <Image source={require('../icons/checklisttsunami.png')} style={styles.newsIcon} />
          <Text style={styles.newsItemText}>TSUNAMI ALERT</Text>
        </View>
        <Text>• Stay away from the coastline</Text>
        <Text>• Move to higher ground or a high-rise building</Text>
        <Text>• Follow official emergency broadcasts and alerts</Text>


        <View style={styles.newsItemRow}>
          <Image source={require('../icons/mask.png')} style={styles.newsIcon} />
          <Text style={styles.newsItemText}>COVID-19 OUTBREAK | MARINA BAY SANDS</Text>
        </View>
        <Text>• Make sure your vaccinations are up to date</Text>
        <Text>• Wear mask and practice safe distancing</Text>


        <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.push('News')}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>

        {/* Advertisement Banner */}


        <View style={styles.sliderContainer}>
          <Swiper
            showsPagination={true}
            autoplay={true}
            autoplayTimeout={3.5}
            loop={true}
            scrollEnabled={true}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.swiper}
          >
            <View style={styles.slide}>
              <Image source={require('../Images/ad1.png')} style={styles.slideImage} />
            </View>
            <View style={styles.slide}>
              <Image source={require('../Images/ad2.png')} style={styles.slideImage} />
            </View>
            <View style={styles.slide}>
              <Image source={require('../Images/ad3.png')} style={styles.slideImage} />
            </View>
          </Swiper>
        </View>



        {/* Reporting Section */}
        <View style={styles.reportingSection}>
          <Text style={styles.sectionTitle}>What's your emergency?</Text>
          
          <View style={styles.pillContainer}>  {/* 🆕 New container */}
            <View style={styles.emergencyOptions}>
              {[
                { type: 'Medical', icon: require('../icons/medical.png'), label: 'Medical' },
                { type: 'Fire', icon: require('../icons/fire.png'), label: 'Fire' },
                { type: 'NaturalDisaster', icon: require('../icons/NaturalDisaster.png'), label: 'Natural Disaster' },
                { type: 'Accident', icon: require('../icons/accident.png'), label: 'Accident' },
                { type: 'Violence', icon: require('../icons/violence.png'), label: 'Violence' },
                { type: 'Rescue', icon: require('../icons/rescue.png'), label: 'Rescue' },
                { type: 'Flood', icon: require('../icons/Homeflood.png'), label: 'Flood' },
                { type: 'Terrorism', icon: require('../icons/terrorism.png'), label: 'Terrorism' },
              ].map(({ type, icon, label }) => (
                <TouchableOpacity
                  key={type}
                  style={styles.pillButton}
                  onPress={() => handleReportPress(type)}
                >
                  <Image source={icon} style={styles.optionIcon} />
                  <Text style={styles.pillText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>  
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
  },

  alertBanner: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: -16,
  },
  
  alertText: {
    color: 'white',
    fontWeight: 'bold',
  },

  newsSection: {
    backgroundColor: '#fcecec',
    padding: 10,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#800000', 
  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 1,
  },

  newsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#800000', 
    marginBottom: 4,
  },
  
  newsItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  newsIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    resizeMode: 'contain',
  },
  newsItemText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  readMore: {
    color: '#800000',
    marginTop: 10,
    fontWeight: '600',
  },


  sliderContainer: {
    height: 200, // or any height you want
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden', // important to clip overflow
    marginTop: 16,

      // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 4,
  },

  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

    swiper: {
    flex: 1,
  },

    safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },

  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    marginBottom: -20,
  },

  activeDot: {
    backgroundColor: '#333',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: -20,
  },

  reportingSection: {
    marginTop: 15,
  },


  emergencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 10,
  },


  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },



  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },

  
  pillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

});
