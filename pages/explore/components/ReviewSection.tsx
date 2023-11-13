import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "@rneui/themed";
import H2 from "../../../custom_components/typography/H2";
import ReviewCard from "./ReviewCard";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";
import SPACING from "../../../config/SPACINGS";
import SPACINGS from "../../../config/SPACINGS";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import React, { useEffect } from "react";
import { defaultProfilePicURL } from "../../../config/CONSTANTS";

// const reviewList: string[][] = [
//   [
//     "https://picsum.photos/200/200",
//     "Hello this is a test review that I'm writing. The location couldn't have been better! We were just a short walk away from all the main attractions, restaurants, and shops in the city center.",
//   ],
//   [
//     "https://picsum.photos/200/200",
//     "The bed was incredibly comfortable, and we had a great night's sleep each night. The linens and towels provided were of high quality, and we appreciated the attention to detail. One of the highlights of our stay was the stunning view from the balcony. We enjoyed our morning coffee while overlooking the city skyline – simply breathtaking!",
//   ],
//   [
//     "https://picsum.photos/200/200",
//     "The host was very friendly and helpful. He gave us some great recommendations for restaurants and bars in the area. We would definitely stay here again!",
//   ],
// ];

interface ReviewSectionProps {
  parentDocID: string;
  openReviewModal: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  parentDocID,
  openReviewModal,
}) => {
  const [reviews, setReviews] = React.useState<string[][]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getReviews = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "accommodations", parentDocID, "reviews")
    );
    querySnapshot.forEach(async (reviewDoc) => {
      const currDoc = reviewDoc.data();
      const currReview: string[] = [];
      const reviewUserDocRef = doc(firestore, "users", currDoc.userID);
      const reviewUserDocSnap = await getDoc(reviewUserDocRef);
      if (reviewUserDocSnap.exists()) {
        const reviewUserDoc = reviewUserDocSnap.data();
        currReview.push(reviewUserDoc.profilePic);
      } else {
        currReview.push(defaultProfilePicURL);
        // TODO: Replace with url to default profile pic
      }
      currReview.push(currDoc.text);
      setReviews((prevReviews) => [...prevReviews, currReview]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isLoading) {
      getReviews();
    }
  }, []);

  if (isLoading) {
    return <View style={styles.mainContainer}></View>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <H2>Reviews</H2>
        <Pressable style={styles.button} onPress={openReviewModal}>
          <Icon
            color={COLORS.LIGHTBG}
            type="material-community"
            name="plus"
            size={ICONSIZES.MD}
          />
        </Pressable>
      </View>
      <View style={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <ReviewCard
            key={`${index}-${review[1]}`}
            avatarUri={review[0]}
            text={review[1]}
          />
        ))}
      </View>
    </View>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    width: ICONSIZES.LG,
    height: ICONSIZES.LG,
    borderRadius: ICONSIZES.LG,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "column",
    padding: SPACING.MD,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: SPACINGS.SM,
  },
  reviewsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
