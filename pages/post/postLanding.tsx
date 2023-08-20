import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Heading, NativeBaseProvider, VStack } from "native-base";
import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

interface PostLandingProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostLanding = ({ navigation }: PostLandingProps) => {
  const [isAccommodationsSelected, setIsAccommodationsSelected] =
    useState(false);
  const [isExperiencesSelected, setIsExperiencesSelected] = useState(false);

  const handlePress = (buttonTitle: string) => {
    if (buttonTitle === "Accommodations") {
      setIsAccommodationsSelected(true);
      navigation.navigate("postAccommodation");
    } else {
      setIsExperiencesSelected(true);
      navigation.navigate("postExperience");
    }
  };

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
          <Heading justifyContent={"center"}>I'm posting a...</Heading>
          <HStack space={8} style={[styles.container]}>
            <TouchableOpacity
              onPress={() => handlePress("Accommodations")}
              style={[
                styles.button,
                isAccommodationsSelected && styles.selectedButton,
              ]}
            >
              <Image
                source={{
                  width: 100,
                  height: 100,
                  uri: "https://picsum.photos/100/100",
                }}
                style={styles.image}
              />
              <Text style={styles.text}>Accommodations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("Experiences")}
              style={[
                styles.button,
                isExperiencesSelected && styles.selectedButton,
              ]}
            >
              <Image
                source={{
                  width: 100,
                  height: 100,
                  uri: "https://picsum.photos/100/100",
                }}
                style={styles.image}
              />
              <Text style={styles.text}>Experiences</Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 0.4 * width,
    height: 0.4 * width,
    alignItems: "center",
    backgroundColor: "#E5E8D9",
    justifyContent: "center",
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#E5E8D9",
  },
  image: {
    width: 0.25 * width,
    height: 0.25 * width,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostLanding;
