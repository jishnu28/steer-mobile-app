import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

function CarouselItem({ item }: any) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
    </View>
  );
}

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    width: width,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
