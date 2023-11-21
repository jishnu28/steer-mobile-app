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
import BodyText from "../../../custom_components/typography/BodyText";

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
  const [images, setImages] = useState<string[]>([]); // Stores urls for images uploaded to firebase storage

  const [user, loading, error] = useAuthState(firebaseAuth);

  const addImages = async () => {
    console.log("called addImages");
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
    });

    if (!_image.canceled) {
      saveExperienceImages(_image.assets[0]);
    }
  };

  const saveExperienceImages = async (
    saved_image: ImagePicker.ImagePickerAsset
  ) => {
    try {
      console.log("called saveExperienceImages");
      //Uploads image to firebase storage
      const imageId = uuidv4();
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", saved_image.uri, true);
        xhr.send(null);
      });
      console.log("blob created");
      const imageRef = storageRef(
        firebaseStorage,
        `images/experienceImages/${user!.uid}/${imageId}}`
      );
      try {
        console.log("imageRef:", imageRef);
        console.log("blob:", blob);
        await uploadBytes(imageRef, blob);
        console.log("image uploaded");
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      //Update image's url link in images array
      const url = await getDownloadURL(imageRef);
      setImages([...images, url]);
      console.log("image url added to images array");
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
      owner: user?.uid ?? "owner id could not be obtained",
      title: title,
      description: description,
      images: images,
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
              style={styles.placeholder}
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Description:</H3>
            <Input
              value={description}
              placeholder="Add description"
              style={styles.placeholder}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Address:</H3>
            <Input
              value={address}
              placeholder="Enter.."
              onChangeText={(text) => setAddress(text)}
              style={styles.placeholder}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Tags</H3>
            <Input
              value={categoryTags}
              placeholder="Enter tags separated by commas.."
              onChangeText={(text) => setCategoryTags(text)}
              style={styles.placeholder}
            />
          </View>

          <View style={styles.questionBox}>
            <H3>Price/person:</H3>
            <Input
              value={price.toString()}
              onChangeText={(text) => setPrice(Number(text))}
              style={styles.placeholder}
            />
          </View>

          <View style={styles.questionBox}>
            <H3 style={{ marginBottom: SPACINGS.SM }}>
              How many pax per booking:
            </H3>
            <NumberToggle
              style={styles.numberToggle}
              numItems={numGuests}
              setNumItems={setNumGuests}
            />
          </View>

          <Pressable style={styles.button} onPress={() => addImages()}>
            <H3 style={styles.buttonText}>Upload Image</H3>
          </Pressable>
          <BodyText style={{ alignSelf: "center" }}>
            *Upload 1 image at a time
          </BodyText>

          <ScrollView horizontal>
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={{
                  width: 0.2 * width,
                  height: 0.2 * width,
                  margin: SPACINGS.MD,
                }}
              />
            ))}
          </ScrollView>

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
    alignSelf: "center",
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
    backgroundColor: COLORS.LIGHTBG,
    margin: SPACINGS.MD,
    marginTop: SPACINGS.XL,
    borderRadius: SPACINGS.XL,
  },
  numberToggle: {
    marginTop: SPACINGS.SM,
    marginBottom: SPACINGS.MD,
  },
  placeholder: {
    fontFamily: "Bitter-Regular",
    fontSize: 16,
    opacity: 0.75,
  },
});

export default ExperienceInputs;
