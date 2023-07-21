import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CATEGORIES from "../../../config/CATEGORIES";

interface ExploreMenuProps {
  updateActiveCategory: any;
  activeCategory: number;
}

function ExploreMenu({
  updateActiveCategory,
  activeCategory,
}: ExploreMenuProps) {
  return (
    <ScrollView horizontal>
      {CATEGORIES.map((category, index) => (
        <TouchableOpacity
          onPress={() => updateActiveCategory(index)}
          style={{ marginRight: 10 }}
          key={category.id}
        >
          <Text
            style={[
              activeCategory == index
                ? styles.activeCategory
                : styles.inactiveCategory,
            ]}
          >
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default ExploreMenu;
const styles = StyleSheet.create({
  activeCategory: {
    color: "#FFAF87",
    fontSize: 18,
    fontWeight: "800",
    textDecorationLine: "underline",
  },

  inactiveCategory: {
    color: "#88838A",
    fontSize: 18,
    fontWeight: "800",
  },
});
