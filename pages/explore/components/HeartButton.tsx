import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HeartButton() {
  return (
    <TouchableOpacity
      // TODO: implement feature to save the liked experience to a database
      onPress={() => console.log("Favorited, to be implemented")}
      style={styles.heartButton}
    >
      <MaterialCommunityIcons name="heart" size={40} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

export default HeartButton;

const styles = StyleSheet.create({
  heartButton: {
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 5,
    alignSelf: "flex-end",
    backgroundColor: "#E5E8D9",
  },
});
