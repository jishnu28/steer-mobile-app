import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../../config/COLORS";

interface ExploreItemPanelProps {
  itemTitle: string;
  itemPrice: string;
}

function ExploreItemPanel({ itemTitle, itemPrice }: ExploreItemPanelProps) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{itemTitle} {itemPrice}</Text>
    </View>
  );
}

export default ExploreItemPanel;

const styles = StyleSheet.create({
  description: {
    textAlign: "justify",
    padding: 10,
    fontFamily: "Avenir",
    fontSize: 20,
    color: COLORS.BROWN,
  },

  descriptionContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "15%",
    backgroundColor: COLORS.WHITE,
    alignContent: "center",
    justifyContent: "center",
    bottom: 0,
  },
});
