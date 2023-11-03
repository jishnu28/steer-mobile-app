import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ImageCarousel from "./components/ImageCarousel";
import ReturnButton from "./components/ReturnButton";

interface GalleryProps {
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

/**
 *
 * @deprecated, originally used for displaying each post's images in a gallery
 */
function Gallery({ navigation }: GalleryProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <ReturnButton navigation={navigation} />
      </View>
      <ImageCarousel width={width} height={height} resizeMode="center" />
    </SafeAreaView>
  );
}

export default Gallery;

const styles = StyleSheet.create({
  background: {
    top: width * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  buttonContainer: {
    paddingLeft: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#E5E8D9",
  },

  image: {
    height: "60%",
    flex: 1,
    justifyContent: "center",
  },
});
