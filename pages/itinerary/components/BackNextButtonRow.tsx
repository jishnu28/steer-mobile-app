import React from "react";
import { Pressable, View, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";
import H3 from "../../../custom_components/typography/H3";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";
import SPACINGS from "../../../config/SPACINGS";

interface BackNextButtonRowProps {
  style?: ViewStyle;
}
const BackNextButtonRow = ({ style }: BackNextButtonRowProps) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.button}>
        <H3>Back</H3>
      </Pressable>
      <Pressable style={styles.button}>
        <H3>Next</H3>
      </Pressable>
    </View>
  );
};

export default BackNextButtonRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SPACINGS.MD,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACINGS.SM,
    paddingHorizontal: SPACINGS.LG,
    borderRadius: SPACINGS.XL,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
});
