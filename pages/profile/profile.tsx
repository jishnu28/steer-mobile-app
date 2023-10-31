import React from "react";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UploadPic from "./components/UploadPic";
import UploadInfo from "./components/UploadInfo";
import SavedItemCarousel from "./components/SavedItemCarousel";
import PopupModal from "./components/PopupModal";
import * as ImagePicker from "expo-image-picker";
import { firebaseAuth, firestore, firebaseStorage } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "firebase/storage";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

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

    //Used for user info retrieval
    const [user, loading, error]= useAuthState(firebaseAuth);
    const [profileInfo, setProfileInfo]= React.useState<ProfileData | any>({});
    //Used to set user info
    const [username, setUsername]= React.useState('');
    const [usernameModal, setUsernameModal]= React.useState(false);

  //Retrieves profile info when page first rendered
  const getProfile = async () => {
    try {
      const profileRef = doc(firestore, "users", user?.uid as any);
      const userProfile = await getDoc(profileRef);
      console.log(userProfile.data());
      setProfileInfo(userProfile.data());
    } catch (error) {
      console.error("Error retrieving profile data:", error);
    }
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
      saveProfilePic(_image);
    }
  };

  const saveProfilePic = async (saved_image: any) => {
    try {
      //Uploads image to firebase storage
      const response = await fetch(saved_image.uri);
      const blob = await response.blob();
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
        <NativeBaseProvider>
            <SafeAreaView style={[styles.container, { paddingTop: 10 }]}>
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
                    inputName="username"
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
              Saved
            </Text>
          </View>

                    <SavedItemCarousel
                        // collectionName= "savedPosts"
                        collectionName="accommodations"
                    />
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    );
    };

export default ProfilePage;

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

  header: {
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: "#343135",
  },

  headerText: {
    // fontFamily: 'Bitter',
    fontSize: 16,
    fontWeight: "700",
    color: "#343135",
  },

  posts: {
    backgroundColor: "#F8FAF0",
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  modalPopUp: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: 160,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E5E8D9",
  },

  modalText: {
    fontSize: 17,
  },

  infoBox: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },

  modalButtonSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
  },

  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 80,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 40,
  },
});
