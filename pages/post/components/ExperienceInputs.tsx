import React, { useState } from "react";
import {
  FormControl,
  VStack,
  Input,
  Text,
  Heading,
  View,
  Button,
} from "native-base";
import { Dimensions } from "react-native";
import NumberToggle from "./NumberToggle";
import { Timestamp } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import createExperience, {
  ExperienceData,
} from "../../explore/functions/createExperience";

const { width, height } = Dimensions.get("window");

interface ExperienceInputsProps {
  navigation: NativeStackNavigationProp<any>;
}

const ExperienceInputs = ({ navigation }: ExperienceInputsProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [numGuests, setNumGuests] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [categoryTags, setCategoryTags] = useState<string>("");

  const handleUpload = () => {
    console.log("Uploading Accommodation post");
    // TODO: Handle upload to firebase
    const newExperience: ExperienceData = {
      isActive: isActive,
      owner: "testOwner - this should be replaced with the user's UID",
      title: title,
      description: description,
      images: [],
      //numGuests: numGuests,

      price: price,
      address: address,
      experienceTags: categoryTags.split(", ").map((tag) => tag.trim()),
      postingDate: Timestamp.fromDate(new Date()),
    };
    createExperience(newExperience);
    navigation.navigate("postConfirmation", { navigation: navigation });
  };

  return (
    <View
      h={0.75 * height}
      style={{ flex: 1 }}
      py={4}
      backgroundColor={"#FAF8F0"}
    >
      <VStack px={4}>
        <Heading>Upload Experience</Heading>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Title:
            </Text>
          </FormControl.Label>
          <Input
            value={title}
            placeholder="Enter.."
            onChangeText={(text) => setTitle(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Description:
            </Text>
          </FormControl.Label>
          <Input
            value={description}
            placeholder="Enter.."
            onChangeText={(text) => setDescription(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Address:
            </Text>
          </FormControl.Label>
          <Input
            value={address}
            placeholder="Enter.."
            onChangeText={(text) => setAddress(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Price/person:
            </Text>
          </FormControl.Label>
          <Input
            value={price.toString()}
            placeholder="Enter.."
            onChangeText={(text) => setPrice(Number(text))}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16} pb={1}>
              How many pax per booking:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numGuests} setNumItems={setNumGuests} />
        </FormControl>
      </VStack>
      <Button h={0.1 * height} onPress={() => handleUpload()}>
        Submit
      </Button>
    </View>
  );
};

export default ExperienceInputs;
