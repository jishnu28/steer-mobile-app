import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Dimensions } from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import ExperienceInputs from "./components/ExperienceInputs";

interface PostExperienceProps {
  navigation: NativeStackNavigationProp<any>;
}

const { width, height } = Dimensions.get("window");

const PostExperience = ({ navigation }: PostExperienceProps) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ backgroundColor: "#E5E8D9" }}>
        <ScrollView h={height}>
          <ExperienceInputs navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostExperience;
