import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import DateSelection from './DateSelection';
import RoomGuestSelector from './RoomGuestSelector';

const SearchBar = () => {
  const [searchText, setDestinationText] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [showRoomsGuestsModal, setShowRoomsGuestsModal] = useState(false);

  const handleDestinationSearch = (text: string) => {
    setDestinationText(text);
    // Perform search logic here
  };

  return (
    <View style={styles.searchBarContainer}>
      {/* Location */}
      <View style={styles.fieldContainer}>
        <Text style={styles.searchText}>Destination: </Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleDestinationSearch}
        />
      </View>

      {/* Date */}
      <View style={styles.fieldContainer}>
        <TouchableOpacity onPress={() => setShowDateModal(true)}>
          <Text style={styles.searchText}>Date:</Text>
        </TouchableOpacity>
      </View>

      {/* Rooms & Guests */}
      <View style={styles.fieldContainer}>
        <TouchableOpacity onPress={() => setShowRoomsGuestsModal(true)}>
          <Text style={styles.searchText}>Rooms & Guests:</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <Modal visible={showDateModal} transparent={true} animationType="slide">
        <View style={styles.modalContent}>
          <DateSelection />
          <TouchableOpacity onPress={() => setShowDateModal(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showRoomsGuestsModal} transparent={true} animationType="slide">
        <View style={styles.modalContent}>
          <RoomGuestSelector />
          <TouchableOpacity onPress={() => setShowRoomsGuestsModal(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "column", 
    paddingHorizontal: 30,
    paddingTop: 16,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 30
  },
  fieldContainer: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "white",
    height: 45,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flex: 1,
  },
  searchText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    padding: 10,
  },
});

export default SearchBar;
