import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import ExperienceInputs from "./components/ExperienceInputs";

interface PostExperienceProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostExperience = ({ navigation }: PostExperienceProps) => {
  return (
    <SafeAreaView>
      <ExperienceInputs navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostExperience;
