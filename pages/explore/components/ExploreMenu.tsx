import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CATEGORIES from "../../../config/CATEGORIES";
import SPACING from "../../../config/SPACINGS";
import SPACINGS from "../../../config/SPACINGS";
import COLORS from "../../../config/COLORS";
import FONTSIZES from "../../../config/FONTSIZES";
import ICONSIZES from "../../../config/ICONSIZES";

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
    height: ICONSIZES.XL,
    backgroundColor: COLORS.LIGHTACCENT,
    borderRadius: SPACINGS.XL,
    borderWidth: 0,
    borderColor: COLORS.PRIMARY,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  activeCategory: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACINGS.SM,
    paddingVertical: SPACINGS.XXS,
    borderRadius: SPACINGS.LG,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveCategory: {
    padding: SPACINGS.SM,
    paddingVertical: SPACINGS.XXS,
    borderRadius: SPACINGS.LG,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  activeText: {
    color: COLORS.WHITE,
    fontFamily: "Bitter-Bold",
    fontSize: FONTSIZES.MD,
    padding: SPACINGS.SM,
  },

  inactiveText: {
    color: COLORS.DARKBG,
    fontFamily: "Bitter-Bold",
    fontSize: FONTSIZES.MD,
    padding: SPACINGS.SM,
  },
});
