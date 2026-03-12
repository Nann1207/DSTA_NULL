import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Modal, ScrollView, Image, Alert, Dimensions, SafeAreaView
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import MapPlaceholder from '../assets/map-placeholder.png';
import Swiper from 'react-native-swiper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';


export default function FloodReport() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [iframeHtml, setIframeHtml] = useState('');
  const [floodTipsVisible, setFloodTipsVisible] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const floodTips = [
    {
      title: 'Be a Flood-Wise Pedestrian',
      image: 'https://www.pub.gov.sg/-/media/PUB/Flood-Resilience/2024-Flood-Wise-Campaign/Tips_Pedestrian.jpg?h=1200&w=1600&hash=B64C9E8A9DD15D5BFB90AFEACFA16062',
      tips: [
        'Do not walk into flooded areas.',
        'See a flooded area ahead? Turn back and move immediately to higher ground.',
        'Do not walk through moving water above ankle height.',
        'Use a stick or umbrella to check for open drains and ground firmness.'
      ]
    },
    {
      title: 'Be a Flood-Wise Motorist',
      image: 'https://www.pub.gov.sg/-/media/PUB/Flood-Resilience/2024-Flood-Wise-Campaign/Tips_Motorist.jpg',
      tips: [
        'Avoid driving through a flooded area above road kerb height.',
        'Drive slowly and steadily. Avoid braking.',
        'Stay close to the middle lane. Go through floodwater one vehicle at a time.',
        'If car stalls, turn on hazard light, call for help, move to higher ground.',
        'Gently tap brakes to dry them after exiting flood.'
      ]
    },
    {
      title: 'Be a Flood-Wise Home/Business Owner',
      image: 'https://www.pub.gov.sg/-/media/PUB/Flood-Resilience/2024-Flood-Wise-Campaign/Tips_Home-and-Business-Owner.jpg',
      tips: [
        'Ensure drains are choke-free and flood barriers are functional.',
        'Install flood barriers to protect property.',
        'Move essential items to higher ground.',
        'Turn off main switches and unplug devices if evacuating.',
        'Never touch switches when wet or in water.'
      ]
    }
  ];

  const speak = (index) => {
    const textToRead = floodTips[index].tips.join('. ');
      Speech.speak(textToRead, { language: 'en' });
  };

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
            L.marker([${lat}, ${lng}]).addTo(map).bindPopup("You are here").openPopup();
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

    setDetails('');
    setImages([]);
    router.push('/FormSubmittedScreen');
  };

  const openZoom = (imageUri) => setZoomImage(imageUri);
  const closeZoom = () => setZoomImage(null);

  return (
    <GestureHandlerRootView style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
        <Text style={styles.headerText}>Flood Report</Text>
        <TouchableOpacity onPress={() => setFloodTipsVisible(true)} style={{ marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="book-information-variant" size={24} />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <MaterialIcons name="flood" size={24} color="#520606" />
        <Text style={styles.bannerText}>Flash Flood</Text>
      </View>

      <ScrollView>
      {/* Map */}
      <View style={styles.mapContainer}>
        <Image source={MapPlaceholder} style={styles.placeholderImage} resizeMode="cover" />
        {iframeHtml && (
          <WebView originWhitelist={['*']} source={{ html: iframeHtml }} style={StyleSheet.absoluteFill} />
        )}
      </View>

      {/* Flood Type Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 3, marginHorizontal: 12 }}>
        {['Pedestrian', 'Motorist', 'Home/Business'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, selectedType === type && styles.selectedButton]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={{ fontWeight: 'bold' }}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upload Section */}
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadLabel}>Provide up to 3 Photos or 1 Video:</Text>
        {images.map((img, index) => (
          <View key={index} style={styles.uploadBox}>
            <Text style={{ color: '#444', flex: 1 }}>{img.fileName || img.uri?.split('/').pop()}</Text>
            <View style={styles.uploadIcons}>
              <Feather name="camera" size={18} style={{ marginRight: 10 }} />
              <Feather name="upload" size={18} />
            </View>
          </View>
        ))}
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

      {/* Text Input */}
      <Text style={styles.label}>Details of Flash Flood:</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type Here ..."
        value={details}
        onChangeText={setDetails}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit Report</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Flood Tips Modal */}
      <Modal visible={floodTipsVisible} animationType="fade" transparent>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.transparentOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setFloodTipsVisible(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <View style={{ height: 600 }}>
                <Swiper showsPagination loop={false} showsButtons>
                {floodTips.map((tip, index) => (
                  <ScrollView key={index} contentContainerStyle={{ paddingTop: -10, padding: 20 }}>
                    <Text style={styles.modalTitle}>{tip.title}</Text> 
                    <TouchableOpacity onPress={() => speak(index)}>
                      <Ionicons name="volume-high-outline" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openZoom(tip.image)} style={{ position: 'relative' }}>
                      <Image
                        source={{ uri: tip.image }}
                        style={styles.tipImage}
                        resizeMode="cover"
                        onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)}
                      />
                      <View style={styles.zoomIconOverlay}>
                        <Fontisto name="zoom-plus" size={24} color="white" />
                      </View>
                    </TouchableOpacity>
                    {tip.tips.map((point, i) => (
                      <Text key={i} style={styles.bullet}><FontAwesome5 name="check-square" size={14} /> {point}</Text>
                    ))}
                  </ScrollView>
                ))}
              </Swiper>
            </View>
          </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Image Zoom Modal */}
      <Modal visible={!!zoomImage} transparent>
        <TouchableOpacity style={styles.zoomOverlay} onPress={closeZoom}>
          {zoomImage && (
            <Image
              source={{ uri: zoomImage }}
              style={styles.zoomedImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Modal>
    </GestureHandlerRootView>
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
    backgroundColor: '#F5A6A6', borderRadius: 2,
    paddingHorizontal: 40, paddingVertical: 15, marginHorizontal: -16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, elevation: 3, flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  bannerText: { color: '#520606', fontWeight: 'bold', fontSize: 16 },
  mapContainer: { height: 200, borderRadius: 10, margin: 16, overflow: 'hidden' },
  placeholderImage: {
    width: '100%', height: '100%', position: 'absolute', top: 0, left: 0,
  },
  typeButton: {
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: '#aaa', borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#f5cfcf', borderColor: '#d80000',
  },
  uploadContainer: { paddingHorizontal: 16, marginTop: 14 },
  uploadLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  uploadBox: {
    borderWidth: 1, borderColor: '#999', borderRadius: 4,
    paddingVertical: 12, paddingHorizontal: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 6,
  },
  uploadIcons: { flexDirection: 'row', alignItems: 'center' },
  label: { marginLeft: 16, fontWeight: '600', fontSize: 13 },
  input: {
    margin: 16, backgroundColor: '#f9f9f9', borderRadius: 6,
    padding: 12, minHeight: 80, textAlignVertical: 'top',
  },
  submitButton: {
    alignSelf: 'flex-end', marginRight: 16, backgroundColor: '#D75649',
    borderRadius: 20, paddingVertical: 10, paddingHorizontal: 20,
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff', borderRadius: 12, margin: 20, paddingBottom: 10,
    maxHeight: '90%',
  },
  closeBtn: { alignSelf: 'flex-end', padding: 10 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  bullet: { marginVertical: 4, marginLeft: 8, lineHeight: 18 },
  tipImage: {
    width: '100%', height: undefined, aspectRatio: 16 / 9, borderRadius: 10, marginBottom: 10,
  },
  zoomIconOverlay: {
    position: 'absolute', right: 10, bottom: 10,
    backgroundColor: '#0008', padding: 6, borderRadius: 20,
  },
  zoomOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center',
  },
  zoomedImage: {
    width: '100%', height: '100%',
  },
});