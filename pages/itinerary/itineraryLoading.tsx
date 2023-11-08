import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import COLORS from "../../config/COLORS";
import SPACINGS from "../../config/SPACINGS";
import H1 from "../../custom_components/typography/H1";
import { Icon } from "@rneui/themed";
import ICONSIZES from "../../config/ICONSIZES";
import SimpleStep from "./components/SimpleStep";
import H3 from "../../custom_components/typography/H3";

interface ItineraryLoadingProps {
  navigation: NativeStackNavigationProp<any>;
}

function ItineraryLoading({ navigation }: ItineraryLoadingProps) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <H1 style={{ textAlign: "center" }}>
          Hang tight while we plan your trip!
        </H1>
        <View style={styles.stepsContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.LIGHTACCENT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: SPACINGS.MD,
  },
  stepsContainer: {
    margin: SPACINGS.MD,
  },
  simpleStep: {
    marginVertical: SPACINGS.XL,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACINGS.MD,
    borderRadius: SPACINGS.XL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: COLORS.WHITE,
    marginRight: SPACINGS.SM,
  },
});

export default ItineraryLoading;
