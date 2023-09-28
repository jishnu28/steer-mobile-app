import React, { useState } from "react";
import {
  FormControl,
  VStack,
  Input,
  Text,
  Heading,
  ScrollView,
  Button,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Dimensions, StyleSheet, Image } from "react-native";
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
    <ScrollView py={4}>
      <VStack px={4} space={4}>
        <Heading style={styles.title}>Upload Experience</Heading>

        <FormControl w={0.9 * width}>
          {/* <FormControl.Label>
            <Text fontFamily={"Bitter-Regular"} fontSize={16}>
              Title
            </Text>
          </FormControl.Label> */}
          <Input
            value={title}
            placeholder="Add a title"
            borderBottomColor={"muted.300"}
            borderTopColor={"text.100"}
            borderLeftColor={"text.100"}
            borderRightColor={"text.100"}
            style={{
              fontFamily: "Bitter-Bold",
              fontSize: 25,
              opacity: 0.6,
            }}
            onChangeText={(text) => setTitle(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width}>
          {/* <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Description:
            </Text>
          </FormControl.Label> */}
          <Input
            value={description}
            placeholder="Add description"
            borderWidth={0}
            style={{
              fontFamily: "Bitter-Bold",
              fontSize: 20,
              opacity: 0.6,
            }}
            onChangeText={(text) => setDescription(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} justifyItems={"center"}>
          <Button
            h={0.05 * height}
            w={0.5 * width}
            backgroundColor={"#FFAF87"}
            onPress={() => addImages()}
            borderRadius={20}
          >
            <Text style={styles.button}>Upload Images</Text>
          </Button>
        </FormControl>

        <ScrollView horizontal>
          {images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200, marginRight: 10 }}
            />
          ))}
        </ScrollView>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text style={styles.text} fontSize={16}>
              Address:
            </Text>
          </FormControl.Label>
          <Input
            value={address}
            placeholder="Enter.."
            borderWidth={0}
            borderRadius={20}
            onChangeText={(text) => setAddress(text)}
            style={{
              fontFamily: "Bitter-Regular",
              fontSize: 16,
              opacity: 0.6,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            }}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text style={styles.text} fontSize={16}>
              Price/person:
            </Text>
          </FormControl.Label>
          <Input
            value={price.toString()}
            width={100}
            borderWidth={0}
            borderRadius={20}
            onChangeText={(text) => setPrice(Number(text))}
            style={{
              fontFamily: "Bitter-Regular",
              fontSize: 16,
              opacity: 0.6,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            }}
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
            <Text style={styles.text} fontSize={16} pb={1}>
              How many pax per booking:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numGuests} setNumItems={setNumGuests} />
        </FormControl>
        <FormControl
          w={0.9 * width}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Button
            h={0.06 * height}
            w={0.5 * width}
            backgroundColor={"#FFAF87"}
            borderRadius={20}
            marginTop={10}
            onPress={() => handleUpload()}
          >
            <Text style={styles.button}>Submit</Text>
          </Button>
        </FormControl>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Bitter-Bold",
    fontSize: 25,
    marginTop: 20,
    opacity: 0.6,
  },
  text: {
    fontFamily: "Bitter-Bold",
    fontSize: 16,
    opacity: 0.6,
  },
  button: {
    fontFamily: "Bitter-Bold",
    fontSize: 16,
    color: "white",
  },
});

export default ExperienceInputs;
