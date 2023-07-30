import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import COLORS from "../../../config/COLORS";

function ChatButton() {
  return (
      <TouchableOpacity 
        onPress={() => console.log('Favorited, to be implemented')}
        style={styles.heartButton}>
        <Ionicons name="chatbubble-ellipses-outline" size={45} color="black" />
      </TouchableOpacity>
  );
}

export default ChatButton;

const styles = StyleSheet.create({
  heartButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 100,
    height: 60,
    width: 60,
    padding: 8,
    alignSelf: "flex-end",
  },
});