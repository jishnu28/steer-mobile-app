import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "@rneui/themed";
import H2 from "./typography/H2";
import ReviewsCard from "./ReviewCard";
import COLORS from "../config/COLORS";
import ICONSIZES from "../config/ICONSIZES";
import SPACING from "../config/SPACINGS";
const reviewList: string[][] = [
  [
    "https://picsum.photos/200/200",
    "Hello this is a test review that I'm writing. The location couldn't have been better! We were just a short walk away from all the main attractions, restaurants, and shops in the city center.",
  ],
  [
    "https://picsum.photos/200/200",
    "The bed was incredibly comfortable, and we had a great night's sleep each night. The linens and towels provided were of high quality, and we appreciated the attention to detail. One of the highlights of our stay was the stunning view from the balcony. We enjoyed our morning coffee while overlooking the city skyline – simply breathtaking!",
  ],
  [
    "https://picsum.photos/200/200",
    "The host was very friendly and helpful. He gave us some great recommendations for restaurants and bars in the area. We would definitely stay here again!",
  ],
];

const ReviewSection = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <H2>Reviews</H2>
        <Pressable
          style={styles.button}
          onPress={() => console.log("add review button pressed")}
        >
          <Icon
            color={COLORS.LIGHTBG}
            type="material-community"
            name="plus"
            size={ICONSIZES.MD}
          />
        </Pressable>
      </View>
      <View style={styles.reviewsContainer}>
        {reviewList.map((review) => (
          <ReviewsCard key={review[1]} avatarUri={review[0]} text={review[1]} />
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
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "column",
    padding: SPACING.SM,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  reviewsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
