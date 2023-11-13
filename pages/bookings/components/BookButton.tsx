import { FAB, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";

const BookButton: React.FC = () => {
  const handleReservePress = () => {
    // to implement reservation logic
  };

  return (
    <FAB
      style={styles.fab}
      color={COLORS.PRIMARY}
      placement="right"
      size="large"
      title="Reserve"
      onPress={handleReservePress}
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
};

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
