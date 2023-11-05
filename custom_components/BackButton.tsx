import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import COLORS from "../config/COLORS";
import ICONSIZES from "../config/ICONSIZES";

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Feather name="arrow-left" size={ICONSIZES.XS} color={COLORS.PRIMARY} />
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: height * 0.08,
    left: width * 0.05,
    width: ICONSIZES.XL,
    height: ICONSIZES.XL,
    opacity: 0.75,
    borderRadius: ICONSIZES.XS,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
