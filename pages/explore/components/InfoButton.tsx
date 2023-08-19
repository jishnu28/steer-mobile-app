import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InfoButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <MaterialCommunityIcons
        name="information-outline"
        size={24}
        color="black"
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
    width: 48,
    height: 48,
    opacity: 0.75,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoButton;
