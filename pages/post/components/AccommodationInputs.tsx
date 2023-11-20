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
import { Tab, Text, TabView } from "@rneui/themed";
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
const { width, height } = Dimensions.get("window");

interface AccommodationInputsProps {
  navigation: NativeStackNavigationProp<any>;
}

const AccommodationInputs = ({ navigation }: AccommodationInputsProps) => {
  const [index, setIndex] = React.useState(0);
  const [indicatorX, setIndicatorX] = useState(0); // for fixing translateX bug with tab component
  const tabWidth = width / 3;
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
  const [sustainabilityFeatures, setSustainabilityFeatures] = useState("");
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
      sustainabilityFeatures: sustainabilityFeatures
        .split(", ")
        .map((tag) => tag.trim()),
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
    <View style={{ flex: 1 }}>
      <H1 style={{ textAlign: "center" }}>Upload Accommodation</H1>
      <View style={{ marginTop: SPACINGS.XL }}>
        <Tab
          value={index}
          onChange={(e) => {
            setIndex(e);
            setIndicatorX(e * tabWidth);
          }}
          disableIndicator={true}
          scrollable={true}
          indicatorStyle={{
            backgroundColor: "white",
            height: 0,
            transform: [{ translateX: indicatorX }], // for fixing translateX bug with tab component
          }}
        >
          <Tab.Item
            title="Part 1"
            titleStyle={(active) =>
              active ? styles.activeTabTitle : styles.inactiveTabTitle
            }
            containerStyle={(active) =>
              active ? styles.activeTabContainer : styles.inactiveTabContainer
            }
          />
          <Tab.Item
            title="Part 2"
            titleStyle={(active) =>
              active ? styles.activeTabTitle : styles.inactiveTabTitle
            }
            containerStyle={(active) =>
              active ? styles.activeTabContainer : styles.inactiveTabContainer
            }
          />
          <Tab.Item
            title="Part 3"
            titleStyle={(active) =>
              active ? styles.activeTabTitle : styles.inactiveTabTitle
            }
            containerStyle={(active) =>
              active ? styles.activeTabContainer : styles.inactiveTabContainer
            }
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={styles.tabView}>
            <ScrollView
              style={styles.mainScrollView}
              contentContainerStyle={{ flexGrow: 1 }}
            >
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
                    placeholder="Add a description"
                    style={styles.placeholder}
                    onChangeText={(text) => setDescription(text)}
                  />
                </View>

                <ScrollView horizontal>
                  {images.map((imageUri, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageUri }}
                      style={{
                        width: 0.2 * width,
                        height: 0.2 * width,
                        margin: SPACINGS.MD,
                      }}
                    />
                  ))}
                </ScrollView>

                <View style={styles.questionBox}>
                  <H3>Address</H3>
                  <Input
                    value={address}
                    placeholder="Enter address"
                    onChangeText={(text) => setAddress(text)}
                    style={styles.placeholder}
                  />
                </View>

                <View style={styles.questionBox}>
                  <H3>Price/night</H3>
                  <Input
                    value={price.toString()}
                    onChangeText={(text) => setPrice(Number(text))}
                    style={styles.placeholder}
                  />
                </View>

                <View style={styles.questionBox}>
                  <H3>Tags</H3>
                  <Input
                    value={accommodationTags}
                    placeholder="Enter tags separated by commas.."
                    onChangeText={(text) => setAccommodationTags(text)}
                    style={styles.placeholder}
                  />
                </View>

                <View style={[styles.questionBox, { paddingBottom: 200 }]}>
                  <H3>Sustainability features</H3>
                  <Input
                    value={accommodationTags}
                    placeholder="Enter tags separated by commas.."
                    onChangeText={(text) => setAccommodationTags(text)}
                    style={styles.placeholder}
                  />
                </View>
              </View>
            </ScrollView>
          </TabView.Item>
          <TabView.Item style={styles.tabView}>
            <ScrollView style={styles.mainScrollView}>
              <View style={styles.mainContainer}>
                <View style={styles.questionBox}>
                  <H3>Number of Guests:</H3>
                  <NumberToggle
                    style={styles.numberToggle}
                    numItems={numGuests}
                    setNumItems={setPositiveNumGuests}
                  />
                </View>

                <View style={styles.questionBox}>
                  <H3>Number of Beds:</H3>
                  <NumberToggle
                    style={styles.numberToggle}
                    numItems={numBeds}
                    setNumItems={setPositiveNumBeds}
                  />
                </View>

                <View style={styles.questionBox}>
                  <H3>Number of Bedrooms:</H3>
                  <NumberToggle
                    style={styles.numberToggle}
                    numItems={numBedrooms}
                    setNumItems={setPositiveNumBedrooms}
                  />
                </View>

                <View style={styles.questionBox}>
                  <H3>Number of Baths:</H3>
                  <NumberToggle
                    style={styles.numberToggle}
                    numItems={numBaths}
                    setNumItems={setPositiveNumBaths}
                  />
                </View>

                <Pressable style={styles.button} onPress={() => addImages()}>
                  <H3 style={styles.buttonText}>Upload Images</H3>
                </Pressable>
              </View>
            </ScrollView>
          </TabView.Item>
          <TabView.Item style={styles.tabView}>
            <ScrollView style={styles.mainScrollView}>
              <View style={styles.mainContainer}>
                <BooleanToggle
                  style={styles.booleanToggle}
                  title={"Has Wifi?"}
                  hasItem={hasWifi}
                  setHasItem={setHasWifi}
                />

                <BooleanToggle
                  style={styles.booleanToggle}
                  title={"Has Heating?"}
                  hasItem={hasHeating}
                  setHasItem={setHasHeating}
                />

                <BooleanToggle
                  style={styles.booleanToggle}
                  title={"Has Waterheater?"}
                  hasItem={hasWaterheater}
                  setHasItem={setHasWaterheater}
                />

                <BooleanToggle
                  style={styles.booleanToggle}
                  title={"Has Kitchen?"}
                  hasItem={hasKitchen}
                  setHasItem={setHasKitchen}
                />

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Pressable
                    style={styles.button}
                    onPress={() => handleUpload()}
                  >
                    <H3 style={styles.buttonText}>Submit</H3>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </TabView.Item>
        </TabView>
      </View>
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
    alignSelf: "center",
    paddingHorizontal: SPACINGS.MD,
    paddingVertical: SPACINGS.MD,
    marginVertical: SPACINGS.MD,
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
  activeTabTitle: {
    color: COLORS.WHITE,
    paddingVertical: SPACINGS.XS,
    paddingHorizontal: SPACINGS.XXS,
    fontFamily: "Bitter-Bold",
  },
  inactiveTabTitle: {
    color: COLORS.PRIMARY,
    paddingVertical: SPACINGS.XS,
    paddingHorizontal: SPACINGS.XXS,
    fontFamily: "Bitter-Medium",
  },
  activeTabContainer: {
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginHorizontal: SPACINGS.SM,
    borderRadius: SPACINGS.XL,
    alignContent: "center",
    justifyContent: "center",
  },
  inactiveTabContainer: {
    backgroundColor: COLORS.LIGHTBG,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginHorizontal: SPACINGS.SM,
    borderRadius: SPACINGS.XL,
    alignContent: "center",
    justifyContent: "center",
  },
  tabView: {
    width: "100%",
    minHeight: height,
    flex: 1,
  },
  mainScrollView: {
    backgroundColor: COLORS.LIGHTBG,
    margin: SPACINGS.MD,
    borderTopLeftRadius: SPACINGS.XL,
    borderTopRightRadius: SPACINGS.XL,
  },
  numberToggle: {
    marginTop: SPACINGS.SM,
    marginBottom: SPACINGS.MD,
  },
  booleanToggle: {
    marginVertical: SPACINGS.MD,
  },
  placeholder: {
    fontFamily: "Bitter-Regular",
    fontSize: 16,
    opacity: 0.75,
  },
});

export default AccommodationInputs;
