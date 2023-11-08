import React, { useState } from "react";
import { Pressable, View, StyleSheet, ViewStyle } from "react-native";
import COLORS from "../../../config/COLORS";
import SPACINGS from "../../../config/SPACINGS";
import BodyText from "../../../custom_components/typography/BodyText";

interface PairOptionsProps {
  style?: ViewStyle;
  leftOption: string;
  rightOption: string;
  onOptionSelected: (option: string) => void;
}
const PairOptions = ({
  style,
  leftOption,
  rightOption,
  onOptionSelected,
}: PairOptionsProps) => {
  const [leftSelected, setLeftSelected] = useState<boolean>(false);
  const [rightSelected, setRightSelected] = useState<boolean>(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.button,
          leftSelected
            ? { borderWidth: 2, borderColor: COLORS.PRIMARY }
            : { borderWidth: 0, borderColor: COLORS.LIGHTACCENT },
        ]}
        onPress={() => {
          onOptionSelected(leftOption);
          setLeftSelected(true);
          setRightSelected(false);
        }}
      >
        <BodyText style={styles.buttonText}>{leftOption}</BodyText>
      </Pressable>
      <BodyText>or</BodyText>
      <Pressable
        style={[
          styles.button,
          rightSelected
            ? { borderWidth: 2, borderColor: COLORS.PRIMARY }
            : { borderWidth: 0, borderColor: COLORS.LIGHTACCENT },
        ]}
        onPress={() => {
          onOptionSelected(rightOption);
          setLeftSelected(false);
          setRightSelected(true);
        }}
      >
        <BodyText style={styles.buttonText}>{rightOption}</BodyText>
      </Pressable>
    </View>
  );
};

export default PairOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    width: "33%",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    padding: SPACINGS.MD,
    borderWidth: 2,
    borderColor: COLORS.LIGHTACCENT,
    borderRadius: SPACINGS.XL,
    margin: SPACINGS.SM,
  },
  buttonText: {
    textAlign: "center",
  },
});
