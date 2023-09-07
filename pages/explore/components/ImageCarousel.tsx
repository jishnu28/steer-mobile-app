import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "native-base";

interface ImageCarouselProps {
  width: number;
  height: number;
  imagesToShow: string[];
}

function ImageCarousel({ width, height, imagesToShow }: ImageCarouselProps) {
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
        {imagesToShow.map((item, index) => (
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
        {imagesToShow.map((item: any, index: number) => (
          <Image
            key={index}
            source={{ uri: item }}
            style={{ width: width, height: height }}
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
