import React from "react";
import { NativeBaseProvider } from "native-base";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostsTabView from "./posts";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RootStackParamList = {
  Profile: undefined;
  Edit: undefined;
};

type profilePageScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type Props = {
  navigation: profilePageScreenNavigationProp;
};

const ProfilePage = ({ navigation }: Props) => {
  //Code for profile pic upload
  const [image, setImage] = React.useState("");
  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status != "granted") {
      alert(
        "Please enable camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions have been granted");
    }
  };

  React.useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //determines the type of file used: Image, video or both
      allowsEditing: true, //provides an editing interface to crop/edit image after it is selected from photo library
      aspect: [1, 1], //speciifies the fixed aspect ratio for your cropped image
      quality: 1, //controls quality of the selected image, value between 0 to 1, which 1 denoting highest quality
    });
    if (!_image.cancelled) {
      //checks that the user doesn't close photo library before selecting an image
      setImage(_image.uri ?? "");
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {/* Profile Info */}
        <View style={[styles.profile, { flex: 2 }]}>
          {/* Profile Pic */}
          <View>
            {image == "" && (
              <MaterialCommunityIcons
                name="account-circle"
                size={140}
                color="#88838A"
              />
            )}
            {image != "" && (
              <Image source={{ uri: image }} style={styles.profilePic} />
            )}
            <TouchableOpacity onPress={addImage} style={styles.editProfilePic}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={36}
                color="#FFAF87"
              />
            </TouchableOpacity>
          </View>
          {/* Profile Info */}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.profileText}>My username</Text>
            <Text style={styles.profileText}>ID: 12345678</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit")}
              style={styles.button}
            >
              <Text style={styles.profileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts */}
        <View style={[styles.posts, { flex: 4 }]}>
          <PostsTabView />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    alignItems: "center",
    justifyContent: "center",
  },

  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#88838A",
  },

  editProfilePic: {
    position: "absolute",
    left: "75%",
    bottom: "5%",
  },

  profileText: {
    // fontFamily: 'Bitter',
    fontSize: 18,
    fontWeight: "600",
    color: "#88838A",
    marginVertical: 1,
    marginHorizontal: 5,
  },

  button: {
    borderWidth: 1.5,
    borderColor: "#88838A",
    borderRadius: 20,
    width: 140,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F8FAF0",
  },

  posts: {
    backgroundColor: "#F8FAF0",
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});

export default ProfilePage;
