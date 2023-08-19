import React from "react";
import { HStack, Icon, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AmenitiesCardProps {
  iconName: any;
  text: string;
}

const AmenitiesCard = ({ iconName, text }: AmenitiesCardProps) => {
  return (
    <HStack w="40%" mx={4}>
      <Icon
        as={<MaterialCommunityIcons name={iconName} />}
        color="#767C77"
        size="lg"
        my={1}
        mr={2}
      />
      <Text my={1} px={1} fontFamily="Bitter-Regular" fontSize={"lg"}>
        {text}
      </Text>
    </HStack>
  );
};

export default AmenitiesCard;
