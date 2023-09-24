import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CATEGORIES from "../../../config/CATEGORIES";

interface ExploreMenuProps {
  setActiveCategory: any;
  activeCategory: number;
}

function ExploreMenu({ setActiveCategory, activeCategory }: ExploreMenuProps) {
  return (
    <View style={styles.categoryButton}>
      {CATEGORIES.map((category, index) => (
        <TouchableOpacity
          onPress={() => setActiveCategory(index)}
          key={category.id}
          style={[
            activeCategory == index
              ? styles.activeCategory
              : styles.inactiveCategory,
          ]}
        >
          <Text
            style={[
              activeCategory == index ? styles.activeText : styles.inactiveText,
            ]}
          >
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default ExploreMenu;
const styles = StyleSheet.create({
  categoryButton: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFAF87",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },

  activeCategory: {
    backgroundColor: "#FFAF87",
    padding: 5,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveCategory: {
    padding: 5,
    paddingVertical: 10,

    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  activeText: {
    color: "#FFFFFF",
    fontFamily: "Bitter-Bold",
    fontSize: 20,
  },

  inactiveText: {
    color: "#88838A",
    fontFamily: "Bitter-Bold",
    fontSize: 20,
  },
});
