import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Dimensions } from "react-native";
import { Button, NativeBaseProvider, ScrollView } from "native-base";
import AccommodationInputs from "./components/AccommodationInputs";

interface PostAccommodationProps {
  navigation: NativeStackNavigationProp<any>;
}

const { width, height } = Dimensions.get("window");

const PostAccommodation = ({ navigation }: PostAccommodationProps) => {
  const handleUpload = () => {
    console.log("Uploading Accommodation post");
    // TODO: Handle upload to firebase
    navigation.navigate("postConfirmation", { navigation: navigation });
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ backgroundColor: "#E5E8D9" }}>
        <ScrollView>
          <AccommodationInputs />
          <Button h={0.1 * height} onPress={() => handleUpload()}>
            Submit
          </Button>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostAccommodation;
