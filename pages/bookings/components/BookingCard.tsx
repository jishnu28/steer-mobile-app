import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import DateSelection from './DateSelection';
import RoomGuestSelector from './RoomGuestSelector';
import BookButton from './BookButton';

const BookingCard: React.FC = () => {

  const [totalPrice, setTotalPrice] = useState(0);

  const fetchTotalPrice = async () => {
    //to implement logic to fetch prices from database
  };
  
  // useEffect(() => {
  //   // Fetch the total price when the component mounts (you can trigger it based on your requirements)
  //   fetchTotalPrice();
  // }, []);


  return (
    <SafeAreaView style={styles.container}>
      <DateSelection/>
      <RoomGuestSelector/>
      <Text style={styles.headingText}>Total Price: </Text>
      <Text style={styles.totalPriceText}> ${totalPrice}</Text>
      <BookButton/>
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
});

export default BookingCard;
