import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    <View>
      <View
      style={styles.categoryButton}>
        {CATEGORIES.map((category, index) => (
          <TouchableOpacity
            onPress={() => updateActiveCategory(index)}
            style={[
              activeCategory == index
                ? styles.activeCategory
                : styles.inactiveCategory
            ]}
          >
            <Text>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default ExploreMenu;
const styles = StyleSheet.create({
  categoryButton: {
    height: 44, 
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFAF87',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },

  activeCategory: {
    color: "#FFFFFF",
    fontFamily: "Bitter-Bold",
    fontSize: 20,
    backgroundColor: "#FFAF87",

    padding: 5,
    paddingVertical: 10,

    borderRadius: 20, 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  inactiveCategory: {
    color: "#88838A",
    fontFamily: "Bitter-Bold",
    fontSize: 20,

    padding: 5,
    paddingVertical: 10,

    borderRadius: 20, 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
