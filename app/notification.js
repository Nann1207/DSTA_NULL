
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';



if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LockScreenMock() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeString = now.toLocaleTimeString('en-SG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Singapore',
      });

      const dateString = now.toLocaleDateString('en-SG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: 'Asia/Singapore',
      });

      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);




  const router = useRouter();

  const handleNotificationPress = () => {
    router.push('/welcome');
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <ImageBackground
      source={require('../Images/mountain.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.time}>{currentTime}</Text>
        <Text style={styles.date}>{currentDate}</Text>


        <TouchableOpacity style={styles.card} onPress={handleNotificationPress}>
          <View style={styles.header}>
            <Icon name="alert-circle-outline" size={30} color="#D32F2F" />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>CRISIS WATCH</Text>
              <Text style={styles.subtitle}>TSUNAMI ALERT | Expected to hit at 12.30pm</Text>
            </View>
            <Text style={styles.timeRight}>9:00 AM</Text>
          </View>

          {expanded && (
            <View style={styles.details}>
              <Text style={styles.detailText}>
                Heading to Singapore Coastline, expected to hit 12.30pm
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  time: {
    fontSize: 72,
    color: '#fff',
    fontWeight: '300',
  },
  date: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 14,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
  },
  timeRight: {
    fontSize: 12,
    color: '#888',
  },
  details: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
  },
});