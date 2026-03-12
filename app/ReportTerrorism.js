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
import Swiper from 'react-native-swiper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

export default function TerrorismReport() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [iframeHtml, setIframeHtml] = useState('');
  const [tipsVisible, setTipsVisible] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const MapPlaceholder = require('../assets/map-placeholder.png');
  const [showBunkers, setShowBunkers] = useState(true);

  const safetyTips = [
    {
      title: 'If You Witness Suspicious Activity',
      image: 'https://www.internationalairportreview.com/wp-content/uploads/shutterstock_624395705.jpg',
      tips: [
        'Do not approach the suspicious individual or object.',
        'Note specific details: location, clothing, behavior.',
        'Move to a safe distance and alert authorities immediately.',
        'Avoid spreading unverified information.'
      ]
    },
    {
      title: 'During a Terror Attack',
      image: 'https://images.unsplash.com/photo-1455368109333-ebc686ad6c58?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tips: [
        'Run if you can safely escape the area.',
        'Hide if escape isn’t possible. Lock/barricade entry points.',
        'Silence phones. Remain quiet and calm.',
        'Fight only as a last resort to protect yourself.'
      ]
    },
    {
      title: 'After an Incident',
      image: 'https://images.unsplash.com/photo-1503324010925-71cfe52dad2a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tips: [
        'Follow instructions from emergency responders.',
        'Avoid the area until it’s declared safe.',
        'Help others if it’s safe to do so.',
        'Report what you saw to authorities.',
        'Seek medical help for trauma or injury.'
      ]
    }
  ];

  const speak = (index) => {
    const textToRead = safetyTips[index].tips.join('. ');
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

      let bunkerMarkers = '';
      if (showBunkers) {
        const bunkers = [
          {lat: 1.2784873, lng: 103.8674547}, 
          {lat: 1.2764103, lng: 103.8545956}, 
          {lat: 1.2874522, lng: 103.8461192},
          {lat: 1.2839641, lng: 103.843142},
          {lat: 1.284334, lng: 103.8513798},
          {lat: 1.3002285, lng: 103.855575},
          {lat: 1.2797206, lng: 103.8394399},
          {lat: 1.29324, lng: 103.8522208}
          ];
        bunkerMarkers = bunkers
          .map(
            (bunker) => `
          L.marker([${bunker.lat}, ${bunker.lng}], {
            icon: L.icon({
              iconUrl: 'https://www.scdf.gov.sg/images/default-source/cd-shelter/cd-shelter-logo-01711c5eafc0a84b29afa7c5a52c2cfe7a.tmb-medium.png?Culture=en&sfvrsn=c0a01a8c_1',
              iconSize: [45, 30],
              className: 'custom-bunker-icon'
            })
          }).addTo(map);
        `
          )
          .join('');

      }

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
${bunkerMarkers};        
</script>
      </body>
      </html>`;
      setIframeHtml(html);
    })();
  }, [showBunkers]);

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
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerText}>Terrorism Report</Text>
        <TouchableOpacity onPress={() => setTipsVisible(true)} style={{ marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="book-information-variant" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <MaterialIcons name="warning" size={24} color="#7c0000" />
        <Text style={styles.bannerText}>Terrorism Incident</Text>
      </View>

      <ScrollView>
        <View style={styles.mapContainer}>
          <Image source={MapPlaceholder} style={styles.placeholderImage} resizeMode="cover" />
          {iframeHtml && (
            <WebView originWhitelist={['*']} source={{ html: iframeHtml }} style={StyleSheet.absoluteFill} />
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 3, marginHorizontal: 12 }}>
          {['Suspicious Activity', 'Active Attack', 'Post-Incident'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.typeButton, selectedType === type && styles.selectedButton]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={{ fontWeight: 'bold' }}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Upload up to 3 Photos or 1 Video:</Text>
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

        <Text style={styles.label}>Details of Incident:</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Describe what you saw..."
          value={details}
          onChangeText={setDetails}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={tipsVisible} animationType="fade" transparent>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.transparentOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setTipsVisible(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <View style={{ height: 600 }}>
                <Swiper showsPagination loop={false} showsButtons>
                  {safetyTips.map((tip, index) => (
                    <ScrollView key={index} contentContainerStyle={{ padding: 20 }}>
                      <Text style={styles.modalTitle}>{tip.title}</Text>
                      <TouchableOpacity onPress={() => speak(index)}>
                        <Ionicons name="volume-high-outline" size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => openZoom(tip.image)}>
                        <Image source={{ uri: tip.image }} style={styles.tipImage} resizeMode="cover" />
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

      <Modal visible={!!zoomImage} transparent>
        <TouchableOpacity style={styles.zoomOverlay} onPress={closeZoom}>
          {zoomImage && (
            <Image source={{ uri: zoomImage }} style={styles.zoomedImage} resizeMode="contain" />
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