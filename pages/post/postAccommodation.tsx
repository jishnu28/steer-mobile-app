import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import AccommodationInputs from "./components/AccommodationInputs";
import COLORS from "../../config/COLORS";

interface PostAccommodationProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostAccommodation = ({ navigation }: PostAccommodationProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.LIGHTACCENT,
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
      }}
    >
      <AccommodationInputs navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostAccommodation;
