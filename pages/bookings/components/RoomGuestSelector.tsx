import React, { useState } from 'react';
import { Text, Modal, View, StyleSheet, SafeAreaView, Button, TouchableOpacity } from 'react-native';

const RoomGuestSelector: React.FC = () => {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [showRoomsGuestsModal, setShowRoomsGuestsModal] = useState(false);

  const handleRoomsGuestsPress = () => {
    setShowRoomsGuestsModal(true);
  };

  const handleRoomsGuestsModalClose = () => {
    setShowRoomsGuestsModal(false);
  };

  const handleRoomsChange = (value: number) => {
    setRooms(value);
  };

  const handleGuestsChange = (value: number) => {
    setGuests(value);
  };

  return (
    <>
      <TouchableOpacity onPress={handleRoomsGuestsPress}>
        <Text style={styles.headingText}>Rooms and Guests: </Text>
        <Text style={styles.inputText}> {rooms} rooms, {guests} guests</Text>
      </TouchableOpacity>

      <Modal visible={showRoomsGuestsModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.modalText}>Rooms:</Text>
              <TouchableOpacity onPress={() => handleRoomsChange(rooms - 1)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>{rooms}</Text>
              <TouchableOpacity onPress={() => handleRoomsChange(rooms + 1)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.modalText}>Guests:</Text>
              <TouchableOpacity onPress={() => handleGuestsChange(guests - 1)} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>{guests}</Text>
              <TouchableOpacity onPress={() => handleGuestsChange(guests + 1)} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleRoomsGuestsModalClose} style={styles.button}>
              <Text>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align content at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align buttons at both ends
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFAF87',
    padding: 10,
    alignItems: 'center',
    margin: 30,
    borderRadius: 30
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Bitter-Regular",
  },
  headingText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Bitter-Bold',
    paddingLeft: 10,
    padding: 5
  },
  inputText: {
    color: '#FF7733',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Bitter-Regular',
    paddingLeft: 10,
    padding: 5
  },
  modalText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Bitter-Regular',
  },
});

export default RoomGuestSelector;
