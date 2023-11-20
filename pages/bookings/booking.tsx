import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import COLORS from "../../config/COLORS";
import H1 from "../../custom_components/typography/H1";
import AccommodationBookingCard from "./components/AccommodationBookingCard";
import { RouteProp } from "@react-navigation/native";
import ExperienceBookingCard from "./components/ExperienceBookingCard";

type RootStackParamList = {
  Booking: {
    listingCollection: string;
    listingId: string;
    listingPrice: number;
    listingCapacity: number;
  };
  // other routes...
};

type BookingScreenRouteProp = RouteProp<RootStackParamList, "Booking">;

interface BookingProps {
  route: BookingScreenRouteProp;
  navigation: NativeStackNavigationProp<any>;
}

export default function Booking({ route, navigation }: BookingProps) {
  const { listingCollection, listingId, listingPrice, listingCapacity } =
    route.params;
  const isAccommodationsBooking: boolean =
    listingCollection === "accommodations";

  return (
    <SafeAreaView style={styles.background}>
      <H1>Confirm your details!</H1>
      {isAccommodationsBooking && (
        <AccommodationBookingCard
          price={listingPrice ?? 0}
          id={listingId}
          guestCapacity={listingCapacity}
          navigation={navigation}
        />
      )}
      {!isAccommodationsBooking && (
        <ExperienceBookingCard
          price={listingPrice ?? 0}
          id={listingId}
          guestCapacity={listingCapacity}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.LIGHTACCENT,
    alignItems: "center",
    justifyContent: "center",
  },
});
