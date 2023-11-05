import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import BodyText from "../../../custom_components/typography/BodyText";
import SPACINGS from "../../../config/SPACINGS";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";

interface AmenitiesCardProps {
  iconName: any;
  text: string;
}

const AmenitiesCard = ({ iconName, text }: AmenitiesCardProps) => {
  return (
    <View style={styles.mainContainer}>
      <Icon
        color={COLORS.DARKBG}
        type="material-community"
        name={iconName}
        size={ICONSIZES.SM}
      />
      <BodyText style={styles.text}>{text}</BodyText>
    </View>
  );
};

export default AmenitiesCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "50%",
  },
  text: {
    color: COLORS.DARKBG,
    marginVertical: SPACINGS.MD,
    paddingHorizontal: SPACINGS.SM,
  },
});
