import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import FONTSIZES from "../../config/FONTSIZES";
import COLORS from "../../config/COLORS";

interface H3Props {
  style?: TextStyle;
  children?: React.ReactNode;
}

const H3: React.FC<H3Props> = ({ style, children }) => {
  return <Text style={[styles.bodyText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  bodyText: {
    fontSize: FONTSIZES.LG,
    fontFamily: "Bitter-Bold",
    color: COLORS.DARKBG,
  },
});

export default H3;
