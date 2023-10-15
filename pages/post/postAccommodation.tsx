import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import AccommodationInputs from "./components/AccommodationInputs";

interface PostAccommodationProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostAccommodation = ({ navigation }: PostAccommodationProps) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ScrollView>
          <AccommodationInputs navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostAccommodation;
