import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, SafeAreaView, StatusBar } from "react-native";
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
        backgroundColor: COLORS.LIGHTACCENT,
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
      }}
    >
      <ExperienceInputs navigation={navigation} />
    </SafeAreaView>
  );
};

export default PostExperience;
