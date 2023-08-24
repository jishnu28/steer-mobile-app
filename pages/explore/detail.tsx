import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Actionsheet,
  ScrollView,
  NativeBaseProvider,
  useDisclose,
} from "native-base";
import BackButton from "../../custom_components/BackButton";
import ReviewSection from "../../custom_components/ReviewSection";
import HostSection from "./components/HostSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TagsSection from "./components/TagsSection";
import DescriptionSection from "./components/DescriptionSection";
import { DocumentData } from "firebase/firestore";
import InfoButton from "./components/InfoButton";
import ChatButton from "../chat/components/ChatButton";
import { RouteProp } from "@react-navigation/native";
import ImageCarousel from "./components/ImageCarousel";

const { width, height } = Dimensions.get("screen");

type RootStackParamList = {
  Detail: { item: any };
  // other routes...
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

interface DetailProps {
  route: DetailScreenRouteProp;
  navigation: NativeStackNavigationProp<any>;
}

function Detail({ route, navigation }: DetailProps) {
  const { item } = route.params;
  console.log("item", item);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [data, setData] = useState<DocumentData | undefined>(item);

  if (!data) {
    // Loading state if necessary
    console.log("No data fetched");
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          <ImageCarousel
            width={width}
            height={height}
            imagesToShow={data.images}
          />
          {isOpen ? (
            <>
              <Actionsheet isOpen={true} onClose={onClose}>
                <Actionsheet.Content h={0.5 * height} bg="#F8FAF0">
                  <ScrollView w="100%" h="100%">
                    <DescriptionSection
                      title={data.title}
                      address={data.address}
                      price={data.price}
                      description={data.description}
                    />
                    <AmenitiesSection
                      hasHeating={data.hasHeating}
                      hasKitchen={data.hasKitchen}
                      hasWaterHeater={data.hasWaterheater}
                      hasWifi={data.hasWifi}
                      numBaths={data.numBaths}
                      numBeds={data.numBeds}
                      numBedrooms={data.numBedrooms}
                    />
                    <TagsSection accommodationTags={data.accommodationTags} />
                    <HostSection />
                    <ReviewSection />
                  </ScrollView>
                  <ChatButton navigation={navigation} hostID={data.owner} />
                </Actionsheet.Content>
              </Actionsheet>
              <BackButton onPress={() => navigation.goBack()} />
              <InfoButton onPress={onClose} />
            </>
          ) : (
            <>
              <BackButton onPress={() => navigation.goBack()} />
              <InfoButton onPress={onOpen} />
              <ChatButton navigation={navigation} hostID={data.owner} />
            </>
          )}
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}

export default Detail;

const styles = StyleSheet.create({
  background: {
    color: "#F8FAF0",
    top: width * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
