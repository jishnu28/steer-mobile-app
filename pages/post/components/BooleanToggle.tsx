import { View, StyleSheet, Switch } from "react-native";
import BodyText from "../../../custom_components/typography/BodyText";
import SPACINGS from "../../../config/SPACINGS";

interface BooleanToggleProps {
  title: string;
  hasItem: boolean;
  setHasItem: (value: boolean) => void;
}

const BooleanToggle = ({ title, hasItem, setHasItem }: BooleanToggleProps) => {
  return (
    <View style={styles.mainContainer}>
      <BodyText>{title}</BodyText>
      <Switch
        style={styles.switchToggle}
        value={hasItem}
        onChange={() => setHasItem(!hasItem)}
      />
    </View>
  );
};

export default BooleanToggle;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchToggle: {
    marginLeft: SPACINGS.MD,
  },
});
