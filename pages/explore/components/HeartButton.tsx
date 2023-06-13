import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import COLORS from "../../../config/COLORS";

function HeartButton() {
  return (
      <TouchableOpacity style={styles.heartButton}>
        <Ionicons name="heart" size={40} color={COLORS.WHITE} />
      </TouchableOpacity>
  );
}

export default HeartButton;

const styles = StyleSheet.create({
  heartButton: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 5,
    alignSelf: "flex-end",
  },
});
