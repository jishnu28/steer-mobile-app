import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
  FormControl,
  Input,
  NativeBaseProvider,
  Slider,
  Switch,
} from "native-base";

const PostExperience = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [owner, setOwner] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [numBeds, setNumBeds] = useState(0);
  const [numBedrooms, setNumBedrooms] = useState(0);
  const [numBaths, setNumBaths] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [accommodationTags, setAccommodationTags] = useState([]);
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    /*
    try {
      await firestore()
        .collection('accommodations')
        .add({
          title,
          price,
          owner,
          numGuests,
          numBeds,
          numBedrooms,
          numBaths,
          isActive,
          hasWifi,
          hasKitchen,
          accommodationTags,
          description,
        });
      alert('Document uploaded successfully!');
    } catch (error) {
      alert('An error occurred while uploading the document.');
    }
    */
    console.log("Upload Experience");
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <View>
          <Text>Upload Experience</Text>
          <FormControl>
            <FormControl.Label>Title</FormControl.Label>
            <Input value={title} onChangeText={(text) => setTitle(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Price</FormControl.Label>
            <Input
              value={price.toString()}
              onChangeText={(text) => setPrice(Number(text))}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Owner</FormControl.Label>
            <Input value={owner} onChangeText={(text) => setOwner(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Number of Guests</FormControl.Label>
            <Slider
              value={numGuests}
              onChange={(value) => setNumGuests(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Number of Beds</FormControl.Label>
            <Slider value={numBeds} onChange={(value) => setNumBeds(value)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Number of Bedrooms</FormControl.Label>
            <Slider
              value={numBedrooms}
              onChange={(value) => setNumBedrooms(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Number of Baths</FormControl.Label>
            <Slider value={numBaths} onChange={(value) => setNumBaths(value)} />
          </FormControl>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Is Active?</Text>
            <Switch
              isChecked={isActive}
              onToggle={() => setIsActive(!isActive)}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Has Wifi?</Text>
            <Switch isChecked={hasWifi} onToggle={() => setHasWifi(!hasWifi)} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Has Kitchen?</Text>
            <Switch
              isChecked={hasKitchen}
              onToggle={() => setHasKitchen(!hasKitchen)}
            />
          </View>
          {/* Add input for experienceTags */}
          {/* Add input for description */}
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default PostExperience;
