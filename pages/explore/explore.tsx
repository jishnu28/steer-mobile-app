import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ExploreItemCarousel from "./components/ExploreItemCarousel";
import CATEGORIES from "../../config/CATEGORIES";
import ExploreMenu from "./components/ExploreMenu";
import COLORS from "../../config/COLORS";

interface ExploreProps {
  navigation: NativeStackNavigationProp<any>;
}

function Explore({ navigation }: ExploreProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <ExploreMenu
          updateActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <ExploreItemCarousel
          activeCategory={activeCategory}
          navigation={navigation}
          collectionName={CATEGORIES[activeCategory].dbName}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.LIGHTACCENT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
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
