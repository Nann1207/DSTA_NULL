import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const defaultItems = [
    { id: '1', text: 'Stay indoors and avoid high-risk areas', tag: 'Priority', checked: false, default: true },
    { id: '2', text: 'Contact family members to ensure everyone is safe', tag: 'Priority', checked: false, default: true },
    { id: '3', text: 'Follow official news and emergency broadcasts', tag: 'Safety', checked: false, default: true }
  ];

  const [items, setItems] = useState(defaultItems);
  const [text, setText] = useState('');
  const [activeBottomTab, setActiveBottomTab] = useState('Checklist');

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
      "War Crisis Precautions: " +
      "1. Stay indoors and avoid high-risk areas " +
      "2. Contact family members to ensure everyone is safe " +
      "3. Follow official news and emergency broadcasts " +
      "4. Stay prepared for evacuation and emergency responses";
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
                   item.tag === 'Safety' ? styles.safety : styles.essentials]}>
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
      
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/checklist')} style={{ paddingRight: 8 }}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Ionicons name="shield-checkmark" size={24} color="black" />
          <Text style={styles.headerText}>Checklists</Text>
        </View>
        



        <View style={styles.sectionHeader}>
          <Image source={require('../Images/checklistwar.png')} style={styles.icon} />
          <Text style={styles.sectionHeaderText}>War Crisis</Text>
          <MaterialIcons name="notifications" size={24} color="white" style={{ marginLeft: 'auto' }} />
          <Ionicons name="volume-medium-outline" size={24} color="white" />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.subHeading}>To Do:</Text>
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
            <TouchableOpacity onPress={() => speakPrecautions()} style={{ marginLeft: 8 }}>
              <Ionicons name="volume-high" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.precautionsBox}>
            <Text style={styles.precaution}>1. Stay indoors and avoid high-risk areas</Text>
            <Text style={styles.precaution}>2. Contact family members to ensure everyone is safe</Text>
            <Text style={styles.precaution}>3. Follow official news and emergency broadcasts</Text>
            <Text style={styles.precaution}>4. Stay prepared for evacuation and emergency responses</Text>
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
    padding: 15,
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
  },
});