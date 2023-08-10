import React from "react";
import { Avatar, Box, Flex, HStack, Text } from "native-base";
import { Dimensions } from "react-native";

interface ReviewsCardProps {
  avatarUri: string;
  text: string;
}

const { width, height } = Dimensions.get("screen");

const ReviewCard: React.FC<ReviewsCardProps> = ({ avatarUri, text }) => {
  return (
    <HStack bg={"#FFF8F5"} px={4} my={2} py={4} borderRadius="xl" w="100%">
      <Box>
        <Avatar source={{ uri: avatarUri }} mr={4} />
      </Box>
      <Box pr="20%">
        <Text>{text}</Text>
      </Box>
    </HStack>
  );
};

export default ReviewCard;
