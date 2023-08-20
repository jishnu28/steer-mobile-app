import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, Icon, NativeBaseProvider, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        <VStack space={10} alignItems={"center"}>
          <Heading justifyContent={"center"}>
            Your post has been uploaded!
          </Heading>
          <Icon
            mb="1"
            paddingTop="5%"
            as={<MaterialCommunityIcons name={"check-circle-outline"} />}
            color="white"
            size="3xl"
          />
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostConfirmation;
