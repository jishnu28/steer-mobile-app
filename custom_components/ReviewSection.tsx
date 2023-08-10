import { Box, Button, Center, Flex, Heading, Icon } from "native-base";
import ReviewsCard from "./ReviewCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    <Flex flexWrap="wrap" flexDirection="row" justifyContent="center" p={4}>
      <Box w="75%" pb={2} justifyContent={"center"}>
        <Heading>Reviews</Heading>
      </Box>
      <Box w="25%" pb={2}>
        <Button
          bg="#FFAF87"
          borderRadius={100}
          onPress={() => console.log("add review button pressed")}
          leftIcon={
            <Icon
              color="black"
              as={MaterialCommunityIcons}
              name="plus-circle-outline"
              size="8"
            />
          }
        />
      </Box>
      <Flex
        flexWrap="wrap"
        flexDirection="row"
        px="4"
        py="4"
        justifyContent="center"
        bg="#E5E8D9"
        w="100%"
        borderRadius="xl"
      >
        {reviewList.map((review) => (
          <ReviewsCard key={review[1]} avatarUri={review[0]} text={review[1]} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ReviewSection;
