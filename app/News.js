import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView,
  TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback
} from 'react-native';
import {
  Feather, Ionicons, SimpleLineIcons, FontAwesome5, FontAwesome6,
  MaterialIcons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const NEIGHBORHOODS = ["Ang Mo Kio", "Bedok", "Bishan", "Bukit Batok", "Bukit Merah", "Bukit Panjang",
  "Bukit Timah", "Central Area", "Choa Chu Kang", "Clementi", "Geylang", "Hougang",
  "Jurong East", "Jurong West", "Kallang", "Marine Parade", "Novena", "Pasir Ris",
  "Punggol", "Queenstown", "Sembawang", "Sengkang", "Serangoon", "Tampines",
  "Toa Payoh", "Woodlands", "Yishun"];

const EVENT_TYPES = ['Accidents', 'Covid', 'Diseases', 'Extreme Weather', 'Fires', 'Floods', 'Natural Disasters', 'Terrorism', 'Violence'];

function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push('/home')} style={{ paddingRight: 8 }}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
}


export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [expandNeighborhoods, setExpandNeighborhoods] = useState(true);
  const [expandEventTypes, setExpandEventTypes] = useState(true);

  const toggleFilter = (set, values, value) => {
    if (values.includes(value)) {
      set(values.filter(v => v !== value));
    } else {
      set([...values, value]);
    }
  };

  const clearFilters = () => {
    setSelectedNeighborhoods([]);
    setSelectedEventTypes([]);
  };

  const allNews = [
    {
      title: 'HIGH ALERT ADVISORY',
      time: 'Updated at 9.30pm 12 June 2025',
      description: 'The undersea volcano in the Southeast Asia Sea has erupted, triggering a series of earthquakes and prompting a tsunami alert for coastal regions surrounding Singapore. The tsunami is expected to hit within the next few hours, and residents are advised to remain on high alert and follow official safety instructions.',
      neighborhood: 'Pasir Ris',
      type: 'Natural Disasters',
      highlight: true
    },
    {
      title: 'HIGH ALERT ADVISORY',
      time: 'Updated at 11.17pm 20 May 2025',
      description: 'A 6.4 magnitude earthquake was detected in Near North Coast of Papua New Guinea, approximately 4589km E of Singapore or 478 km ESE of Jayapura at 11.06 pm (Singapore Time) on 20 May 2025. No reports of tremors. Nil tsunami advisory.',
      neighborhood: 'Pasir Ris',
      type: 'Natural Disasters',
      highlight: true
    },
    {
      title: 'COVID-19 Update',
      time: 'Reported on 13 May 2025',
      description: 'In the week of 27 April to 3 May 2025, the cases rose to 14,200 cases.',
      neighborhood: 'Bukit Batok',
      type: 'Covid',
      covid: true
    },
    {
      title: 'Dengue cases in Ang Mo Kio rise',
      time: 'Reported on 20 May 2025',
      description: 'In the week of 17 May 2025, there are 106 dengue cases and 16 active dengue clusters as of 19 May 2025.',
      neighborhood: 'Ang Mo Kio',
      type: 'Diseases',
      diseases: true
    },
    {
      title: 'Flooding in Bukit Timah',
      description: 'Flash flood detected in multiple locations. Avoid area if possible. Issued 12:31hrs.',
      neighborhood: 'Bukit Timah',
      type: 'Floods',
      flood: true
    },
    {
    title: 'Norovirus Outbreak in Tampines Daycare',
    time: 'Reported on 12 February 2025',
    description: 'Several children fell ill with vomiting and diarrhea. Health authorities are conducting deep cleaning in the facility.',
    neighborhood: 'Tampines',
    type: 'Diseases',
    diseases: true
  },
  {
    title: 'Fire at Serangoon Hawker Centre',
    time: 'Reported on 14 February 2025',
    description: 'Small stall fire quickly extinguished by stall owners before SCDF arrived. Likely due to unattended stove.',
    neighborhood: 'Serangoon',
    type: 'Fires',
    fires: true
  },
  {
      title: 'COVID-19 Outbreak in Hougang',
      description: 'Vaccination remains effective in protecting against severe illness. Wear mask and practice safe distancing.',
      neighborhood: 'Hougang',
      type: 'Covid',
      covid: true
    },
  {
    title: 'False Bomb Threat Causes Panic at Bugis',
    time: 'Reported on 26 February 2025',
    description: 'Bugis Junction temporarily evacuated due to anonymous bomb threat. It was later confirmed as a hoax.',
    neighborhood: 'Bugis',
    type: 'Terrorism',
    terrorism: true
  },
  {
    title: 'UV Index Reaches Very High in Kallang',
    time: 'Reported on 19 March 2025',
    description: 'NEA reported UV index reaching 11 in Kallang around noon. Residents advised to wear sunscreen and limit sun exposure.',
    neighborhood: 'Kallang',
    type: 'Extreme Weather',
    extremeWeather: true
  },
  {
    title: 'Volcanic Ash Advisory for East Region',
    time: 'Reported on 18 March 2025',
    description: 'Ash from Mount Semeru’s eruption in Java expected to drift near Singapore’s eastern airspace. Low impact.',
    neighborhood: 'Pasir Ris',
    type: 'Natural Disasters',
    naturalDisaster: true
  },
  {
    title: 'Minor Tremor Felt in Central Area',
    time: 'Reported on 2 April 2025',
    description: 'Tremor detected originating from a quake near Indonesia. No damage reported in Singapore.',
    neighborhood: 'Central Area',
    type: 'Natural Disasters',
    naturalDisaster: true
  },
  {
    title: 'Strong Winds Dislodge Trees in Hougang',
    time: 'Reported on 8 April 2025',
    description: 'Several trees fell along Avenue 2 due to unexpected gusts. No injuries reported, roads cleared by afternoon.',
    neighborhood: 'Hougang',
    type: 'Extreme Weather',
    extremeWeather: true
  },
  {
    title: 'Youth Arrested After Gang Fight in Toa Payoh',
    time: 'Reported on 11 April 2025',
    description: 'Several youths were involved in a late-night gang fight. Police are investigating links to prior incidents.',
    neighborhood: 'Toa Payoh',
    type: 'Violence',
    violence: true
  },
  {
    title: 'Suspicious Package Investigated at Clarke Quay',
    time: 'Reported on 13 April 2025',
    description: 'Police detonated an unattended bag outside Clarke Quay MRT. Declared non-threatening after inspection.',
    neighborhood: 'Central Area',
    type: 'Terrorism',
    terrorism: true
  },
  {
    title: 'Spike in Chickenpox Infections in Bukit Merah',
    time: 'Reported on 25 April 2025',
    description: 'Bukit Merah Polyclinic reports over 50 cases of chickenpox in April. Affected students advised to rest at home.',
    neighborhood: 'Bukit Merah',
    type: 'Diseases',
    diseases: true
  },
  {
    title: 'Heatwave Alert Issued for Sembawang',
    time: 'Reported on 3 May 2025',
    description: 'Temperatures in Sembawang hit a high of 36.8°C. Public advised to stay hydrated and avoid strenuous activity outdoors.',
    neighborhood: 'Sembawang',
    type: 'Extreme Weather',
    extremeWeather: true
  },
  {
    title: 'Rise in Hand, Foot, and Mouth Disease Cases',
    time: 'Reported on 18 May 2025',
    description: 'Punggol clinics report a 23% increase in HFMD cases over the past month. Parents advised to monitor hygiene practices.',
    neighborhood: 'Punggol',
    type: 'Diseases',
    diseases: true
  },
  {
    title: 'Tampines Street 21 Experiences Water Ponding',
    time: 'Reported on 20 May 2025',
    description: 'Residents reported water rising to ankle-height during evening rains. No injuries reported.',
    neighborhood: 'Tampines',
    type: 'Floods',
    flood: true
  },
  {
    title: 'Knife Incident at Ang Mo Kio Wet Market',
    time: 'Reported on 21 May 2025',
    description: 'Stall vendor threatened another with a knife over a price dispute. No injuries sustained.',
    neighborhood: 'Ang Mo Kio',
    type: 'Violence',
    violence: true
  },
  {
    title: 'Flash Flood in Bukit Timah Tunnel',
    time: 'Reported on 1 June 2025',
    description: 'Heavy rain caused waterlogging in the tunnel. Traffic diverted for 2 hours.',
    neighborhood: 'Bukit Timah',
    type: 'Floods',
    flood: true
  },
  {
    title: 'Car Collision Near Jurong East MRT',
    time: 'Reported on 2 June 2025',
    description: 'A 3-vehicle collision occurred near Jurong East MRT around 8:45 AM. No fatalities, but 2 injured sent to Ng Teng Fong Hospital.',
    neighborhood: 'Jurong East',
    type: 'Accidents',
    accidents: true
  },
  {
    title: 'Fight Breaks Out at Clementi MRT',
    time: 'Reported on 3 June 2025',
    description: '2 men got into a physical altercation on Platform B. Both arrested on site.',
    neighborhood: 'Clementi',
    type: 'Violence',
    violence: true
  },
  {
    title: 'Increased Patrols at Changi Following Alert',
    time: 'Reported on 9 May 2025',
    description: 'Security presence ramped up in Changi after vague overseas intelligence warning. No incident reported.',
    neighborhood: 'Changi',
    type: 'Terrorism',
    terrorism: true
  },
  {
    title: 'Lorry Tipped Over in Yishun',
    time: 'Reported on 26 May 2025',
    description: 'A lorry transporting construction materials tipped over due to a sharp turn at Yishun Ring Road. Clean-up completed after 3 hours.',
    neighborhood: 'Yishun',
    type: 'Accidents',
    accidents: true
  },
  {
    title: 'Fire Breaks Out in Bukit Panjang Flat',
    time: 'Reported on 27 May 2025',
    description: 'SCDF responded to a kitchen fire in Block 271. One resident treated for smoke inhalation.',
    neighborhood: 'Bukit Panjang',
    type: 'Fires',
    fires: true
  },
  {
    title: 'Earthquake Near Papua Felt in Queenstown',
    time: 'Reported on 29 May 2025',
    description: 'A magnitude 5.9 quake near Papua registered on sensors. No felt impact reported by residents.',
    neighborhood: 'Queenstown',
    type: 'Natural Disasters',
    naturalDisaster: true
  },
  {
    title: 'Marine Parade Underpass Flooding',
    time: 'Reported on 10 March 2025',
    description: 'Drain blockage caused minor flooding. PUB has since cleared debris and restored normal flow.',
    neighborhood: 'Marine Parade',
    type: 'Floods',
    flood: true
  },
  {
    title: 'Car Catches Fire in Geylang',
    time: 'Reported on 6 April 2025',
    description: 'A parked vehicle spontaneously combusted outside Geylang Lorong 8. No injuries reported.',
    neighborhood: 'Geylang',
    type: 'Fires',
    fires: true
  },
  {
    title: 'Cyclist Hit by Car in Bedok',
    time: 'Reported on 5 March 2025',
    description: 'A 29-year-old cyclist was hit by a sedan along Bedok South Avenue 3. Investigation is ongoing.',
    neighborhood: 'Bedok',
    type: 'Accidents',
    accidents: true
  }
  ];

  const highlightMatch = (text, query) => {
    if (!query) return <Text>{text}</Text>;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <Text key={index} style={{ backgroundColor: 'yellow' }}>{part}</Text> : <Text key={index}>{part}</Text>
    );
  };

  const filteredNews = allNews.filter(item => {
    const searchMatch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

    const neighborhoodMatch =
      selectedNeighborhoods.length === 0 || selectedNeighborhoods.includes(item.neighborhood);
    const typeMatch =
      selectedEventTypes.length === 0 || selectedEventTypes.includes(item.type);

    return searchMatch && neighborhoodMatch && typeMatch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Fixed Header and Search */}
      <View style={styles.headerContainer}>
        <View style={[styles.header, styles.horizontalPadding]}>
          <BackButton />
          <MaterialCommunityIcons name="alarm-light-outline" size={24} color="#000" />
          <Text style={styles.headerText}>News</Text>
        </View>
      </View>
      <View style={styles.searchBackground}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Feather name="filter" size={18} color="#000" style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={[styles.container, styles.horizontalPadding]}>
        {filteredNews.map((item, index) => (
          <NewsCard key={index} {...item} searchQuery={searchQuery} />
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <Pressable style={styles.modalOverlay} onPress={() => setShowModal(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <Text style={styles.modalTitle}>Filter</Text>

                <TouchableOpacity onPress={clearFilters}>
                  <Text style={{ color: '#B95C5C', fontWeight: '600', marginBottom: 10 }}>Clear Filters</Text>
                </TouchableOpacity>

                {/* Neighborhood Filter */}
                <TouchableOpacity onPress={() => setExpandNeighborhoods(!expandNeighborhoods)}>
                  <Text style={styles.modalSectionTitle}>
                    Neighborhoods {expandNeighborhoods ? '▾' : '▸'}
                  </Text>
                </TouchableOpacity>
                {expandNeighborhoods && (
                  <View style={styles.chipGroup}>
                    {NEIGHBORHOODS.map((name, i) => (
                      <Pressable
                        key={i}
                        style={[
                          styles.chip,
                          selectedNeighborhoods.includes(name) && styles.chipSelected
                        ]}
                        onPress={() => toggleFilter(setSelectedNeighborhoods, selectedNeighborhoods, name)}
                      >
                        <Text>{name}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                {/* Event Types Filter */}
                <TouchableOpacity onPress={() => setExpandEventTypes(!expandEventTypes)}>
                  <Text style={styles.modalSectionTitle}>
                    Event Types {expandEventTypes ? '▾' : '▸'}
                  </Text>
                </TouchableOpacity>
                {expandEventTypes && (
                  <View style={styles.chipGroup}>
                    {EVENT_TYPES.map((type, i) => (
                      <Pressable
                        key={i}
                        style={[
                          styles.chip,
                          selectedEventTypes.includes(type) && styles.chipSelected
                        ]}
                        onPress={() => toggleFilter(setSelectedEventTypes, selectedEventTypes, type)}
                      >
                        <Text>{type}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply Filters</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
}

function NewsCard({ title, description, time, highlight, covid, diseases, flood, accidents, extremeWeather, violence, fires, naturalDisaster, terrorism, searchQuery }) {
  let Icon = () => <Feather name={highlight ? 'alert-triangle' : 'info'} size={16} color={highlight ? '#D80000' : '#555'} />;
  if (covid) Icon = () => <MaterialCommunityIcons name="face-mask-outline" size={24} color="black" />;
  if (diseases) Icon = () => <MaterialCommunityIcons name="bacteria-outline" size={24} color="black" />;
  if (flood) Icon = () => <MaterialIcons name="flood" size={24} color="black" />;
  if (accidents) Icon = () => <FontAwesome5 name="car-crash" size={24} color="black" />;
  if (extremeWeather) Icon = () => <FontAwesome6 name="tornado" size={24} color="black" />;
  if (fires) Icon = () => <SimpleLineIcons name="fire" size={24} color="black" />;
  if (naturalDisaster) Icon = () => <MaterialIcons name="volcano" size={24} color="black" />;
  if (terrorism) Icon = () => <MaterialCommunityIcons name="emoticon-devil-outline" size={24} color="black" />;
  if (violence) Icon = () => <MaterialCommunityIcons name="knife-military" size={24} color="black" />;

  const highlightMatch = (text) => {
    if (!searchQuery) return <Text>{text}</Text>;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <Text key={i} style={{ backgroundColor: 'yellow' }}>{part}</Text>
        : <Text key={i}>{part}</Text>
    );
  };

  return (
    <TouchableOpacity>
      <View style={[styles.card, highlight && styles.highlightCard]}>
        <View style={styles.cardHeader}>
          <Icon />
          <Text style={[styles.cardTitle, highlight && styles.highlightText]}>
            {highlightMatch(title)}
          </Text>
        </View>
        {time && <Text style={styles.cardTime}>[{time}]</Text>}
        <Text style={styles.cardDescription}>{highlightMatch(description)}</Text>
        <Text style={styles.readMore}>Read More</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  horizontalPadding: { paddingHorizontal: 16 },
  container: { 
    paddingBottom: 26, 
    backgroundColor: '#fff' 
  },
  headerContainer: {
    backgroundColor: '#F5F5FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    gap: 8,
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: '600' 
  },
  searchBackground: {
    backgroundColor: '#F5A6A6', 
    borderRadius: 2, 
    paddingHorizontal: 30, 
    paddingVertical: 15,
    marginBottom: 20, 
    marginHorizontal: -16, 
    shadowColor: '#000', 
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 4, 
    elevation: 3,
  },
  searchContainer: {
    backgroundColor: '#fff', 
    borderRadius: 16, 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 12, 
    paddingVertical: 5,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { 
    flex: 1, 
    fontSize: 14, 
    color: '#000' },
  filterIcon: { marginLeft: 8 },
  card: {
    backgroundColor: '#FFF4F4', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 14,
  },
  highlightCard: { 
    borderColor: '#CB9F9F', 
    borderWidth: 1.5 
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginBottom: 4 
  },
  cardTitle: { 
    fontWeight: '600', 
    fontSize: 14 
  },
  highlightText: { color: '#D80000' },
  cardTime: { 
    fontSize: 12, 
    color: '#555', 
    marginBottom: 4 
  },
  cardDescription: { 
    fontSize: 13, 
    color: '#333', 
    marginBottom: 6 
  },
  readMore: { 
    alignSelf: 'flex-end', 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#810D0D' 
  },

  modalOverlay: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: '#fff', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20, 
    maxHeight: '80%',
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  modalSectionTitle: { 
    fontWeight: '600', 
    marginTop: 10, 
    marginBottom: 6 
  },
  chipGroup: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  chip: {
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    backgroundColor: '#eee',
    borderRadius: 16, 
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#F5A6A6', 
    borderWidth: 1, 
    borderColor: '#B95C5C'
  },
  applyButton: {
    marginTop: 20, 
    backgroundColor: '#B95C5C', 
    paddingVertical: 10,
    borderRadius: 10, 
    alignItems: 'center'
  }
});
