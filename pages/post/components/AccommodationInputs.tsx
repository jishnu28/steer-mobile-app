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
import { Dimensions } from "react-native";
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

  const [user, loading, error] = useAuthState(firebaseAuth);

  const addImages = async () => {
    let _images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      allowsMultipleSelection: true, // allows multiple images to be selected
    });

    if (_images.assets) {
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

  return (
    <ScrollView py={4} backgroundColor={"#FAF8F0"}>
      <VStack px={4} space={4}>
        <Heading backgroundColor={"red.400"}>Upload Accommodation</Heading>

        <FormControl w={0.9 * width}>
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

        <FormControl w={0.9 * width}>
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

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Tags:
            </Text>
          </FormControl.Label>
          <Input
            value={accommodationTags}
            placeholder="Enter tags separated by commas.."
            onChangeText={(text) => setAccommodationTags(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width}>
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

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Price/night:
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

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16} pb={1}>
              How many visitors can you host:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numGuests} setNumItems={setNumGuests} />
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16} pb={1}>
              Number of Beds:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numBeds} setNumItems={setNumBeds} />
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16} pb={1}>
              Number of Bedrooms:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numBedrooms} setNumItems={setNumBedrooms} />
        </FormControl>

        <FormControl w={0.9 * width}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16} pb={1}>
              Number of Baths:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numBaths} setNumItems={setNumBaths} />
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
      </VStack>
      <Button h={0.1 * height} onPress={() => handleUpload()}>
        Submit
      </Button>
    </ScrollView>
  );
};

export default AccommodationInputs;
