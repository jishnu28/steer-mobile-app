import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import COLORS from "../../config/COLORS";
import TouristsNavbar from "../../custom_components/TouristsNavbar";
import ExploreItemCarousel from "./components/ExploreItemCarousel";
import ExploreMenu from "./components/ExploreMenu";

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
