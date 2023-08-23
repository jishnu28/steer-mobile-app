import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Dimensions } from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import AccommodationInputs from "./components/AccommodationInputs";

interface PostAccommodationProps {
  navigation: NativeStackNavigationProp<any>;
}

const { width, height } = Dimensions.get("window");

const PostAccommodation = ({ navigation }: PostAccommodationProps) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ backgroundColor: "#E5E8D9" }}>
        <ScrollView>
          <AccommodationInputs navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostAccommodation;
