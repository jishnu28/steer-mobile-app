import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CATEGORIES from "../../../config/CATEGORIES";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeartButton from "./HeartButton";
import COLORS from "../../../config/COLORS";

interface ExploreItemCarouselProps {
  activeCategory: number;
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;

function ExploreItemCarousel({
  activeCategory,
  navigation,
}: ExploreItemCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width * 0.75}
      decelerationRate="fast"
      pagingEnabled
      style={{ marginVertical: 20 }}
    >
      {CATEGORIES[activeCategory].items.map((item, index) => (
        <Pressable
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

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {item.title} {item.price}
            </Text>
          </View>

          <Image source={item.image} style={styles.image} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

export default ExploreItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    height: width * 0.9,
    overflow: "hidden",
    borderRadius: 20,
    marginRight: 20,
  },

  description: {
    textAlign: "justify",
    padding: 10,
    fontFamily: "Avenir",
    fontSize: 20,
    color: COLORS.BROWN,
  },

  descriptionContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "15%",
    backgroundColor: COLORS.WHITE,
    alignContent: "center",
    justifyContent: "center",
    bottom: 0,
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
