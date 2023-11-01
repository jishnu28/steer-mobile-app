import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import DateSelection from './DateSelection';
import RoomGuestSelector from './RoomGuestSelector';
import BookingButton from './BookButton';

const BookingCard: React.FC = () => {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [showRoomsGuestsModal, setShowRoomsGuestsModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const fetchTotalPrice = async () => {
    //to implement logic to fetch prices from database
  };
  
  // useEffect(() => {
  //   // Fetch the total price when the component mounts (you can trigger it based on your requirements)
  //   fetchTotalPrice();
  // }, []);

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

  const handleReservePress = () => {
    // to implement reservation logic 
  };


  return (
    <SafeAreaView style={styles.container}>
      <DateSelection/>
      <RoomGuestSelector/>
      <Text style={styles.headingText}>Total Price: </Text>
      <Text style={styles.totalPriceText}> ${totalPrice}</Text>
      <BookingButton/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: "#F8FAF0",
    borderRadius: 30
  },

  totalPriceText: {
    color: "#FF7733",
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Bitter-Regular",
    paddingLeft: 10,
    padding: 5
  },
  headingText: {
    color: "black",
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Bitter-Bold",
    paddingLeft: 10,
    padding: 5
  },
  // Add more styles as needed
});

export default BookingCard;
