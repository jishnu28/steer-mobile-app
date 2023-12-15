import React, { useEffect, useState } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import H3 from "../../../custom_components/typography/H3";
import BodyText from "../../../custom_components/typography/BodyText";
import SPACINGS from "../../../config/SPACINGS";
import { View } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firestore } from "../../../firebaseConfig";
import FONTSIZES from "../../../config/FONTSIZES";

interface AccommodationRequestsProps {
  accommodation: DocumentData;
}

const AccommodationRequests = ({
  accommodation,
}: AccommodationRequestsProps) => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [accommodationRequests, setAccommodationRequests] = useState<
    DocumentData[]
  >([]);
  const [loadingAccommodationRequests, setLoadingAccommodationRequests] =
    useState<boolean>(true);

  const getAccommodationRequests = async () => {
    const newAccommodationRequests: DocumentData[] = [];
    const accommodationRequestsQuerySnapshot = await getDocs(
      collection(
        firestore,
        "accommodations",
        accommodation.firestoreID,
        "bookings"
      )
    );
    accommodationRequestsQuerySnapshot.forEach((doc) =>
      newAccommodationRequests.push(doc.data())
    );
    setAccommodationRequests(newAccommodationRequests);
    setLoadingAccommodationRequests(false);
  };
  useEffect(() => {
    if (accommodationRequests.length == 0) {
      getAccommodationRequests();
    }
  }, []);

  return (
    <View>
      {accommodationRequests.length == 0 && (
        <H3
          style={{
            marginTop: SPACINGS.SM,
            fontSize: FONTSIZES.SM,
          }}
        >
          No new requests for {accommodation.title}
        </H3>
      )}
      {accommodationRequests.length != 0 && !loadingAccommodationRequests && (
        <>
          <H3
            style={{
              marginTop: SPACINGS.SM,
              fontSize: FONTSIZES.SM,
            }}
          >
            {accommodation.title}
          </H3>
          {/* TODO: Replace with details about the booking request*/}
          {accommodationRequests.map((accommodationRequest, index) => (
            <BodyText key={index}>{accommodationRequest.guestId}</BodyText>
          ))}
        </>
      )}
    </View>
  );
};

export default AccommodationRequests;
