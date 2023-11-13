import React, { useState } from "react";
import { Input } from "@rneui/themed";
import H1 from "../../../custom_components/typography/H1";
import * as ImagePicker from "expo-image-picker";
import {
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  View,
  ScrollView,
} from "react-native";
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
import COLORS from "../../../config/COLORS";
import SPACINGS from "../../../config/SPACINGS";
import H3 from "../../../custom_components/typography/H3";
import ICONSIZES from "../../../config/ICONSIZES";
const { width } = Dimensions.get("window");

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
  const [images, setImages] = useState<string[]>([]); // Stores urls for images uploaded to firebase storage

  const [user, loading, error] = useAuthState(firebaseAuth);

  const addImages = async () => {
    let _images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      allowsMultipleSelection: true, // allows multiple images to be selected
    });

    if (_images.assets) {
      const firstImage = _images.assets[0];

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
      owner: user?.uid ?? "owner id could not be obtained",
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
    <View>
      <H1 style={{ textAlign: "center" }}>Upload Accommodation</H1>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.questionBox}>
            <H3>Title</H3>
            <Input
              value={title}
              placeholder="Add a title"
              style={{
                borderBottomColor: COLORS.DARKACCENT,
                fontFamily: "Bitter-Bold",
                fontSize: 25,
                opacity: 0.6,
              }}
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Description:</H3>
            <Input
              value={description}
              placeholder="Add description"
              style={{
                borderWidth: 0,
                fontFamily: "Bitter-Bold",
                fontSize: 20,
                opacity: 0.6,
              }}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <Pressable style={styles.button} onPress={() => addImages()}>
            <H3 style={styles.buttonText}>Upload Images</H3>
          </Pressable>

          <ScrollView horizontal>
            {images.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200, marginRight: 10 }}
              />
            ))}
          </ScrollView>

          <View style={styles.questionBox}>
            <H3>Tags</H3>
            <Input
              value={accommodationTags}
              placeholder="Enter tags separated by commas.."
              onChangeText={(text) => setAccommodationTags(text)}
              style={{
                fontFamily: "Bitter-Regular",
                fontSize: 16,
                opacity: 0.6,
                borderWidth: 0,
              }}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Address</H3>
            <Input
              value={address}
              placeholder="Enter address"
              onChangeText={(text) => setAddress(text)}
              style={{
                fontFamily: "Bitter-Regular",
                fontSize: 16,
                opacity: 0.6,
                borderWidth: 0,
              }}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Price/night</H3>
            <Input
              value={price.toString()}
              onChangeText={(text) => setPrice(Number(text))}
              style={{
                fontFamily: "Bitter-Regular",
                fontSize: 16,
                opacity: 0.6,
                borderWidth: 0,
                width: 0.4 * width,
              }}
            />
          </View>

          <View style={[styles.questionBox, { flexDirection: "row" }]}>
            <H3>I can host</H3>
            <NumberToggle
              style={{ paddingHorizontal: SPACINGS.SM }}
              numItems={numGuests}
              setNumItems={setPositiveNumGuests}
            />
            <H3>visitors</H3>
          </View>

          <View style={styles.questionBox}>
            <H3>Number of Beds:</H3>
            <NumberToggle
              style={{ marginVertical: SPACINGS.SM }}
              numItems={numBeds}
              setNumItems={setPositiveNumBeds}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Number of Bedrooms:</H3>
            <NumberToggle
              style={{ marginVertical: SPACINGS.SM }}
              numItems={numBedrooms}
              setNumItems={setPositiveNumBedrooms}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Number of Baths:</H3>
            <NumberToggle
              style={{ marginVertical: SPACINGS.SM }}
              numItems={numBaths}
              setNumItems={setPositiveNumBaths}
            />
          </View>

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

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable style={styles.button} onPress={() => handleUpload()}>
              <H3 style={styles.buttonText}>Submit</H3>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ICONSIZES.LG,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACINGS.MD,
    paddingVertical: SPACINGS.MD,
    maxWidth: 0.5 * width,
  },
  buttonText: {
    color: COLORS.LIGHTBG,
  },
  questionBox: {
    flexDirection: "column",
    padding: SPACINGS.SM,
  },
  mainContainer: {
    flexDirection: "column",
    padding: SPACINGS.MD,
    paddingBottom: SPACINGS.XXL,
  },
});

export default AccommodationInputs;
