import React from "react";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import COLORS from "../../config/COLORS";
import CATEGORIES from "../../config/CATEGORIES";
import HeartButton from "./components/HeartButton";
import ExploreItemPanel from "./components/ExploreItemPanel";
import createAccommodation from "./functions/createAccommodation";
import createExperience from "./functions/createExperience";

import TouristsNavbar from "../../custom_components/TouristsNavbar";
import ExploreItemCarousel from "./components/ExploreItemCarousel";
import ExploreMenu from "./components/ExploreMenu";

const width = Dimensions.get("screen").width;

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
    backgroundColor: COLORS.BEIGE,
    flex: 1,
  },

  container: {
    padding: 20,
  },
});

export default Explore;
