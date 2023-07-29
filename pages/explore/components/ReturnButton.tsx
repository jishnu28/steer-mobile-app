import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

interface ReturnButtonProps {
  navigation: NativeStackNavigationProp<any>;
}

function ReturnButton({ navigation }: ReturnButtonProps) {
  return (
    <TouchableOpacity
      style={styles.returnButton}
      onPress={() => navigation.goBack()}
    >
      <MaterialIcons name="keyboard-arrow-left" size={35} color="#87848A" />
    </TouchableOpacity>
  );
}

export default ReturnButton;

const styles = StyleSheet.create({
  returnButton: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#87848A",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6EB",
  },
});
