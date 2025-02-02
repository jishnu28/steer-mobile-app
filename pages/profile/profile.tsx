import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UploadPic from "./components/UploadPic";
import UploadInfo from "./components/UploadInfo";
import PopupModal from "../../custom_components/PopupModal";
import * as ImagePicker from "expo-image-picker";
import { firebaseAuth, firestore, firebaseStorage } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
import "firebase/storage";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import SPACINGS from "../../config/SPACINGS";
import COLORS from "../../config/COLORS";
import FONTSIZES from "../../config/FONTSIZES";
import ExploreItemCarousel from "../explore/components/ExploreItemCarousel";
import CATEGORIES from "../../config/CATEGORIES";
import H3 from "../../custom_components/typography/H3";

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
  userProfile: {};
};

interface ProfileData {
  displayName: string;
  email: string;
  profilePic: string;
  uid: string;
}

const ProfilePage = ({ navigation }: Props) => {
  //Used to set user info
  const [username, setUsername] = React.useState("");
  const [usernameModal, setUsernameModal] = React.useState(false);
  //Used for user info retrieval
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [profileInfo, setProfileInfo] = React.useState<ProfileData | any>({});
  const [userSavedAccommodations, setUserSavedAccommodations] = React.useState<
    DocumentData[]
  >([]);
  const [userSavedExperiences, setUserSavedExperiences] = React.useState<
    DocumentData[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //Retrieves profile info when page first rendered
  const getProfile = async () => {
    try {
      const profileRef = doc(firestore, "users", user?.uid as any);
      const userProfile = await getDoc(profileRef);
      const currUserDoc = userProfile.data();
      setProfileInfo(currUserDoc);

      // get accommodations favourited by user
      const userSavedAccommodationIDs =
        currUserDoc?.favouritedAccommodations ?? [];
      if (userSavedAccommodationIDs.length > 0) {
        const userSavedAccommodationDocs: DocumentData[] = [];
        for (let i = 0; i < userSavedAccommodationIDs.length; i++) {
          const postRef = doc(
            firestore,
            "accommodations",
            userSavedAccommodationIDs[i]
          );
          const postDoc = await getDoc(postRef);
          const postDocData = postDoc.data();
          if (postDocData) {
            userSavedAccommodationDocs.push(postDocData);
          }
        }
        setUserSavedAccommodations(userSavedAccommodationDocs);
      }

      // get experiences favourited by user
      const userSavedExperienceIDs = currUserDoc?.favouritedExperiences ?? [];
      if (userSavedExperienceIDs.length > 0) {
        const userSavedExperienceDocs: DocumentData[] = [];
        for (let i = 0; i < userSavedExperienceIDs.length; i++) {
          const postRef = doc(
            firestore,
            "experiences",
            userSavedExperienceIDs[i]
          );
          const postDoc = await getDoc(postRef);
          const postDocData = postDoc.data();
          if (postDocData) {
            userSavedExperienceDocs.push(postDocData);
          }
        }
        setUserSavedExperiences(userSavedExperienceDocs);
      }
    } catch (error) {
      console.error("Error retrieving profile data:", error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  //Code for profile picture upload
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
      quality: 0.2, //controls quality of the selected image, value between 0 to 1, which 1 denoting highest quality
    });

    if (!_image.canceled) {
      //checks that the user doesn't close photo library before selecting an image
      // console.log(_image)
      saveProfilePic(_image.assets[0]);
    }
  };

  const saveProfilePic = async (saved_image: ImagePicker.ImagePickerAsset) => {
    try {
      //Uploads image to firebase storage
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
      const imageRef = storageRef(
        firebaseStorage,
        `images/userProfileImages/${user!.uid}`
      );
      await uploadBytes(imageRef, blob);
      console.log("Image uploaded to firebase storage");

      //Update url link to firestore
      const url = await getDownloadURL(imageRef);
      const docRef = doc(firestore, "users", user!.uid);
      await updateDoc(docRef, {
        profilePic: url, //saves the uri of the image to the database
      });
      getProfile();
    } catch (error) {
      console.error("Error updating profile pic to users collection:", error);
    }
  };

  //Code for profile info upload
  const saveUsername = async () => {
    try {
      const docRef = doc(firestore, "users", user!.uid);
      await updateDoc(docRef, {
        displayName: username,
      });
      getProfile();
    } catch (error) {
      console.error("Error updating username to users collection:", error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Profile Info */}
      <View style={[styles.profile, { flex: 2 }]}>
        <UploadPic
          url={profileInfo ? profileInfo["profilePic"] : ""} //sets placeholder in case user data does not exist
          addImage={addImage}
        />
        <UploadInfo
          name={profileInfo ? profileInfo["displayName"] : "Placeholder name"}
          isUserModalVisible={usernameModal}
          setUserModalVisible={setUsernameModal}
          navigation={navigation}
        />
      </View>

      {/* Modals */}
      <PopupModal
        inputHeading="Enter your new username below:"
        inputValue={username}
        setInputValue={setUsername}
        saveValue={saveUsername}
        isModalVisible={usernameModal}
        setModalVisibility={setUsernameModal}
      />

      {/* Posts */}
      {/* marginBottom to leave space for the NavBar */}
      <View style={[styles.posts, { flex: 5, marginBottom: 0 }]}>
        <View style={styles.header}>
          <Text
            style={[styles.headerText, { width: 300, textAlign: "center" }]}
          >
            Favourited
          </Text>
        </View>

        {!isLoading && (
          <ScrollView style={{ flex: 1 }}>
            <H3
              style={{
                marginTop: SPACINGS.XL,
                marginBottom: -SPACINGS.MD,
                alignSelf: "center",
              }}
            >
              Accommodations
            </H3>
            <ExploreItemCarousel
              navigation={navigation}
              items={userSavedAccommodations}
              collectionName={CATEGORIES[0].dbName}
            />
            <H3
              style={{
                marginTop: SPACINGS.XL,
                marginBottom: -SPACINGS.MD,
                alignSelf: "center",
              }}
            >
              Experiences
            </H3>
            <ExploreItemCarousel
              navigation={navigation}
              items={userSavedExperiences}
              collectionName={CATEGORIES[1].dbName}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.LIGHTACCENT,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },

  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    paddingVertical: SPACINGS.MD,
    borderBottomWidth: 0.5,
    borderColor: COLORS.DARKBG,
  },

  headerText: {
    fontFamily: "Bitter-Bold",
    fontSize: FONTSIZES.LG,
    color: COLORS.DARKBG,
  },

  posts: {
    backgroundColor: COLORS.LIGHTBG,
    width: "100%",
    borderTopRightRadius: SPACINGS.XL,
    borderTopLeftRadius: SPACINGS.XL,
    justifyContent: "center",
    alignItems: "center",
  },

  // modalPopUp: {
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   width: "90%",
  //   height: 160,
  //   paddingVertical: SPACINGS.MD,
  //   borderRadius: SPACINGS.XL,
  //   backgroundColor: COLORS.LIGHTACCENT,
  // },

  // modalText: {
  //   fontSize: FONTSIZES.MD,
  // },

  // infoBox: {
  //   width: "80%",
  //   height: 40,
  //   padding: SPACINGS.MD,
  // },

  // modalButtonSection: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   width: "80%",
  // },

  // modalButton: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 40,
  //   width: 40,
  //   marginHorizontal: 5,
  //   borderWidth: 1,
  //   borderRadius: 40,
  // },
});
