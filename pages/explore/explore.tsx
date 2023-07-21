import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ExploreItemCarousel from "./components/ExploreItemCarousel";
import createAccommodation from "./functions/createAccommodation";
import createExperience from "./functions/createExperience";

import TouristsNavbar from "../../custom_components/TouristsNavbar";
import ExploreMenu from "./components/ExploreMenu";
import Carousel from "react-native-snap-carousel";
import CATEGORIES from "../../config/CATEGORIES";

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
            navigation={navigation}
          />
        </View>
        <TouristsNavbar navigation={navigation} currentIndex={0} />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E8D9",
  },

  container: {
    padding: 20,
    alignItems: "center",
  },

  image: {
    width: 500,
    height: 500,
  },

  testContainer: {
    width: 500,
    height: 500,
  }
});

export default Explore;
