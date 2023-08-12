import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
    // Perform search logic here
  };

  return (
    <View 
    style={styles.searchBarContainer}
    >
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
    paddingHorizontal: 30,
    paddingTop: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "white",
    height: 45,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: "#ACAFAC", 
    borderWidth: 1
  },
  searchIcon: {
    marginLeft: 300, // Add spacing between icon and input
  },
});

export default SearchBar;
