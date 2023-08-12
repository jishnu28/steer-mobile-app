import React from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CATEGORIES from "../../../config/CATEGORIES";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeartButton from "./HeartButton";
import ImageCarousel from "./ImageCarousel";

interface ExploreItemCarouselProps {
  activeCategory: number;
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const cardWidth: number = width * 0.8;
const cardHeight: number = height * 0.6;

function ExploreItemCarousel({
  activeCategory,
  navigation,
}: ExploreItemCarouselProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToInterval={height * 0.55}
      decelerationRate="fast"
      pagingEnabled
      style={{ marginVertical: 20 }}
    >
      {/* TODO: configure getting the data from Firebase instead */}

      {CATEGORIES[activeCategory].items.map((item, index) => (
        <View key={index}>
          <View style={styles.heartButtonContainer}>
            <HeartButton />
          </View>

          <View style={styles.card}>
            <Pressable
              key={index}
              style={styles.descriptionBackground}
              onPress={() =>
                navigation.navigate("Detail", {
                  item: item,
                  navigation: navigation,
                })
              }

              // Uncomment this section to see the Gallery view
              // navigation.navigate("Gallery", {
              //   item: item,
              //   navigation: navigation,
              // })}
            >
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}> {item.title} </Text>
                <Text style={styles.price}> {item.price} </Text>
              </View>
            </Pressable>
            <ImageCarousel
              width={cardWidth}
              height={cardHeight}
              resizeMode="cover"
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default ExploreItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: "Bitter-Bold",
    fontWeight: "800",
    color: "#88838A",
  },

  price: {
    fontSize: 20,
    fontFamily: "Bitter-Bold",
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
});
