import React, { useState } from "react";
import { Input } from "@rneui/themed";
import H1 from "../../../custom_components/typography/H1";
import H3 from "../../../custom_components/typography/H3";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
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
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";
import SPACINGS from "../../../config/SPACINGS";

const { width } = Dimensions.get("window");

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
    <View>
      <H1 style={{ textAlign: "center" }}>Upload Experience</H1>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.questionBox}>
            <H3>Title</H3>
            <Input
              value={title}
              placeholder="Add a title"
              style={{
                fontFamily: "Bitter-Regular",
                fontSize: 25,
                opacity: 0.6,
                borderBottomColor: COLORS.DARKACCENT,
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
                fontFamily: "Bitter-Regular",
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
            <H3>Address:</H3>
            <Input
              value={address}
              placeholder="Enter.."
              onChangeText={(text) => setAddress(text)}
              style={{
                borderWidth: 0,
                fontFamily: "Bitter-Regular",
                fontSize: 16,
              }}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Price/person:</H3>
            <Input
              value={price.toString()}
              onChangeText={(text) => setPrice(Number(text))}
              style={{
                width: 0.4 * width,
                borderWidth: 0,
                fontFamily: "Bitter-Regular",
                fontSize: 16,
              }}
            />
          </View>

          <View style={styles.questionBox}>
            <H3 style={{ marginBottom: SPACINGS.SM }}>
              How many pax per booking:
            </H3>
            <NumberToggle numItems={numGuests} setNumItems={setNumGuests} />
          </View>
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
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ICONSIZES.LG,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACINGS.MD,
    paddingVertical: SPACINGS.SM,
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
  },
});

export default ExperienceInputs;
