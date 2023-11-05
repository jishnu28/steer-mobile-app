import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";
import SPACINGS from "../../../config/SPACINGS";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
    // Perform search logic here
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      >
        {/* <Ionicons name="ios-search" size={24} color="black" style={styles.searchIcon} /> */}
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: SPACINGS.XL,
    paddingTop: SPACINGS.MD,
    marginBottom: SPACINGS.MD,
  },
  searchInput: {
    backgroundColor: COLORS.WHITE,
    height: ICONSIZES.XL,
    paddingVertical: SPACINGS.SM,
    paddingHorizontal: SPACINGS.MD,
    borderRadius: ICONSIZES.XL,
    borderColor: COLORS.DARKACCENT,
    borderWidth: 1,
  },
  searchIcon: {
    marginLeft: 300, // Add spacing between icon and input
  },
});

export default SearchBar;
