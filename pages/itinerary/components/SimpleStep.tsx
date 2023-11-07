import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";
import H2 from "../../../custom_components/typography/H2";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";
import SPACINGS from "../../../config/SPACINGS";

interface SimpleStepProps {
  style?: ViewStyle;
  iconName: string;
  heading: string;
  text: string;
}
const SimpleStep = ({ style, iconName, heading, text }: SimpleStepProps) => {
  return (
    <View style={[styles.step, style]}>
      <View style={styles.stepTextContainer}>
        <H2 style={styles.stepHeading}>{heading}</H2>
        <BodyText style={styles.stepText}>{text}</BodyText>
      </View>
      <View style={styles.stepIconContainer}>
        <Icon
          color={COLORS.PRIMARY}
          type="material-community"
          name={iconName}
          size={ICONSIZES.XL}
        />
      </View>
    </View>
  );
};

export default SimpleStep;

const styles = StyleSheet.create({
  step: {
    alignItems: "center",
    flexDirection: "row",
  },
  stepTextContainer: {
    width: "70%",
  },
  stepHeading: {},
  stepText: { marginTop: SPACINGS.XS },
  stepIconContainer: {
    width: "30%",
    alignItems: "flex-end",
    paddingRight: SPACINGS.MD,
  },
});
