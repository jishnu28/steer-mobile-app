import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../../config/COLORS";

interface ItemDesPanelProps {
  itemTitle: string;
  itemPrice: string;
}

function ItemDesPanel({ itemTitle, itemPrice }: ItemDesPanelProps) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>
        {" "}
        {itemTitle} {itemPrice}{" "}
      </Text>
    </View>
  );
}

export default ItemDesPanel;

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
