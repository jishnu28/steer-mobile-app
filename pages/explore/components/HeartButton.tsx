import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentData,
} from "firebase/firestore";
import { firestore, firebaseAuth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import ICONSIZES from "../../../config/ICONSIZES";
import COLORS from "../../../config/COLORS";
import SPACINGS from "../../../config/SPACINGS";

interface HeartButtonProps {
  item: DocumentData;
}

function HeartButton({ item }: HeartButtonProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [user, loading, error] = useAuthState(firebaseAuth);

  async function setSavedPost() {
    try {
      const savedRef = doc(firestore, "users", user?.uid as any);
      console.log("postID to be saved: ", item.firestoreID);
      await updateDoc(savedRef, {
        favouritedPosts: arrayUnion(item.firestoreID),
      });
    } catch (error) {
      console.error("Error writing document to savedPosts", error);
    }
  }

  async function removeSavedPost() {
    try {
      const savedRef = doc(firestore, "users", user?.uid as any);
      await updateDoc(savedRef, {
        favouritedPosts: arrayRemove(item.firestoreID),
      });
    } catch (error) {
      console.error("Error writing document to savedPosts", error);
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
      }}
    >
      <TouchableOpacity
        // TODO: implement feature to save the liked experience to a database
        onPress={() => {
          // console.log(item)
          if (isLiked) {
            removeSavedPost();
          } else {
            setSavedPost();
          }
          setIsLiked(!isLiked);
        }}
        style={styles.heartButton}
      >
        {isLiked ? (
          <Icon
            color={COLORS.PRIMARY}
            type="material-community"
            name="heart"
            size={ICONSIZES.XL}
          />
        ) : (
          <Icon
            color={COLORS.WHITE}
            type="material-community"
            name="heart"
            size={ICONSIZES.XL}
            style={{ opacity: 0.6 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default HeartButton;

const styles = StyleSheet.create({
  heartButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: SPACINGS.MD,
  },
});
