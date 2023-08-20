import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Dimensions } from "react-native";
import { Button, NativeBaseProvider, ScrollView } from "native-base";
import ExperienceInputs from "./components/ExperienceInputs";

interface PostExperienceProps {
  navigation: NativeStackNavigationProp<any>;
}

const { width, height } = Dimensions.get("window");

const PostExperience = ({ navigation }: PostExperienceProps) => {
  const handleUpload = () => {
    console.log("Uploading Experience post");
    // TODO: Handle upload to firebase
    navigation.navigate("postConfirmation", { navigation: navigation });
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ backgroundColor: "#E5E8D9" }}>
        <ScrollView h={height}>
          <ExperienceInputs />
          <Button h={0.1 * height} onPress={() => handleUpload()}>
            Submit
          </Button>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostExperience;
