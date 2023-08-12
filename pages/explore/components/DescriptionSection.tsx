import { Badge, Flex, Text, HStack, Box } from "native-base";

const DescriptionSection = () => {
  return (
    <Flex flexWrap="wrap" flexDirection="row" p="4">
      <HStack
        w="100%"
        px={4}
        justifyContent="center"
        pb={2}
        borderBottomColor="#767C77"
        borderBottomWidth={1}
      >
        <Box w="70%" display="flex" justifyContent="center">
          <Text bold fontSize="3xl">
            Tiny Testing Tent
          </Text>
          <Text fontSize="md">Testing Ave 123</Text>
        </Box>
        <Box w="30%" display="flex" justifyContent="center">
          <Text fontSize="2xl">
            <Text fontSize="md">$</Text>
            <Text bold fontSize="4xl">
              30
            </Text>
            <Text fontSize="md">/night</Text>
          </Text>
        </Box>
      </HStack>
      <Box p={4}>
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
