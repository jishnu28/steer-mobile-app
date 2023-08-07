import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "native-base";

interface ImageCarouselProps {
  width: number;
  height: number;
  resizeMode: string;
}

// TODO: to be replaced with actual images once Firebase understood
const images = [
  "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/310435/pexels-photo-310435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4551619/pexels-photo-4551619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

function ImageCarousel({ width, height, resizeMode }: ImageCarouselProps) {
  const [count, setCount] = useState(0);
  const updatePaging = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    if (slide !== count) {
      setCount(slide);
    }
  };

  return (
    <View>
      <View style={styles.paginator}>
        {images.map((item, index) => (
          <Text
            key={index}
            style={count == index ? styles.pagingActive : styles.pagingInactive}
          >
            ⬤
          </Text>
        ))}
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={updatePaging}
      >
        {images.map((item: any, index: number) => (
          <Image
            key={index}
            source={{ uri: item }}
            style={{ width: width, height: height, resizeMode: resizeMode }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default ImageCarousel;

const styles = StyleSheet.create({
  paginator: {
    height: "100%",
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    padding: 5,
    zIndex: 1,
  },

  pagingInactive: {
    color: "#88838A",
    margin: 2,
    opacity: 0.5,
  },

  pagingActive: {
    color: "#657B70",
    margin: 2,
  },
});
