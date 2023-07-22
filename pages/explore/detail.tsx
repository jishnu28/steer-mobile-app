import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Image,
} from "react-native";

import COLORS from "../../config/COLORS";

import DetailButtonRow from "./components/DetailButtonRow";
import DetailInfoCard from "./components/DetailInfoCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientShadowButton from "../../custom_components/GradientShadowButton";
import {
  Actionsheet,
  Box,
  ScrollView,
  Text,
  HStack,
  NativeBaseProvider,
  useDisclose,
  Badge,
  Flex,
} from "native-base";
import BackButton from "../../custom_components/BackButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AmenitiesCard from "./components/AmenitiesCard";

const { width, height } = Dimensions.get("screen");
const imageRequestURL =
  "https://picsum.photos/" + Math.round(width).toString() + "/300";

const handleBackPress = () => {
  // Handle back button press
};

const amenitiesList: string[][] = [
  ["wifi", "Wi-fi"],
  ["bed-king-outline", "2 Beds"],
  ["door-open", "2 Bedrooms"],
  ["shower", "1 Bathrooms"],
  ["chef-hat", "Kitchen"],
  ["fireplace", "Heating"],
  ["water-boiler", "Water-heater"],
];

const tagList: string[] = [
  "Cosy",
  "Budget-friendly",
  "Has wi-fi",
  "Kid-friendly",
  "Rustic",
];

// const reviewList: string[] = [];

interface DetailProps {
  navigation: NativeStackNavigationProp<any>;
}

function Detail({ navigation }: DetailProps) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text>Hello</Text>
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
              <HStack
                w="100%"
                px={4}
                justifyContent="center"
                pb={4}
                borderBottomColor="blue.200"
                borderBottomWidth={1}
              >
                <Box w="70%" display="flex" justifyContent="center">
                  <Text bold fontSize="3xl">
                    Tiny Testing Tent
                  </Text>
                  <Text fontSize="md">Testing Ave 123</Text>
                </Box>
                <Box w="30%" display="flex" justifyContent="center">
                  <Text fontSize="3xl">
                    <Text fontSize="md">$</Text>
                    <Text bold fontSize="4xl">
                      30
                    </Text>
                    <Text fontSize="md">/night</Text>
                  </Text>
                </Box>
              </HStack>
              <Box px="4" py="4">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  sollicitudin tincidunt neque ut ultrices. Nulla neque magna,
                  elementum et tellus id, dapibus accumsan dolor.
                </Text>
              </Box>
              <Flex flexWrap="wrap" flexDirection="row" px="4" py="4">
                {amenitiesList.map((amenity) => (
                  <AmenitiesCard iconName={amenity[0]} text={amenity[1]} />
                ))}
              </Flex>
              <Flex flexWrap="wrap" flexDirection="row" px="4" py="4">
                {tagList.map((tag) => (
                  <Badge
                    key={tag}
                    mr="4"
                    minHeight="8"
                    mb="2"
                    variant="outline"
                    borderColor="amber.700"
                    borderRadius="md"
                  >
                    {tag}
                  </Badge>
                ))}
              </Flex>
              <Actionsheet.Item>Delete</Actionsheet.Item>
              <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
              <Actionsheet.Item>Play</Actionsheet.Item>
              <Actionsheet.Item>Favourite</Actionsheet.Item>
              <Actionsheet.Item>Cancel</Actionsheet.Item>
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
