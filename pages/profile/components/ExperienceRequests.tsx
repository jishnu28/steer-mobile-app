import React, { useEffect, useState } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import H3 from "../../../custom_components/typography/H3";
import BodyText from "../../../custom_components/typography/BodyText";
import SPACINGS from "../../../config/SPACINGS";
import { View } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firestore } from "../../../firebaseConfig";
import FONTSIZES from "../../../config/FONTSIZES";

interface ExperienceRequestsProps {
  experience: DocumentData;
}

const ExperienceRequests = ({ experience }: ExperienceRequestsProps) => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [experienceRequests, setExperienceRequests] = useState<DocumentData[]>(
    []
  );
  const [loadingExperienceRequests, setLoadingExperienceRequests] =
    useState<boolean>(true);

  const getExperienceRequests = async () => {
    const newExperienceRequests: DocumentData[] = [];
    const experienceRequestsQuerySnapshot = await getDocs(
      collection(firestore, "experiences", experience.firestoreID, "bookings")
    );
    experienceRequestsQuerySnapshot.forEach((doc) =>
      newExperienceRequests.push(doc.data())
    );
    setExperienceRequests(newExperienceRequests);
    setLoadingExperienceRequests(false);
    console.log("experienceRequests have been updated:", newExperienceRequests);
  };
  useEffect(() => {
    if (experienceRequests.length == 0) {
      console.log("experienceRequests is empty");
      getExperienceRequests();
      console.log("experienceRequests is now:", experienceRequests);
    }
  }, []);

  return (
    <View>
      {experienceRequests.length == 0 && (
        <H3
          style={{
            marginTop: SPACINGS.SM,
            fontSize: FONTSIZES.SM,
          }}
        >
          No new requests for {experience.title}
        </H3>
      )}
      {experienceRequests.length != 0 && !loadingExperienceRequests && (
        <>
          <H3
            style={{
              marginTop: SPACINGS.SM,
              fontSize: FONTSIZES.SM,
            }}
          >
            {experience.title}
          </H3>
          {/* TODO: Replace with details about the booking request*/}
          {experienceRequests.map((experienceRequest, index) => (
            <BodyText key={index}>{experienceRequest.guestId}</BodyText>
          ))}
        </>
      )}
    </View>
  );
};

export default ExperienceRequests;
