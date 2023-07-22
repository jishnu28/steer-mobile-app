import { Badge, Flex, Text, HStack, Box } from "native-base";

const DescriptionSection = () => {
  return (
    <Flex flexWrap="wrap" flexDirection="row" px="4" py="4">
      <HStack
        w="100%"
        px={4}
        justifyContent="center"
        pb={4}
        borderBottomColor="blue.200"
        borderBottomWidth={1}
      >
        <Box w="70%" display="flex" justifyContent="center">
          <Text bold fontSize="3xl">
            Tiny Testing Tent
          </Text>
          <Text fontSize="md">Testing Ave 123</Text>
        </Box>
        <Box w="30%" display="flex" justifyContent="center">
          <Text fontSize="3xl">
            <Text fontSize="md">$</Text>
            <Text bold fontSize="4xl">
              30
            </Text>
            <Text fontSize="md">/night</Text>
          </Text>
        </Box>
      </HStack>
      <Box px="4" py="4">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          sollicitudin tincidunt neque ut ultrices. Nulla neque magna, elementum
          et tellus id, dapibus accumsan dolor.
        </Text>
      </Box>
    </Flex>
  );
};

export default DescriptionSection;
