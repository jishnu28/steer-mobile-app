import { View, StyleSheet, Switch, ViewStyle } from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import H3 from "../../../custom_components/typography/H3";

interface BooleanToggleProps {
  style?: ViewStyle;
  title: string;
  hasItem: boolean;
  setHasItem: (value: boolean) => void;
}

const BooleanToggle = ({
  style,
  title,
  hasItem,
  setHasItem,
}: BooleanToggleProps) => {
  return (
    <View style={[styles.mainContainer, style]}>
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
    justifyContent: "space-between",
  },
  switchToggle: {
    marginLeft: SPACINGS.MD,
  },
});
