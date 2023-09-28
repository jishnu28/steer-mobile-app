import React, { useState } from "react";
import {
  FormControl,
  VStack,
  Input,
  Text,
  Heading,
  ScrollView,
  Button,
  HStack,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Dimensions, StyleSheet, Image } from "react-native";
import NumberToggle from "./NumberToggle";
import BooleanToggle from "./BooleanToggle";
import createAccommodation, {
  AccommodationData,
} from "../../explore/functions/createAccommodation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseStorage } from "../../../firebaseConfig";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
const { width, height } = Dimensions.get("window");

interface AccommodationInputsProps {
  navigation: NativeStackNavigationProp<any>;
}

const AccommodationInputs = ({ navigation }: AccommodationInputsProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [numGuests, setNumGuests] = useState(0);
  const [numBeds, setNumBeds] = useState(0);
  const [numBedrooms, setNumBedrooms] = useState(0);
  const [numBaths, setNumBaths] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasHeating, setHasHeating] = useState(false);
  const [hasWaterheater, setHasWaterheater] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [accommodationTags, setAccommodationTags] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  const [user, loading, error] = useAuthState(firebaseAuth);

  const addImages = async () => {
    let _images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      allowsMultipleSelection: true, // allows multiple images to be selected
    });

    if (_images.assets) {
      const firstImage = _images.assets[0];
      setSelectedImageUri(firstImage.uri);

      _images.assets.forEach((image) => {
        saveAccommodationImages(image);
      });
    }
  };

  const saveAccommodationImages = async (saved_image: any) => {
    try {
      //Uploads image to firebase storage
      const imageId = uuidv4();
      const response = await fetch(saved_image.uri);
      const blob = await response.blob();
      const imageRef = storageRef(
        firebaseStorage,
        `images/accommodationImages/${user!.uid}/${imageId}}`
      );
      await uploadBytes(imageRef, blob);

      //Update image's url link in images array
      const url = await getDownloadURL(imageRef);
      setImages([...images, url]);
    } catch (error) {
      console.error(
        "Error updating profile pic to accommodations collection:",
        error
      );
    }
  };

  const handleUpload = () => {
    const newAccommodation: AccommodationData = {
      isActive: isActive,
      owner:
        user?.uid ??
        "default owner id - an error occurred while uploading this accommodation",
      title: title,
      description: description,
      images: [],
      numGuests: numGuests,
      numBeds: numBeds,
      numBaths: numBaths,
      numBedrooms: numBedrooms,
      price: price,
      address: address,
      hasWifi: hasWifi,
      hasKitchen: hasKitchen,
      hasHeating: hasHeating,
      hasWaterheater: hasWaterheater,
      accommodationTags: accommodationTags.split(", ").map((tag) => tag.trim()),
      postingDate: Timestamp.fromDate(new Date()),
    };
    createAccommodation(newAccommodation);
    navigation.navigate("postConfirmation", { navigation: navigation });
  };

  const setPositiveNumGuests = (numGuests: number) => {
    const positiveValue = Math.max(numGuests, 0);
    setNumGuests(positiveValue);
  };

  const setPositiveNumBeds = (numBeds: number) => {
    const positiveValue = Math.max(numBeds, 0);
    setNumBeds(positiveValue);
  };

  const setPositiveNumBedrooms = (numBedrooms: number) => {
    const positiveValue = Math.max(numBedrooms, 0);
    setNumBedrooms(positiveValue);
  };

  const setPositiveNumBaths = (numBaths: number) => {
    const positiveValue = Math.max(numBaths, 0);
    setNumBaths(positiveValue);
  };

  return (
    <ScrollView py={4}>
      <VStack px={4} space={4}>
        <Heading style={styles.title}>Upload Accommodation</Heading>
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

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text style={styles.text} fontSize={16}>
              Tags
            </Text>
          </FormControl.Label>
          <Input
            value={accommodationTags}
            placeholder="Enter tags separated by commas.."
            borderWidth={0}
            borderRadius={20}
            onChangeText={(text) => setAccommodationTags(text)}
            style={{
              fontFamily: "Bitter-Regular",
              fontSize: 16,
              opacity: 0.6,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            }}
          />
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text style={styles.text} fontSize={16}>
              Address
            </Text>
          </FormControl.Label>
          <Input
            value={address}
            placeholder="Enter address"
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

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text style={styles.text} fontSize={16}>
              Price/night
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

        <FormControl w={0.9 * width}>
          <HStack>
            <Text style={styles.text} marginRight={2}>
              I can host
            </Text>
            <NumberToggle
              numItems={numGuests}
              setNumItems={setPositiveNumGuests}
            />
            <Text style={styles.text} marginLeft={2}>
              visitors
            </Text>
          </HStack>
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text style={styles.text} marginRight={2} pb={1}>
              Number of Beds:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numBeds} setNumItems={setPositiveNumBeds} />
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text style={styles.text} marginRight={2} pb={1}>
              Number of Bedrooms:
            </Text>
          </FormControl.Label>
          <NumberToggle
            numItems={numBedrooms}
            setNumItems={setPositiveNumBedrooms}
          />
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text style={styles.text} marginRight={2} pb={1}>
              Number of Baths:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numBaths} setNumItems={setPositiveNumBaths} />
        </FormControl>

        <BooleanToggle
          title={"Has Wifi?"}
          hasItem={hasWifi}
          setHasItem={setHasWifi}
        />

        <BooleanToggle
          title={"Has Heating?"}
          hasItem={hasHeating}
          setHasItem={setHasHeating}
        />

        <BooleanToggle
          title={"Has Waterheater?"}
          hasItem={hasWaterheater}
          setHasItem={setHasWaterheater}
        />

        <BooleanToggle
          title={"Has Kitchen?"}
          hasItem={hasKitchen}
          setHasItem={setHasKitchen}
        />

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

export default AccommodationInputs;
