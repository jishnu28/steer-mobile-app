import React, { useState } from "react";
import {
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SavedImageCarouselProps {
  width: number;
  height: number;
  imagesToShow: string[];
  item: any;
  page: boolean;
}

function SavedImageCarousel({
  width,
  height,
  imagesToShow,
  item,
  page,
}: SavedImageCarouselProps) {
  const [count, setCount] = useState(0);
  const handlePress = () => {
    // if (!page) {
    //     navigation.navigate("Detail", {
    //         item: item,
    //         navigation: navigation,
    //     });
    // }
  };

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
        scrollEventThrottle={500}
      >
        {imagesToShow.map((item: any, index: number) => (
          <Pressable onPress={handlePress}>
            <Image
              key={index}
              source={{ uri: item }}
              style={{ width: width, height: height }}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export default SavedImageCarousel;

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
    fontSize: 10,
    color: "#88838A",
    margin: 2,
    opacity: 0.5,
  },

  pagingActive: {
    fontSize: 10,
    color: "#657B70",
    margin: 2,
  },
});
