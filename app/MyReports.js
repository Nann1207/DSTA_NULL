import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
  Modal, Pressable, Platform, TouchableWithoutFeedback
} from 'react-native';
import { Ionicons, Feather, FontAwesome6, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyReports() {
  const router = useRouter();
  const [expandOngoing, setExpandOngoing] = useState(true);
  const [expandProcessed, setExpandProcessed] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRange, setSelectedRange] = useState(null);

  const reports = [
    { type: 'Fire', status: 'Ongoing', title: 'Fire Incident', date: '12/06/2025', route: '/OngoingFireIncidentDetail' },
    { type: 'Flood', status: 'Processed', title: 'Flood Report', date: '12/05/2025', route: '/PastFloodReportDetail' },
    { type: 'Fire', status: 'Processed', title: 'Fire Incident', date: '04/03/2025', route: '/PastFireIncidentDetail' },
  ];

  const parseDate = (str) => {
    const [day, month, year] = str.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isWithinDateRange = (reportDateStr) => {
    if (!selectedDate) return true;
    const reportDate = parseDate(reportDateStr);
    return reportDate <= selectedDate;
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || report.type === selectedType;
    const matchesDate = report.status === 'Ongoing' || isWithinDateRange(report.date);
    return matchesSearch && matchesType && matchesDate;
  });

  const applyRange = (days) => {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - days);
    setSelectedDate(pastDate);
    setSelectedRange(days);
    setShowCalendar(false);
  };

  const renderSection = (status, isExpanded, toggleExpand) => {
    const sectionReports = filteredReports.filter(r => r.status === status);
    return (
      <View style={styles.sectionBox}>
        <TouchableOpacity style={styles.sectionTitleRow} onPress={toggleExpand}>
          <FontAwesome6 name={isExpanded ? 'caret-down' : 'caret-right'} size={16} color="#7E2E2E" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>{status}</Text>
        </TouchableOpacity>
        {isExpanded && sectionReports.map((report, index) => (
          <TouchableOpacity key={index} style={styles.reportItem} onPress={() => router.push(report.route)}>
            <View>
              <Text style={styles.reportText}>{report.title}</Text>
              <Text style={styles.reportDate}>{report.date}</Text>
            </View>
            {status === 'Processed' && <Feather name="check" size={20} color="#7E2E2E" />}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={[styles.header, styles.horizontalPadding]}>
          <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
          <Entypo name="clipboard" size={24} color="black" />
          <Text style={styles.headerText}>My Reports</Text>
        </View>
      </View>

      <View style={styles.searchBackground}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="search"
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

      <ScrollView contentContainerStyle={styles.body}>
        {renderSection('Ongoing', expandOngoing, () => setExpandOngoing(!expandOngoing))}
        {renderSection('Processed', expandProcessed, () => setExpandProcessed(!expandProcessed))}
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filter</Text>

                <Text style={styles.modalSectionTitle}>Report Type</Text>
                <View style={styles.chipGroup}>
                  {['All', 'Fire', 'Flood'].map((type) => (
                    <Pressable
                      key={type}
                      style={[styles.chip, selectedType === type && styles.chipSelected]}
                      onPress={() => setSelectedType(type)}
                    >
                      <Text>{type}</Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.modalSectionTitle}>Date Range</Text>
                <View style={styles.chipGroup}>
                  <Pressable onPress={() => applyRange(7)} style={[styles.chip, selectedRange === 7 && styles.chipSelected]}>
                    <Text>Past 7 days</Text>
                  </Pressable>
                  <Pressable onPress={() => applyRange(30)} style={[styles.chip, selectedRange === 30 && styles.chipSelected]}>
                    <Text>Past 30 days</Text>
                  </Pressable>
                  <Pressable onPress={() => applyRange(180)} style={[styles.chip, selectedRange === 180 && styles.chipSelected]}>
                    <Text>Past 6 months</Text>
                  </Pressable>
                  <Pressable onPress={() => applyRange(365)} style={[styles.chip, selectedRange === 365 && styles.chipSelected]}>
                    <Text>Past year</Text>
                  </Pressable>
                  <Pressable onPress={() => {
                    setSelectedDate(null);
                    setSelectedRange(null);
                  }} style={[styles.chip, selectedRange === null && styles.chipSelected]}>
                    <Text>All</Text>
                  </Pressable>
                </View>

                <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.dateSelector}>
                  <Feather name="calendar" size={16} color="#7E2E2E" />
                  <Text style={{ marginLeft: 8 }}>{selectedDate ? formatDate(selectedDate) : 'Select Date'}</Text>
                </TouchableOpacity>

                {showCalendar && (
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowCalendar(false);
                      if (date) setSelectedDate(date);
                    }}
                  />
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={[styles.applyButton, { backgroundColor: '#aaa' }]}
                    onPress={() => {
                      setSelectedDate(null);
                      setSelectedType('All');
                      setShowModal(false);
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  horizontalPadding: { paddingHorizontal: 16 },
  headerContainer: {
    backgroundColor: '#F5F5FA',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 70, 
    marginBottom: 10, 
    gap: 8,
  },
  headerText: { fontSize: 20, fontWeight: '600' },
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
  searchInput: { flex: 1, fontSize: 14, color: '#000' },
  filterIcon: { marginLeft: 8 },
  body: { gap: 15, paddingBottom: 30 },
  sectionBox: {
    backgroundColor: '#EDDFDF',
    borderRadius: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#7E2E2E' },
  reportItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    paddingLeft: 25,
    borderRadius: 1,
    marginHorizontal: -15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportText: { fontSize: 14, color: '#000' },
  reportDate: { fontSize: 12, color: '#777' },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, maxHeight: '70%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalSectionTitle: { fontWeight: '600', marginTop: 10, marginBottom: 6 },
  chipGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  chip: {
    paddingHorizontal: 12, 
    paddingVertical: 6,
    backgroundColor: '#eee', 
    borderRadius: 16,
  },
  chipSelected: {
    backgroundColor: '#F5A6A6',
    borderWidth: 1,
    borderColor: '#B95C5C',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#B95C5C',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
});