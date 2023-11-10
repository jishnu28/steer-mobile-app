import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import ExperienceInputs from "./components/ExperienceInputs";
import COLORS from "../../config/COLORS";

interface PostExperienceProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostExperience = ({ navigation }: PostExperienceProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.LIGHTBG,
      }}
    >
      <ExperienceInputs navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostExperience;
