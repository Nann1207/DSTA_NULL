import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import { Video } from 'expo-av';
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/home')} style={{ paddingRight: 8 }}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
}

const guideData = {
  CPR: {
    video: require('../assets/CPR.mp4'),
    title: 'CPR Guide',
    description:
      "Cardiac arrest occurs when the heart suddenly stops beating, stopping blood flow to the brain and vital organs. It's different from a heart attack but can be caused by one. Immediate CPR can double or triple survival chances.",
    steps: [
      'Check for safety and responsiveness',
      'Call someone to call 995 (Ambulance) and get AED',
      'Open the airway',
      'Check for normal breathing',
      'Begin 30 chest compressions (2 inches deep at 100-120/min)',
      'Give 2 rescue breaths (if trained)',
      'Continue cycles until help arrives',
      'Use AED if available',
    ],
  },
  Fire: {
    video: require('../assets/Fire.mp4'),
    title: 'Fire Safety Guide',
    description:
      'In case of fire, remember to stay calm and follow these steps to ensure your safety and the safety of others.',
    steps: [
      'Alert everyone in the building',
      'Call the fire department (995)',
      'Use fire extinguisher if safe to do so\n-> Guide to use fire extinguisher',
      'Stay low to avoid smoke inhalation',
      'Feel doors before opening - if hot, find another exit',
      'Never use elevators during a fire',
      'If trapped, signal for help from a window',
      'Meet at a designated safe location',
    ],
    instructions: [
      { text: '<b>Remember PASS:</b>', isHtml: true },
      { text: '<b>Pull the pin</b><br/>- Pull the safety pin from the handle.', isHtml: true },
      { text: '<b>Aim at the base of the fire</b><br/>- Direct the nozzle at the source of the fire.', isHtml: true },
      { text: '<b>Squeeze the handle</b><br/>- Apply pressure to release the extinguishing agent.', isHtml: true },
      { text: '<b>Sweep from side to side at the base of the fire</b><br/>-This will cover the area and ensure the fire is completely put out.', isHtml: true },
    ],
  },
  Choking: {
    video: require('../assets/choking.mp4'),
    title: 'Choking First Aid',
    description:
      "When someone is choking, quick action can save their life. Here's what to do for adults and children over 1 year old.",
    steps: [
      'Ask "Are you choking?" - if they can speak/cough, encourage them to cough',
      "If they can't speak/breathe, stand behind them",
      'Make a fist with one hand, thumb side in',
      'Place fist above navel, below ribcage',
      'Grasp fist with other hand and give quick upward thrusts',
      'Continue until object is expelled or person becomes unconscious',
      'If unconscious, begin CPR',
      'Always seek medical attention after choking incident',
    ],
  },
  'Bomb Threat': {
    video: require('../assets/bomb.mp4'),
    title: 'Bomb Threat Response',
    description:
      "If you receive a bomb threat, remain calm and follow these procedures to ensure everyone's safety.",
    steps: [
      'Stay calm and keep the caller on the line if possible',
      'REPORT USING CRISISWATCH SECRETLY',
      'or Notify authorities immediately (999) if permitted',
      'Listen carefully and note details about the caller and threat',
      'Follow evacuation procedures if instructed',
      'Do not touch suspicious packages',
      'Move to a safe distance (at least 300m away)',
      'Avoid using radios or cell phones near the area',
      'Wait for official all-clear before re-entering',
    ],
  },
  Tsunami: {
    video: require('../assets/tsunami.mp4'),
    title: 'Tsunami Preparedness',
    description: 'Tsunamis can be devastating. Knowing what to do can save your life.',
    steps: [
      'Know the warning signs: strong earthquake, rapid ocean recession',
      'Move immediately to high ground (at least 30m above sea level)',
      'Go on foot if possible - roads may be damaged',
      'If no high ground, go as far inland as possible',
      'Stay away from the coast until officials declare it safe',
      'Never go to the shore to watch a tsunami',
      'Have an emergency kit ready in advance',
      'Have a family communication plan',
    ],
  },
};

export default function Guides() {
  const [activeGuide, setActiveGuide] = useState('CPR');
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Pause video when changing tab
    setIsPlaying(false);
    videoRef.current?.pauseAsync();
  }, [activeGuide]);

  const renderGuideContent = () => {
    const guide = guideData[activeGuide];

    return (
      <ScrollView style={styles.content}>
        <View style={styles.videoBox}>
          <Video
            ref={videoRef}
            source={guide.video}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={isPlaying}
            useNativeControls
            isMuted={false}
            onError={(e) => console.error('Video error:', e)}
          />
        </View>

        <Button title={isPlaying ? 'Pause Video' : 'Play Video'} onPress={togglePlayback} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{guide.title}</Text>
          <Text style={styles.cardText}>{guide.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key steps</Text>
          {guide.steps.map((step, index) => (
            <Text key={`step-${index}`} style={styles.stepText}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        {guide.instructions && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Instructions</Text>
            {guide.instructions.map((item, index) =>
              item.isHtml ? (
                <HTML
                  key={`instruction-${index}`}
                  source={{ html: item.text }}
                  tagsStyles={{ b: { fontWeight: 'bold' } }}
                  baseFontStyle={styles.stepText}
                />
              ) : (
                <Text key={`instruction-text-${index}`} style={styles.stepText}>
                  {item.text}
                </Text>
              )
            )}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <View style={styles.headerLeft}>
          <Ionicons name="book-outline" size={22} color="#000" />
          <Text style={styles.headerText}>Guides</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {Object.keys(guideData).map((tab) => (
          <TouchableOpacity
            key={`tab-${tab}`}
            style={[styles.tab, tab === activeGuide && styles.activeTab]}
            onPress={() => setActiveGuide(tab)}
          >
            <Text style={[styles.tabText, tab === activeGuide && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {renderGuideContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffdada',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f8bcbc',
  },
  activeTab: { backgroundColor: '#ffa8a8' },
  tabText: { color: '#333', fontSize: 12 },
  activeTabText: { fontWeight: 'bold', color: '#000' },
  content: { flex: 1, padding: 15 },
  videoBox: {
    height: 220,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  video: { width: '100%', height: '100%' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  cardText: { fontSize: 14, color: '#333', lineHeight: 22 },
  stepText: { fontSize: 14, color: '#333', marginBottom: 6, marginLeft: 10 },
});