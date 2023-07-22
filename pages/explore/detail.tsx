import React from "react";
import { Dimensions, StyleSheet, Image } from "react-native";

import COLORS from "../../config/COLORS";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientShadowButton from "../../custom_components/GradientShadowButton";
import {
  Actionsheet,
  ScrollView,
  NativeBaseProvider,
  useDisclose,
} from "native-base";
import BackButton from "../../custom_components/BackButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import ReviewSection from "../../custom_components/ReviewsSection";
import HostSection from "./components/HostSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TagsSection from "./components/TagsSection";
import DescriptionSection from "./components/DescriptionSection";

const { width, height } = Dimensions.get("screen");
const imageRequestURL =
  "https://picsum.photos/" + Math.round(width).toString() + "/300";

const handleBackPress = () => {
  // Handle back button press
};

// const reviewList: string[] = [];

interface DetailProps {
  navigation: NativeStackNavigationProp<any>;
}

function Detail({ navigation }: DetailProps) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            width: width,
            height: 300,
            uri: imageRequestURL,
          }}
        />
        <Actionsheet isOpen={true}>
          <Actionsheet.Content h={0.6 * height}>
            <ScrollView w="100%" h="100%">
              <DescriptionSection />

              <AmenitiesSection />
              <TagsSection />
              <HostSection />
              <ReviewSection />
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
        <BackButton onPress={handleBackPress} />
        <GradientShadowButton
          onPress={function (): void {
            console.log("Pressed GradientShadowButton");
          }}
          title={"Message to book!"}
        />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default Detail;

const styles = StyleSheet.create({
  background: {
    top: width * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.BEIGE,
    padding: 20,
  },

  container: {
    flex: 1,
  },

  image: {
    height: "60%",
    flex: 1,
    justifyContent: "center",
  },
});
