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
import HeartButton from "../../explore/components/HeartButton";
import ImageCarousel from "../../explore/components/ImageCarousel";

interface SavedItemCarouselProps {
  activeCategory: number;
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const cardWidth: number = width * 0.72;
const cardHeight: number = height * 0.54;

function SavedItemCarousel({
  activeCategory,
  navigation,
}: SavedItemCarouselProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToInterval={height * 0.55}
      decelerationRate="fast"
      pagingEnabled
      style={{ marginVertical: 10 }}
    >
      {/* TODO: configure getting the data from Firebase instead */}

      {CATEGORIES[activeCategory].items.map((item, index) => (
        <View key={index}>
          <View style={styles.heartButtonContainer}>
            <HeartButton />
          </View>

          {/* Remove Pressable feature to navigate to another page */}
          <View style={styles.card}>
            <View style={styles.descriptionBackground}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}> {item.title} </Text>
                <Text style={styles.price}> {item.price} </Text>
              </View>
            </View>

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

export default SavedItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },

  title: {
    fontFamily: "Bitter-Bold",
    fontSize: 20,
    fontWeight: "800",
    color: "#88838A",
  },

  price: {
    fontFamily: "Bitter-Bold",
    fontSize: 20,
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
