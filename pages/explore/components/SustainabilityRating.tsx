import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "@rneui/themed";
import ICONSIZES from "../../../config/ICONSIZES";
import COLORS from "../../../config/COLORS";
import SPACINGS from "../../../config/SPACINGS";

interface SustainabilityRatingProps {
  numFeatures: number;
}

function QuantityToRating(qty: number) {
  if (qty >= 5) {
    return 3;
  } else if (qty >= 3) {
    return 2;
  } else if (qty >= 1) {
    return 1;
  }
  return 0;
}

export default function SustainabilityRating({
  numFeatures,
}: SustainabilityRatingProps) {
  const rating = QuantityToRating(numFeatures);
  const tempArray: string[] = ["leaf-outline", "leaf-outline", "leaf-outline"];
  for (let i = 0; i < rating; i++) {
    tempArray[i] = "leaf";
  }
  return (
    <View
      style={{
        justifyContent: "flex-end",
        flexDirection: "row",
        marginTop: SPACINGS.SM,
      }}
    >
      {tempArray.map((item, index) => (
        <Icon
          key={index}
          color={COLORS.PRIMARY}
          type="ionicon"
          name={item}
          size={ICONSIZES.SM}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heartButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: SPACINGS.MD,
  },
});
