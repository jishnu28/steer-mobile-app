import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../../firebaseConfig"; 
import { useAuthState } from "react-firebase-hooks/auth";


function HeartButton(item: any) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [user, loading, error]= useAuthState(firebaseAuth);

  async function setSavedPost() {
    try {
      const savedRef= doc(firestore, "users", user?.uid as any)
      await updateDoc(savedRef, {
        favouritedPosts: arrayUnion(item.item.firestoreID)
      });
    }
    catch (error) {
      console.error(
        "Error writing document to savedPosts",
        error
      );
    }
  }

  async function removeSavedPost() {
    try {
      const savedRef= doc(firestore, "users", user?.uid as any)
      await updateDoc(savedRef, {
        favouritedPosts: arrayRemove(item.item.firestoreID)
      });
    }
    catch (error) {
      console.error(
        "Error writing document to savedPosts",
        error
      );
    }
  }
  
  return (
    <TouchableOpacity
      // TODO: implement feature to save the liked experience to a database
      onPress={() => {
        // console.log(item)
        if (isLiked) {
          removeSavedPost();
        }
        else {
          setSavedPost();
        }
        setIsLiked(!isLiked);
      }}
      style={styles.heartButton}
    >
      {isLiked 
        ? <MaterialCommunityIcons name="heart" size={40} color="red" />
        : <MaterialCommunityIcons name="heart" size={40} color="#FFFFFF" />
      }
    </TouchableOpacity>
  );
}

export default HeartButton;

const styles = StyleSheet.create({
  heartButton: {
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 5,
    alignSelf: "flex-end",
    backgroundColor: "#E5E8D9",
  },
});
