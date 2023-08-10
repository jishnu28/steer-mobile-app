import { Box, Flex, Heading } from "native-base";
import AmenitiesCard from "./AmenitiesCard";

const amenitiesList: string[][] = [
  ["wifi", "Wi-fi"],
  ["bed-king-outline", "2 Beds"],
  ["door-open", "2 Bedrooms"],
  ["shower", "1 Bathrooms"],
  ["chef-hat", "Kitchen"],
  ["fireplace", "Heating"],
  ["water-boiler", "Water-heater"],
];

const AmenitiesSection = () => {
  return (
    <Flex flexWrap="wrap" flexDirection="row" p={4}>
      {amenitiesList.map((amenity) => (
        <AmenitiesCard
          key={amenity[0]}
          iconName={amenity[0]}
          text={amenity[1]}
        />
      ))}
    </Flex>
  );
};

export default AmenitiesSection;
