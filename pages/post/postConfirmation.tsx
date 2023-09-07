import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  CheckCircleIcon,
  Heading,
  NativeBaseProvider,
  VStack,
} from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";

interface PostConfirmationProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostConfirmation = ({ navigation }: PostConfirmationProps) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F8FAF0",
          justifyContent: "center",
        }}
      >
        <VStack space={5} alignItems={"center"}>
          <Heading justifyContent={"center"}>
            Your post has been uploaded!
          </Heading>
          <CheckCircleIcon size="20" color="#9CADA4" />
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostConfirmation;
