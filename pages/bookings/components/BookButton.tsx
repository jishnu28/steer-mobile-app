import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';


const BookButton: React.FC = () => {

  const handleReservePress = () => {
    // to implement reservation logic
  };

  return (
    <>
      <TouchableOpacity onPress={handleReservePress}>
        <View style={styles.button}> 
            <Text style={styles.buttonText}>Reserve</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFAF87',
        padding: 10,
        paddingLeft:50,
        paddingRight:50,
        alignItems: 'center',
        margin: 30,
        borderRadius: 30
      },
      buttonText: {
        color: "black",
        fontSize: 20,
        fontFamily: "Bitter-Regular",
      },
});

export default BookButton;
