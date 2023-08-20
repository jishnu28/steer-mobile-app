import { HStack, Text, Switch } from "native-base";

interface BooleanToggleProps {
  title: string;
  hasItem: boolean;
  setHasItem: (value: boolean) => void;
}

const BooleanToggle = ({ title, hasItem, setHasItem }: BooleanToggleProps) => {
  return (
    <HStack p={2} space={4} alignContent={"center"}>
      <Text fontFamily="Bitter-Medium" fontSize={16}>
        {title}
      </Text>
      <Switch onToggle={() => setHasItem(!hasItem)} size="md" />
    </HStack>
  );
};

export default BooleanToggle;
