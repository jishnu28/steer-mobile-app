import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Heading, Icon, NativeBaseProvider, VStack } from "native-base";
import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      navigation.navigate("postAccommodation", { navigation: navigation });
    } else {
      setIsExperiencesSelected(true);
      navigation.navigate("postExperience", { navigation: navigation });
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
          <Heading justifyContent={"center"} style={styles.titleText}>I'm posting an...</Heading>
          <HStack space={8} style={[styles.container]}>
            <TouchableOpacity
              onPress={() => handlePress("Accommodations")}
              style={[
                styles.button,
                isAccommodationsSelected && styles.selectedButton,
              ]}
            >
              <Icon
                paddingTop="5%"
                as={<MaterialCommunityIcons name="home-group" />}
                color="#88838A"
                size={70}
                my={2}
              />
              <Text style={styles.text}>Accommodation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("Experiences")}
              style={[
                styles.button,
                isExperiencesSelected && styles.selectedButton,
              ]}
            >
              <Icon
                paddingTop="5%"
                as={<MaterialCommunityIcons name="forest" />}
                color="#88838A"
                size={70}
                my={2}
              />
              <Text style={styles.text}>Experience</Text>
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
  titleText: {
    fontFamily: "Bitter-Bold",
    fontSize: 25,
    opacity: 0.6,
  },
  text: {
    fontFamily: "Bitter-Bold",
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.5,
  }
});

export default PostLanding;
