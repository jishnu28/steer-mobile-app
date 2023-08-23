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
import { Dimensions } from "react-native";
import NumberToggle from "./NumberToggle";
import BooleanToggle from "./BooleanToggle";
import createAccommodation, {
  AccommodationData,
} from "../../explore/functions/createAccommodation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";

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

  const handleUpload = () => {
    console.log("Uploading Accommodation post");
    // TODO: Handle upload to firebase
    const newAccommodation: AccommodationData = {
      isActive: isActive,
      owner: "testOwner - this should be replaced with the user's UID",
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
