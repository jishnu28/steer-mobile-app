import React, { useState } from "react";
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
  Fab,
  Icon,
  Box,
  VStack,
} from "native-base";
import BackButton from "../../custom_components/BackButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import ReviewSection from "../../custom_components/ReviewSection";
import HostSection from "./components/HostSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TagsSection from "./components/TagsSection";
import DescriptionSection from "./components/DescriptionSection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

const docRef = doc(firestore, "accommodations", "O9bk2HaqsjZAdhsyJSDr");

const { width, height } = Dimensions.get("screen");
const imageRequestURL =
  "https://picsum.photos/" +
  Math.round(width).toString() +
  "/" +
  Math.round(height * 0.4).toString();

const handleBackPress = () => {
  // Handle back button press
};

interface DetailProps {
  navigation: NativeStackNavigationProp<any>;
}

const handleSwipeUp = () => {
  // Handle swipe up
  console.log("swiped up");
};

async function fetchDetailData() {
  const doc = await getDoc(docRef);
  if (doc.exists()) {
    console.log("Document data:", doc.data());
  }
  return doc.data();
}

function Detail({ navigation }: DetailProps) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {isOpen ? (
          <>
            <Image
              source={{
                width: width,
                height: height * 0.4,
                uri: imageRequestURL,
              }}
            />
            <Fab
              renderInPortal={false}
              shadow={2}
              placement="bottom-right"
              bg="#FFAF87"
              right={width * 0.26}
              bottom={50}
              size="lg"
              label="Message to book"
              icon={
                <Icon
                  color="white"
                  as={MaterialCommunityIcons}
                  name="chat-outline"
                  size="6"
                />
              }
            />
            <Actionsheet isOpen={true} onClose={onClose}>
              <Actionsheet.Content h={0.6 * height} bg="#F8FAF0">
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
          </>
        ) : (
          <>
            <VStack>
              <Image
                source={{
                  width: width,
                  height: height * 0.8,
                  uri:
                    "https://picsum.photos/" +
                    Math.round(width).toString() +
                    "/" +
                    Math.round(height * 0.8).toString(),
                }}
              />
              <Box bg="red.300" color="blue.600" />
            </VStack>
            <BackButton onPress={onOpen} />
          </>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

function DetailWrapper({ navigation }: DetailProps) {
  const [data, setData] = useState<DocumentData | undefined>(undefined);

  React.useEffect(() => {
    async function fetchData() {
      const result = await fetchDetailData();
      if (!result) {
        console.log("No data fetched");
      }
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) {
    // Loading state if necessary
    console.log("No data fetched");
  }

  return <Detail navigation={navigation} />;
}

export default Detail;

const styles = StyleSheet.create({
  background: {
    color: "#F8FAF0",
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
