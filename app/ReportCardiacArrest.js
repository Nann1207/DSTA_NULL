import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Fontisto,
} from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import MapPlaceholder from '../assets/map-placeholder.png';
import Swiper from 'react-native-swiper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

export default function CardiacArrest() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [iframeHtml, setIframeHtml] = useState('');
  const [cardiacTipsVisible, setcardiacTipsVisible] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showAEDs, setShowAEDs] = useState(true);

  const cardiacTips = [
    {
      title: 'What to do during Cardiac Arrest',
      image:
        'https://sera.sg/e/wp-content/uploads/2022/09/CPR-guide-768x543.png',
      tips: [
        'Check responsiveness',
        'Call 995 when in doubt',
        'Start CPR – Begin chest compression if person is not breathing',
        "Use an AED – If available, follow the AED's instructions",
        'Continue CPR – Keep going until help arrives or the person recovers',
      ],
    },
  ];

  const speak = (index) => {
    const textToRead = cardiacTips[index].tips.join('. ');
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

      let aedMarkers = '';
      if (showAEDs) {
        const aeds = [
          {lat: 1.2821327, lng: 103.8577961}, 
          {lat: 1.2835237, lng: 103.8607716}, 
          {lat: 1.2825487, lng: 103.8584827},
          {lat: 1.2826017, lng: 103.8576588},
          {lat: 1.2821327, lng: 103.8577961},
          {lat: 1.2818247, lng: 103.8582157},
          {lat: 1.2815688, lng: 103.858971},
          {lat: 1.2818717, lng: 103.8590778},
          {lat: 1.2832717, lng: 103.8586582},
          {lat: 1.2825468, lng: 103.8601154}
          ];
        aedMarkers = aeds
          .map(
            (aed) => `
          L.marker([${aed.lat}, ${aed.lng}], {
            icon: L.divIcon({
              html: '<i class="fa-solid fa-heart-pulse" style="font-size:24px;color:red;"></i>',
              iconSize: [30, 30],
              className: 'custom-aed-icon'
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>

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
${aedMarkers};        
</script>
      </body>
      </html>`;
      setIframeHtml(html);
    })();
  }, [showAEDs]);

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
        <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerText}>Medical Condition</Text>
        <TouchableOpacity
          onPress={() => setcardiacTipsVisible(true)}
          style={{ marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="book-information-variant" size={24} />
        </TouchableOpacity>
      </View>



      {/* Banner */}
      <View style={styles.banner}>
        <Image source={require('../assets/heart.png')} style={styles.icon} />
        <Text style={styles.bannerText}>Cardiac Arrest</Text>

        
        <Image source={require('../assets/AED.png')} style={styles.icon2} />
      </View>

      <ScrollView>
        {/* Map */}
        <View style={styles.mapContainer}>
          <Image
            source={MapPlaceholder}
            style={styles.placeholderImage}
            resizeMode="cover"
          />
          {iframeHtml && (
            <WebView
              originWhitelist={['*']}
              source={{ html: iframeHtml }}
              style={StyleSheet.absoluteFill}
            />
          )}
        </View>

        {/* Instructions */}  
        <Text style={styles.uploadLabel}>Please call 995 and head to the nearest AED location:</Text>
        
        {/* Emergency Button */}
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => router.push('tel:995')}>
          <Text style={styles.callText}>CALL 995</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Cardiac Tips Modal */}
      <Modal visible={cardiacTipsVisible} animationType="fade" transparent>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.transparentOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setcardiacTipsVisible(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <View style={{ height: 600 }}>
                <Swiper showsPagination loop={false}>
                  {cardiacTips.map((tip, index) => (
                    <ScrollView
                      key={index}
                      contentContainerStyle={{ paddingTop: -10, padding: 20 }}>
                      <Text style={styles.modalTitle}>{tip.title}</Text>
                      <TouchableOpacity onPress={() => speak(index)}>
                        <Ionicons name="volume-high-outline" size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openZoom(tip.image)}
                        style={{ position: 'relative' }}>
                        <Image
                          source={{ uri: tip.image }}
                          style={styles.tipImage}
                          resizeMode="cover"
                          onError={(e) =>
                            console.log(
                              'Image failed to load:',
                              e.nativeEvent.error
                            )
                          }
                        />
                        <View style={styles.zoomIconOverlay}>
                          <Fontisto name="zoom-plus" size={24} color="white" />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.tipText}>
                        {tip.tips.map((point, i) => (
                          <Text key={i} style={styles.bullet}>
                            <FontAwesome5 name="check-square" size={14} />{' '}
                            {point}
                          </Text>
                        ))}
                      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10,
    gap: 8,
    paddingHorizontal: 16,
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
  icon: { paddingHorizontal: 16, marginLeft: -5 },
  icon2: { width: 35, height: 35, marginLeft: 98 },
  uploadLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 15 },
  transparentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    paddingBottom: 10,
    maxHeight: '90%',
  },
  closeBtn: { alignSelf: 'flex-end', padding: 10 },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  bullet: { marginVertical: 4, marginLeft: 8, marginRight: 3, lineHeight: 18 },
  tipImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 5,
    marginLeft: 0,
    marginHorizontal: 10,
  },
  tipText: {
    marginTop: 15,
  },
  zoomIconOverlay: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#0008',
    padding: 6,
    borderRadius: 20,
  },
  zoomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImage: {
    width: '100%',
    height: '100%',
  },
});