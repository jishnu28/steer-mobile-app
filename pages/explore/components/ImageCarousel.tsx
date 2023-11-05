import React, { useState } from "react";
import {
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SPACINGS from "../../../config/SPACINGS";
import FONTSIZES from "../../../config/FONTSIZES";
import COLORS from "../../../config/COLORS";

interface ImageCarouselProps {
  width: number;
  height: number;
  imagesToShow: string[];
  navigation: NativeStackNavigationProp<any>;
  item: any;
  page: boolean;
  style?: ViewStyle;
}

function ImageCarousel({
  width,
  height,
  imagesToShow,
  navigation,
  item,
  page,
  style,
}: ImageCarouselProps) {
  const [count, setCount] = useState(0);
  const handlePress = () => {
    if (!page) {
      navigation.navigate("Detail", {
        item: item,
        navigation: navigation,
      });
    }
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
    <View style={style}>
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
          <Pressable key={`${index}-${item}`} onPress={handlePress}>
            <Image
              source={{ uri: item }}
              style={{ width: width, height: height }}
            />
          </Pressable>
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
    padding: SPACINGS.MD,
    zIndex: 1,
  },

  pagingInactive: {
    fontSize: FONTSIZES.XS,
    color: COLORS.WHITE,
    margin: SPACINGS.XXS,
    opacity: 0.6,
  },

  pagingActive: {
    fontSize: FONTSIZES.XS,
    color: COLORS.PRIMARY,
    margin: SPACINGS.XXS,
  },
});
