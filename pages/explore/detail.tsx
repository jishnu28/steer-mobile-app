import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../custom_components/BackButton";
import ReviewSection from "./components/ReviewSection";
import HostSection from "./components/HostSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TagsSection from "./components/TagsSection";
import DescriptionSection from "./components/DescriptionSection";
import { DocumentData } from "firebase/firestore";
import InfoButton from "./components/InfoButton";
import ChatButton from "../chat/components/ChatButton";
import { RouteProp } from "@react-navigation/native";
import ImageCarousel from "./components/ImageCarousel";
import SPACINGS from "../../config/SPACINGS";
import COLORS from "../../config/COLORS";

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
  const [data, setData] = useState<DocumentData | undefined>(item);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!data) {
    // Loading state if necessary
    console.log("No data fetched");
  } else {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ImageCarousel
          width={width}
          height={height}
          imagesToShow={data.images}
          navigation={navigation}
          item={item}
          page={true}
        />
        {isOpen ? (
          <>
            <View
              style={{
                position: "absolute",
                height: height,
                paddingBottom: 64,
              }}
            >
              <Pressable
                onPress={() => setIsOpen(false)}
                style={styles.background}
              ></Pressable>
              <View style={styles.detailCard}>
                {
                  // to add the drag bar for the detail card
                  /* <View
                    style={{
                      alignSelf: "center",
                      backgroundColor: COLORS.DARKBG,
                      width: 0.25 * width,
                      height: SPACINGS.XS,
                      marginVertical: SPACINGS.MD,
                      borderRadius: SPACINGS.MD,
                    }}
                  ></View> */
                }
                <ScrollView style={{ padding: SPACINGS.SM }}>
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
                  <HostSection hostID={data.owner} />
                  <ReviewSection parentDocID={data.firestoreID} />
                </ScrollView>
              </View>
            </View>
            <ChatButton navigation={navigation} hostID={data.owner} />
            <BackButton onPress={() => navigation.goBack()} />
            <InfoButton onPress={() => setIsOpen(false)} />
          </>
        ) : (
          <>
            <BackButton onPress={() => navigation.goBack()} />
            <InfoButton onPress={() => setIsOpen(true)} />
            <ChatButton navigation={navigation} hostID={data.owner} />
          </>
        )}
      </SafeAreaView>
    );
  }
}

export default Detail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.LIGHTACCENT,
  },
  detailCard: {
    borderTopLeftRadius: SPACINGS.LG,
    borderTopRightRadius: SPACINGS.LG,
    height: "55%",
    backgroundColor: COLORS.LIGHTBG,
  },
  background: {
    height: "45%",
    opacity: 0.2,
    backgroundColor: COLORS.DARKBG,
  },
});
