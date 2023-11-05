import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import AccommodationInputs from "./components/AccommodationInputs";

interface PostAccommodationProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostAccommodation = ({ navigation }: PostAccommodationProps) => {
  return (
    <SafeAreaView>
      <AccommodationInputs navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostAccommodation;
