import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import FONTSIZES from "../../config/FONTSIZES";

interface BodyTextProps {
  style?: TextStyle;
  children?: React.ReactNode;
}

const BodyText: React.FC<BodyTextProps> = ({ style, children }) => {
  return <Text style={[styles.bodyText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  bodyText: {
    fontSize: FONTSIZES.SM,
    fontFamily: "Bitter-Regular",
    letterSpacing: 0.2,
    lineHeight: FONTSIZES.LG,
  },
});

export default BodyText;
