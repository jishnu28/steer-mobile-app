import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import FONTSIZES from "../../config/FONTSIZES";

interface H1Props {
  style?: TextStyle;
  children?: React.ReactNode;
}

const H1: React.FC<H1Props> = ({ style, children }) => {
  return <Text style={[styles.bodyText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  bodyText: {
    fontSize: FONTSIZES.XXL,
    fontFamily: "Bitter-Black",
  },
});

export default H1;
