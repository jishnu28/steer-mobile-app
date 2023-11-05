import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CATEGORIES from "../../../config/CATEGORIES";
import SPACING from "../../../config/SPACINGS";

interface ExploreMenuProps {
  updateActiveCategory: any;
  activeCategory: number;
}

function ExploreMenu({
  updateActiveCategory,
  activeCategory,
}: ExploreMenuProps) {
  return (
    <View style={styles.categoryButton}>
      {CATEGORIES.map((category, index) => (
        <TouchableOpacity
          onPress={() => updateActiveCategory(index)}
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
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFAF87",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: SPACING.SM,
  },

  activeCategory: {
    backgroundColor: "#FFAF87",
    padding: 5,
    paddingVertical: 2,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveCategory: {
    padding: 5,
    paddingVertical: 2,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  activeText: {
    color: "#FFFFFF",
    fontFamily: "Bitter-Bold",
    fontSize: 20,
    padding: 5,
  },

  inactiveText: {
    color: "#88838A",
    fontFamily: "Bitter-Bold",
    fontSize: 20,
    padding: 5,
  },
});
