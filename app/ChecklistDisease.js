import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  Image, View, Text, TextInput, TouchableOpacity, 
  FlatList, StyleSheet, SafeAreaView, ScrollView, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

export default function ChecklistDisease() {
  const router = useRouter(); // 👈 router used here

  const defaultItems = [
    { id: '1', text: 'Important documents (passport, ID)', tag: 'Priority', checked: false, default: true },
    { id: '2', text: 'Medications (e.g., painkillers, prescription drugs)', tag: 'Priority', checked: false, default: true },
    { id: '3', text: 'Face masks (N95 or surgical masks)', tag: 'Essentials', checked: false, default: true },
    { id: '4', text: 'Hand sanitizers (at least 60% alcohol)', tag: 'Essentials', checked: false, default: true },
    { id: '5', text: 'Thermometer (for checking temperature)', tag: 'Essentials', checked: false, default: true },
    { id: '6', text: 'Gloves', tag: 'Essentials', checked: false, default: true },
    { id: '7', text: 'Disinfecting wipes or sprays', tag: 'Essentials', checked: false, default: true },
  ];

  const [items, setItems] = useState(defaultItems);
  const [text, setText] = useState('');

  const addItem = () => {
    if (text.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text,
        tag: 'Essentials',
        checked: false,
        default: false,
      };
      setItems([...items, newItem]);
      setText('');
    }
  };

  const toggleItemCheck = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const removeItem = (id) => {
    const item = items.find(i => i.id === id);
    if (item && !item.default) {
      setItems(items.filter(i => i.id !== id));
    } else {
      Alert.alert("Default items can't be removed");
    }
  };

  const speakPrecautions = () => {
    const message =
      "Disease Preparedness Precautions: " +
      "1. Wash your hands frequently with soap and water for at least 20 seconds. " +
      "2. Wear a mask in crowded or enclosed spaces. " +
      "3. Stay at home if you're feeling unwell. " +
      "4. Maintain physical distancing of at least 6 feet. " +
      "5. Disinfect surfaces that are frequently touched. " +
      "6. Monitor symptoms and seek medical help if needed.";
    Speech.speak(message);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => toggleItemCheck(item.id)}>
      <Ionicons
        name={item.checked ? "checkmark-circle" : "ellipse-outline"}
        size={20}
        color={item.checked ? "green" : "#888"}
      />
      <Text style={[styles.itemText, item.checked && styles.checkedText]}>{item.text}</Text>
      <View style={[styles.tag, item.tag === 'Priority' ? styles.priority :
        item.tag === 'Essentials' ? styles.essentials : styles.safety]}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
      {!item.default && (
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#f87171" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        
        {/* Custom Header */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/checklist')} style={{ paddingRight: 8 }}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Ionicons name="shield-checkmark" size={24} color="black" />
          <Text style={styles.headerText}>Checklists</Text>
        </View>



        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Image source={require('../Images/checklistdisease.png')} style={styles.icon} />
          <Text style={styles.sectionHeaderText}>Disease</Text>
          <MaterialIcons name="notifications" size={24} color="white" style={{ marginLeft: 'auto' }} />
          <Ionicons name="volume-medium-outline" size={24} color="white" />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.subHeading}>Preparedness Kit:</Text>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type Here..."
              value={text}
              onChangeText={setText}
              onSubmitEditing={addItem}
            />
            <TouchableOpacity onPress={addItem}>
              <Ionicons name="add-circle-outline" size={24} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.subHeadingRow}>
            <Text style={styles.subHeading}>Precautions:</Text>
            <TouchableOpacity onPress={speakPrecautions} style={{ marginLeft: 8 }}>
              <Ionicons name="volume-high" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.precautionsBox}>
            <Text style={styles.precaution}>1. Wash your hands frequently with soap and water for at least 20 seconds.</Text>
            <Text style={styles.precaution}>2. Wear a mask in crowded or enclosed spaces.</Text>
            <Text style={styles.precaution}>3. Stay at home if you're feeling unwell.</Text>
            <Text style={styles.precaution}>4. Maintain physical distancing of at least 6 feet.</Text>
            <Text style={styles.precaution}>5. Disinfect surfaces that are frequently touched.</Text>
            <Text style={styles.precaution}>6. Monitor symptoms and seek medical help if needed.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'android' ? 25 : 0,
    },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    gap: 8, 
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f77f82', 
    padding: 10,
  },
  icon: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  contentContainer: {
    paddingVertical: 15,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  priority: {
    backgroundColor: '#a3e635',
  },
  essentials: {
    backgroundColor: '#fcd34d',
  },
  safety: {
    backgroundColor: '#f87171',
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  precautionsBox: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  precaution: {
    marginBottom: 5,
  }
});


