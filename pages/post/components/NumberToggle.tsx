import { HStack, IconButton, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface NumberToggleProps {
  numItems: number;
  setNumItems: (value: number) => void;
}

const NumberToggle = ({ numItems, setNumItems }: NumberToggleProps) => {
  return (
    <HStack alignContent="center" space={4}>
      <IconButton
        w={6}
        h={6}
        borderRadius={100}
        backgroundColor={"#FFAF87"}
        variant="solid"
        _icon={{
          as: MaterialCommunityIcons,
          name: "minus",
        }}
        onPress={() => {
          setNumItems(numItems - 1);
        }}
      />
      <Text fontFamily="Bitter-Medium" fontSize={16}>
        {numItems.toString()}
      </Text>
      <IconButton
        w={6}
        h={6}
        borderRadius={100}
        backgroundColor={"#FFAF87"}
        variant="solid"
        _icon={{
          as: MaterialCommunityIcons,
          name: "plus",
        }}
        onPress={() => {
          setNumItems(numItems + 1);
        }}
      />
    </HStack>
  );
};

export default NumberToggle;
