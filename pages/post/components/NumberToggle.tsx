import { StyleSheet, Pressable, View, ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";
import FONTSIZES from "../../../config/FONTSIZES";
import SPACINGS from "../../../config/SPACINGS";

interface NumberToggleProps {
  numItems: number;
  setNumItems: (value: number) => void;
  min?: number;
  max?: number;
  style?: ViewStyle;
}

function decrement(num: number, min?: number) {
  if (min && num - 1 < min) {
    return min;
  } else {
    return num - 1;
  }
}

function increment(num: number, max?: number) {
  if (max && num >= max) {
    return max;
  } else {
    return num + 1;
  }
}

const NumberToggle = ({
  numItems,
  setNumItems,
  min,
  max,
  style,
}: NumberToggleProps) => {
  return (
    <View style={[styles.mainContainer, style]}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setNumItems(decrement(numItems, min));
        }}
      >
        <Icon
          color={COLORS.WHITE}
          type="material-community"
          name="minus"
          size={ICONSIZES.XS}
        />
      </Pressable>
      <BodyText style={styles.numberText}>{numItems.toString()}</BodyText>
      <Pressable
        style={styles.button}
        onPress={() => {
          setNumItems(increment(numItems, max));
        }}
      >
        <Icon
          color={COLORS.WHITE}
          type="material-community"
          name="plus"
          size={ICONSIZES.XS}
        />
      </Pressable>
    </View>
  );
};

export default NumberToggle;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    width: ICONSIZES.XS,
    height: ICONSIZES.XS,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: FONTSIZES.MD,
    paddingHorizontal: SPACINGS.MD,
  },
});
