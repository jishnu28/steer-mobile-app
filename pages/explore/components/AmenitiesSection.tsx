import { Flex } from "native-base";
import AmenitiesCard from "./AmenitiesCard";
import React from "react";

interface AmenitiesSectionProps {
  hasWifi: boolean;
  numBeds: number;
  hasKitchen: boolean;
  numBedrooms: number;
  hasHeating: boolean;
  numBaths: number;
  hasWaterHeater: boolean;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  hasWifi,
  numBeds,
  hasKitchen,
  numBedrooms,
  hasHeating,
  numBaths,
  hasWaterHeater,
}) => {
  const [finalAmenitiesList, setFinalAmenitiesList] = React.useState<
    string[][]
  >([
    ["bed-king-outline", "0 Beds"],
    ["door-open", "0 Bedrooms"],
    ["shower", "0 Bathrooms"],
  ]);

  React.useEffect(() => {
    let amenitiesList: string[][] = [
      ["bed-king-outline", "0 Beds"],
      ["door-open", "0 Bedrooms"],
      ["shower", "0 Bathrooms"],
    ];

    // TODO: Refactor this to be more DRY
    if (numBeds > 0) {
      amenitiesList[0][1] = `${numBeds} Beds`;
    }
    if (numBedrooms > 0) {
      amenitiesList[1][1] = `${numBedrooms} Bedrooms`;
    }
    if (numBaths > 0) {
      amenitiesList[2][1] = `${numBaths} Bathrooms`;
    }
    if (hasWifi) {
      amenitiesList.push(["wifi", "Wi-fi"]);
    }
    if (hasKitchen) {
      amenitiesList.push(["chef-hat", "Kitchen"]);
    }
    if (hasHeating) {
      amenitiesList.push(["fireplace", "Heating"]);
    }
    if (hasWaterHeater) {
      amenitiesList.push(["water-boiler", "Water-heater"]);
    }
    setFinalAmenitiesList(amenitiesList);
  }, [
    hasWifi,
    numBeds,
    hasKitchen,
    numBedrooms,
    hasHeating,
    numBaths,
    hasWaterHeater,
  ]);

  return (
    <Flex flexWrap="wrap" flexDirection="row" p={4}>
      {finalAmenitiesList.map((amenity) => (
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
