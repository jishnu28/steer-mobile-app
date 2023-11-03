import { Flex, Text, HStack, Box } from "native-base";

interface DescriptionSectionProps {
  title: string;
  address: string;
  price: number;
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  title,
  address,
  price,
  description,
}) => {
  return (
    <Flex flexWrap="wrap" flexDirection="row" p="4">
      <HStack
        w="100%"
        justifyContent="center"
        pb={2}
        borderBottomColor="#767C77"
        borderBottomWidth={1}
      >
        <Box w="70%" display="flex" justifyContent="center">
          <Text fontFamily={"Bitter-ExtraBold"} fontSize="3xl">
            {title}
          </Text>
          <Text fontFamily="Bitter-Medium" fontSize="md">
            {address}
          </Text>
        </Box>
        <Box w="30%" display="flex" justifyContent="center">
          <Text fontFamily="Bitter-Medium" fontSize="2xl">
            <Text fontFamily="Bitter-Medium" fontSize="md">
              $
            </Text>
            <Text fontFamily={"Bitter-ExtraBold"} fontSize="4xl">
              {price}
            </Text>
            <Text fontFamily="Bitter-Medium" fontSize="md">
              /night
            </Text>
          </Text>
        </Box>
      </HStack>
      <Box p={4}>
        <Text fontFamily="Bitter-Regular" fontSize={"md"}>
          {description}
        </Text>
      </Box>
    </Flex>
  );
};

export default DescriptionSection;
