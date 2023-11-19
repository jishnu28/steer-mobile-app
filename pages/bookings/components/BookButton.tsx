import { FAB, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";

interface BookButtonProps {
  onPress: () => void;
}

function BookButton(props: BookButtonProps) {
  return (
    <FAB
      style={styles.fab}
      color={COLORS.PRIMARY}
      placement="right"
      size="large"
      title="Reserve"
      onPress={props.onPress}
      icon={
        <Icon
          type="material-community"
          name="calendar-check"
          color={COLORS.WHITE}
          size={ICONSIZES.XS}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: SPACINGS.XS },
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default BookButton;
