import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ExploreItemCarousel from "./components/ExploreItemCarousel";
import createAccommodation from "./functions/createAccommodation";
import createExperience from "./functions/createExperience";
import CATEGORIES from "../../config/CATEGORIES";

import ExploreMenu from "./components/ExploreMenu";

const handleCreateAccommodation = async () => {
  try {
    await createAccommodation();
    console.log("Accommodation post created successfully!");
    // Add any navigation or UI updates you want here
  } catch (error) {
    console.error("Error creating accommodation post:", error);
    // Handle error or show error message to the user
  }
};

const handleCreateExperience = async () => {
  try {
    await createExperience();
    console.log("Experience post created successfully!");
    // Add any navigation or UI updates you want here
  } catch (error) {
    console.error("Error creating experience post:", error);
    // Handle error or show error message to the user
  }
};

interface ExploreProps {
  navigation: NativeStackNavigationProp<any>;
}

function Explore({ navigation }: ExploreProps) {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const updateActiveCategory = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <ExploreMenu
            updateActiveCategory={updateActiveCategory}
            activeCategory={activeCategory}
          />
          <ExploreItemCarousel
            activeCategory={activeCategory}
            collectionName={CATEGORIES[activeCategory].dbName}
            navigation={navigation}
          />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  container: {
    alignItems: "center",
  },

  image: {
    width: 500,
    height: 500,
  },
});

export default Explore;
