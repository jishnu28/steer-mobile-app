import { View, StyleSheet, Switch } from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import H3 from "../../../custom_components/typography/H3";

interface BooleanToggleProps {
  title: string;
  hasItem: boolean;
  setHasItem: (value: boolean) => void;
}

const BooleanToggle = ({ title, hasItem, setHasItem }: BooleanToggleProps) => {
  return (
    <View style={styles.mainContainer}>
      <H3>{title}</H3>
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
