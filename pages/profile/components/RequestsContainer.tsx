import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import H3 from "../../../custom_components/typography/H3";
import SPACINGS from "../../../config/SPACINGS";
import { View } from "react-native";
import AccommodationRequests from "./AccommodationRequests";
import FONTSIZES from "../../../config/FONTSIZES";
import ExperienceRequests from "./ExperienceRequests";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RequestsContainerProps {
  userOwnedAccommodations: DocumentData[];
  userOwnedExperiences: DocumentData[];
  navigation: NativeStackNavigationProp<any>;
}

const RequestsContainer = ({
  userOwnedAccommodations,
  userOwnedExperiences,
  navigation,
}: RequestsContainerProps) => {
  return (
    <View style={{ alignItems: "flex-start", paddingBottom: 230 }}>
      <H3 style={{ fontSize: FONTSIZES.MD }}>Accommodation Requests</H3>
      {userOwnedAccommodations.map((accommodation, index) => (
        <AccommodationRequests
          key={index}
          accommodation={accommodation}
          navigation={navigation}
        />
      ))}
      <H3 style={{ marginTop: SPACINGS.MD, fontSize: FONTSIZES.MD }}>
        Experience Requests
      </H3>
      {userOwnedExperiences.map((experience, index) => (
        <ExperienceRequests
          key={index}
          experience={experience}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

export default RequestsContainer;
