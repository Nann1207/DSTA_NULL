import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Modal, ScrollView, Image, Alert
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import MapPlaceholder from '../assets/map-placeholder.png';

export default function FireIncidents() {
  const router = useRouter();
  const [infoVisible, setInfoVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [iframeHtml, setIframeHtml] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      setUserLocation({ lat, lng });

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
          <style>html, body, #map { margin: 0; height: 100%; }</style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script>
            var map = L.map('map').setView([${lat}, ${lng}], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            var userMarker = L.marker([${lat}, ${lng}]).addTo(map).bindPopup("You are here").openPopup();
          </script>
        </body>
        </html>`;
      setIframeHtml(html);
    })();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      selectionLimit: 1,
      quality: 0.5,
    });
    if (!result.canceled && images.length < 4) {
      setImages([...images, result.assets[0]]);
    }
  };

  const handleSubmit = () => {
    if (images.length === 0 || details.trim() === '') {
      Alert.alert(
        'Incomplete Report',
        'Please upload at least one photo or video and provide incident details before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Proceed to submission
    setDetails('');
    setImages([]);
    router.push('/FormSubmittedScreen');
  };


  const speak = () => {
    Speech.speak("If Minor fire: Carefully proceed to the incident location. Extinguish the fire using available means (extinguishers, buckets of water, taps and hoses,drencher systems for rubbish chutes). Snap picture / Report fire AND call 995. If Major Fire: Do not proceed any closer to incident location. If it is safe to do so, Snap picture / Report fire AND call 995. If you receive any instructions for evacuation, do so immediately");
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
        <Text style={styles.headerText}>Fire Incidents</Text>
        <TouchableOpacity onPress={() => setInfoVisible(true)} style={{ marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="book-information-variant" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <MaterialCommunityIcons name="fire-alert" size={24} color="#520606" />
        <Text style={styles.bannerText}>Minor/Major Fire</Text>
      </View>

      <Text style={styles.instruction}>Keep calm and follow instructions below</Text>
      <ScrollView>

      {/* Map */}
      <View style={styles.mapContainer}>
        <Image
          source={MapPlaceholder}
          style={styles.placeholderImage}
          resizeMode="contain"
        />
        {iframeHtml && (
          <WebView
            originWhitelist={['*']}
            source={{ html: iframeHtml }}
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>

      {/* Emergency Button */}
      <TouchableOpacity style={styles.callButton} onPress={() => router.push('tel:995')}>
        <Text style={styles.callText}>CALL 995</Text>
      </TouchableOpacity>

      {/* File Upload */}
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadLabel}>
          Provide up to 3 Photos or 1 Video:
        </Text>

        {/* Render uploaded images with file name and styled box */}
        {images.map((img, index) => (
          <View
            key={index}
            style={[styles.uploadBox, { backgroundColor: '#f0f0f0', borderColor: '#aaa' }]}
          >
            <Text style={{ color: '#444', flex: 1 }}>
              {img.fileName || img.uri?.split('/').pop()}
            </Text>
            <View style={styles.uploadIcons}>
              <Feather name="camera" size={18} style={{ marginRight: 10 }} />
              <Feather name="upload" size={18} />
            </View>
          </View>
        ))}

        {/* Upload Button if limit not reached */}
        {images.length < 4 && (
          <TouchableOpacity onPress={pickImages} style={styles.uploadBox}>
            <Text style={{ color: '#444', flex: 1 }}>Choose file ...</Text>
            <View style={styles.uploadIcons}>
              <Feather name="camera" size={18} style={{ marginRight: 10 }} />
              <Feather name="upload" size={18} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Details Input */}
      <Text style={styles.label}>Details of Fire Incident/Possible Causes:</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type Here ..."
        value={details}
        onChangeText={setDetails}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit Report</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={infoVisible} animationType="slide" transparent>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setInfoVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
            <ScrollView>
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name="fire" size={20} />
                <Text style={styles.modalTitle}>Fire Incident Instructions</Text>
                <TouchableOpacity onPress={speak}>
                  <Ionicons name="volume-high-outline" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalSectionTitle}>Minor Fire:</Text>
              <Text style={styles.bullet}><FontAwesome5 name="check-square" size={15} /> Carefully proceed to incident location</Text>
              <Text style={styles.bullet}><FontAwesome5 name="check-square" size={15} /> Extinguish the fire using available means (extinguishers, buckets of water, taps and hoses, drencher systems for rubbish chutes)</Text>
              <Text style={styles.bullet}><FontAwesome5 name="check-square" size={15} /> Snap picture, Report fire AND call 995</Text>

              <Text style={styles.modalSectionTitle}>Major Fire:</Text>
              <Text style={styles.bullet}><FontAwesome5 name="check-square" size={15} /> Do not proceed closer to incident location</Text>
              <Text style={styles.bullet}><FontAwesome5 name="check-square" size={15} /> If safe: take picture, report fire AND call 995</Text>
              <Text style={styles.bullet}><FontAwesome5 name="check-square" size={15} /> If you receive any instructions for evacuation, do so immediately</Text>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 60, marginBottom: 10, gap: 8, paddingHorizontal: 16,
  },
  headerText: { fontSize: 20, fontWeight: '600' },
  banner: {
    backgroundColor: '#F5A6A6', 
    borderRadius: 2,
    paddingHorizontal: 40, 
    paddingVertical: 15, 
    marginHorizontal: -16,
    shadowColor: '#000', 
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 4, 
    elevation: 3,
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6,
  },
  bannerText: { color: '#520606', fontWeight: 'bold', fontSize: 16 },
  instruction: {
    backgroundColor: '#eee', 
    padding: 6,
    textAlign: 'center', 
    fontSize: 13, 
    fontStyle: 'italic',
  },
  mapContainer: {
    height: 200, 
    borderRadius: 10, 
    margin: 16, 
    overflow: 'hidden',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  callButton: {
    backgroundColor: '#D80000', 
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 12, 
    borderRadius: 6,
    marginHorizontal: 16, 
    marginVertical: 12,
  },
  callText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  uploadContainer: { paddingHorizontal: 16, marginTop: 14 },
  uploadLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  uploadBox: {
    borderWidth: 1, 
    borderColor: '#999', 
    borderRadius: 4,
    paddingVertical: 12, 
    paddingHorizontal: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  uploadIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { marginLeft: 16, fontWeight: '600', fontSize: 13 },
  input: {
    margin: 16, 
    backgroundColor: '#f9f9f9',
    borderRadius: 6, 
    padding: 12, 
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    alignSelf: 'flex-end', 
    marginRight: 16,
    backgroundColor: '#D75649', 
    borderRadius: 20,
    paddingVertical: 10, 
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff', 
    padding: 20,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 8, 
    marginBottom: 10,
  },
  modalTitle: { fontWeight: 'bold', fontSize: 16 },
  modalSectionTitle: { fontWeight: 'bold', marginTop: 12 },
  bullet: { marginVertical: 4, lineHeight: 18 }
});

