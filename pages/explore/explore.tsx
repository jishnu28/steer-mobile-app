import React, { useState } from "react";
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
import CATEGORIES from "../../config/CATEGORIES";
import ExploreMenu from "./components/ExploreMenu";

interface ExploreProps {
  navigation: NativeStackNavigationProp<any>;
}

function Explore({ navigation }: ExploreProps) {
  const [activeCategory, setActiveCategory] = useState(0);
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
            collectionName={CATEGORIES[activeCategory].dbName}
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
