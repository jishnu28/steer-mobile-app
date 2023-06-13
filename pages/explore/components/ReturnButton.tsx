import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import COLORS from "../../../config/COLORS";

interface ReturnButtonProps {
  navigation: NativeStackNavigationProp<any>;
}

function ReturnButton({ navigation }: ReturnButtonProps) {
  return (
    <TouchableOpacity
      style={styles.returnButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back-outline" size={40} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
}

export default ReturnButton;

const styles = StyleSheet.create({
  returnButton: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 5,
    alignSelf: "flex-end",
  },
});
