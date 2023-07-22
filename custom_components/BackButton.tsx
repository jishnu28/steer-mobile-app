import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Feather name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: height * 0.08,
    left: width * 0.05,
    width: 48,
    height: 48,
    opacity: 0.75,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
