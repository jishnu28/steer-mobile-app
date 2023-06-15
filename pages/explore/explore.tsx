import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import COLORS from "../../config/COLORS";
import CATEGORIES from "../../config/CATEGORIES";
import HeartButton from "./components/HeartButton";
import ExploreItemPanel from "./components/ExploreItemPanel";
import TouristsNavbar from "../../custom_components/TouristsNavbar";

const width = Dimensions.get("screen").width;

interface ExploreProps {
  navigation: NativeStackNavigationProp<any>;
}

function Explore({ navigation }: ExploreProps) {
  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <ScrollView horizontal>
            {CATEGORIES.map((category, index) => (
              <TouchableOpacity
                onPress={() => setActiveCategory(index)}
                style={{ marginRight: 10 }}
                key={category.id}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color:
                      activeCategory === index ? COLORS.ORANGE : COLORS.BROWN,
                    fontFamily:
                      activeCategory === index
                        ? "AvenirNext-Bold"
                        : "Avenir Next",
                  }}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.75}
            decelerationRate="fast"
            pagingEnabled
            style={{ marginVertical: 20 }}
          >
            {CATEGORIES[activeCategory].items.map((item, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() =>
                  navigation.navigate("Detail", {
                    item: item,
                    navigation: navigation,
                  })
                }
              >
                <View style={styles.heartButtonContainer}>
                  <HeartButton />
                </View>

                <ExploreItemPanel
                  itemTitle={item.title}
                  itemPrice={item.price}
                />

                <Image source={item.image} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
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

  image: {
    width: "100%",
    height: "100%",
  },

  card: {
    width: width * 0.7,
    height: width * 0.9,
    overflow: "hidden",
    borderRadius: 20,
    marginRight: 20,
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default Explore;
