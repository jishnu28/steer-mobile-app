import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ICONSIZES from "../../../config/ICONSIZES";
import COLORS from "../../../config/COLORS";

interface InfoButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <MaterialCommunityIcons
        name="information-outline"
        size={ICONSIZES.XS}
        color={COLORS.PRIMARY}
      />
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: height * 0.08,
    right: width * 0.05,
    width: ICONSIZES.XL,
    height: ICONSIZES.XL,
    opacity: 0.75,
    borderRadius: ICONSIZES.XS,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoButton;
