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
import { DocumentData, addDoc, collection } from "firebase/firestore";
import InfoButton from "./components/InfoButton";
import { RouteProp } from "@react-navigation/native";
import ImageCarousel from "./components/ImageCarousel";
import SPACINGS from "../../config/SPACINGS";
import COLORS from "../../config/COLORS";
import PopupModal from "../../custom_components/PopupModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firestore } from "../../firebaseConfig";
import BookButton from "../bookings/components/BookButton";

const { width, height } = Dimensions.get("screen");

type RootStackParamList = {
  Detail: { item: any; listingCollection: string };
  // other routes...
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

interface DetailProps {
  route: DetailScreenRouteProp;
  navigation: NativeStackNavigationProp<any>;
}

function Detail({ route, navigation }: DetailProps) {
  const { item, listingCollection } = route.params;
  const isAccommodation = listingCollection === "accommodations";
  const [data, setData] = useState<DocumentData | undefined>(item);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<string>("");
  const [user, loading, error] = useAuthState(firebaseAuth);

  const saveNewReview = async () => {
    const reviewsSubcollectionRef = collection(
      firestore,
      listingCollection,
      item.firestoreID,
      "reviews"
    );
    const newReviewRef = await addDoc(reviewsSubcollectionRef, {
      text: newReview,
      userID: user?.uid ?? "",
    });
    setNewReview("");
  };

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
                    isAccommodation={isAccommodation}
                  />
                  {isAccommodation && (
                    <AmenitiesSection
                      hasHeating={data.hasHeating}
                      hasKitchen={data.hasKitchen}
                      hasWaterHeater={data.hasWaterheater}
                      hasWifi={data.hasWifi}
                      numBaths={data.numBaths}
                      numBeds={data.numBeds}
                      numBedrooms={data.numBedrooms}
                    />
                  )}
                  {isAccommodation && (
                    <>
                      <TagsSection tags={data.accommodationTags ?? []} />
                      <TagsSection
                        heading={"Sustainability Features"}
                        tags={data.sustainabilityFeatures ?? []}
                      />
                    </>
                  )}
                  {!isAccommodation && (
                    <TagsSection tags={data.experienceTags ?? []} />
                  )}
                  <HostSection hostID={data.owner} navigation={navigation} />
                  <ReviewSection
                    parentDocID={data.firestoreID}
                    isAccommodation={isAccommodation}
                    openReviewModal={() => setReviewModal(true)}
                  />
                </ScrollView>
              </View>
            </View>
            <BackButton onPress={() => navigation.goBack()} />
            <InfoButton onPress={() => setIsOpen(false)} />
            <BookButton
              onPress={() =>
                navigation.navigate("Booking", {
                  listingCollection: listingCollection,
                  listingId: data.firestoreID,
                  listingPrice: data.price,
                  listingCapacity: data.numGuests,
                  navigation: navigation,
                })
              }
            />
            <PopupModal
              inputHeading="Submit a review:"
              inputValue={newReview}
              setInputValue={setNewReview}
              saveValue={saveNewReview}
              isModalVisible={reviewModal}
              setModalVisibility={setReviewModal}
            />
          </>
        ) : (
          <>
            <BackButton onPress={() => navigation.goBack()} />
            <InfoButton onPress={() => setIsOpen(true)} />
            <BookButton
              onPress={() =>
                navigation.navigate("Booking", {
                  listingCollection: listingCollection,
                  listingId: data.firestoreID,
                  listingPrice: data.price,
                  listingCapacity: data.numGuests,
                  navigation: navigation,
                })
              }
            />
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
