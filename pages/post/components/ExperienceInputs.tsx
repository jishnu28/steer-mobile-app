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
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Dimensions } from "react-native";
import NumberToggle from "./NumberToggle";
import { Timestamp } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import createExperience, {
  ExperienceData,
} from "../../explore/functions/createExperience";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseStorage } from "../../../firebaseConfig";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

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
  const [images, setImages] = useState<string[]>([]);

  const [user, loading, error] = useAuthState(firebaseAuth);

  const addImages = async () => {
    let _images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      allowsMultipleSelection: true, // allows multiple images to be selected
    });

    if (_images.assets) {
      _images.assets.forEach((image) => {
        saveExperienceImages(image);
      });
    }
  };

  const saveExperienceImages = async (saved_image: any) => {
    try {
      //Uploads image to firebase storage
      const imageId = uuidv4();
      const response = await fetch(saved_image.uri);
      const blob = await response.blob();
      const imageRef = storageRef(
        firebaseStorage,
        `images/experienceImages/${user!.uid}/${imageId}}`
      );
      await uploadBytes(imageRef, blob);

      //Update image's url link in images array
      const url = await getDownloadURL(imageRef);
      setImages([...images, url]);
    } catch (error) {
      console.error(
        "Error updating profile pic to experiences collection:",
        error
      );
    }
  };

  const handleUpload = () => {
    const newExperience: ExperienceData = {
      isActive: isActive,
      owner:
        user?.uid ??
        "default owner id - an error occurred while uploading this accommodation",
      title: title,
      description: description,
      images: [],
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

        <FormControl w={0.9 * width} justifyItems={"center"}>
          <Button
            h={0.05 * height}
            w={0.5 * width}
            backgroundColor={"#FFAF87"}
            onPress={() => addImages()}
          >
            Upload Images
          </Button>
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
