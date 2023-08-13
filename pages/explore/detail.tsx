import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Image } from "react-native";

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
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import InfoButton from "./components/InfoButton";
import ChatButton from "../chat/components/ChatButton";

const docRef = doc(firestore, "accommodations", "O9bk2HaqsjZAdhsyJSDr");

const { width, height } = Dimensions.get("screen");

interface DetailProps {
  navigation: NativeStackNavigationProp<any>;
}

async function fetchDetailData() {
  const doc = await getDoc(docRef);
  if (doc.exists()) {
    console.log("Document data:", doc.data());
  }
  return doc.data();
}

function Detail({ navigation }: DetailProps) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [data, setData] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const detailData = await fetchDetailData();
      setData(detailData);
    }

    fetchData();
  }, []);

  if (!data) {
    // Loading state if necessary
    console.log("No data fetched");
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          <Image
            source={{
              width: width,
              height: height,
              uri:
                "https://picsum.photos/" +
                Math.round(width).toString() +
                "/" +
                Math.round(height).toString(),
            }}
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
                  <ChatButton navigation={navigation} />
                </Actionsheet.Content>
              </Actionsheet>
              <BackButton onPress={() => navigation.goBack()} />
              <InfoButton onPress={onClose} />
            </>
          ) : (
            <>
              <BackButton onPress={() => navigation.goBack()} />
              <InfoButton onPress={onOpen} />
              <ChatButton navigation={navigation} />
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
