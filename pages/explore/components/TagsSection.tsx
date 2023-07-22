import { Badge, Flex } from "native-base";

const tagList: string[] = [
  "Cosy",
  "Budget-friendly",
  "Has wi-fi",
  "Kid-friendly",
  "Rustic",
];

const AmenitiesSection = () => {
  return (
    <Flex flexWrap="wrap" flexDirection="row" px="4" py="4">
      {tagList.map((tag) => (
        <Badge
          key={tag}
          mr="4"
          minHeight="8"
          mb="2"
          variant="outline"
          borderColor="amber.700"
          borderRadius="md"
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
};

export default AmenitiesSection;
