import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import H3 from "../../../custom_components/typography/H3";
import SPACINGS from "../../../config/SPACINGS";
import { View } from "react-native";
import AccommodationRequests from "./AccommodationRequests";
import FONTSIZES from "../../../config/FONTSIZES";
import ExperienceRequests from "./ExperienceRequests";

interface RequestsContainerProps {
  userOwnedAccommodations: DocumentData[];
  userOwnedExperiences: DocumentData[];
}

const RequestsContainer = ({
  userOwnedAccommodations,
  userOwnedExperiences,
}: RequestsContainerProps) => {
  return (
    <View>
      <H3 style={{ fontSize: FONTSIZES.MD }}>Accommodation Requests</H3>
      {userOwnedAccommodations.map((accommodation, index) => (
        <AccommodationRequests key={index} accommodation={accommodation} />
      ))}
      <H3 style={{ marginTop: SPACINGS.MD, fontSize: FONTSIZES.MD }}>
        Experience Requests
      </H3>
      {userOwnedExperiences.map((experience, index) => (
        <ExperienceRequests key={index} experience={experience} />
      ))}
    </View>
  );
};

export default RequestsContainer;
