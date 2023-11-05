import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
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
        backgroundColor: COLORS.LIGHTBG,
      }}
    >
      <AccommodationInputs navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostAccommodation;
