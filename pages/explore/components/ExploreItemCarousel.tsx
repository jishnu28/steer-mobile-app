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

interface ExploreItemCarouselProps {
  activeCategory: number;
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function ExploreItemCarousel({
  activeCategory,
  navigation,
}: ExploreItemCarouselProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToInterval={height * 0.6}
      decelerationRate="fast"
      pagingEnabled
      style={{ marginVertical: 20 }}
    >
      {/* TODO: configure getting the data from Firebase instead */}
      {CATEGORIES[activeCategory].items.map((item, index) => (
        <View>
          <View style={styles.heartButtonContainer}>
            <HeartButton />
          </View>
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
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}> {item.title} </Text>
              <Text style={styles.price}> {item.price} </Text>
            </View>

            <View style={styles.descriptionBackground}></View>

            <Image source={item.image} style={styles.image} />
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

export default ExploreItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: height * 0.6,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#88838A",
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  descriptionContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
    height: 87,
  },

  descriptionBackground: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: 87,
    backgroundColor: "#E5E8D9",
    opacity: 0.8,
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
