import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultProfilePicURL } from "../../../config/CONSTANTS";

interface UploadPicProps {
  url: string;
  addImage(): any;
}

function UploadPic({ url, addImage }: UploadPicProps) {
  return (
    <View
      style={{
        width: 140,
        height: 140,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {url == "" && (
        <Image
          source={{ uri: defaultProfilePicURL }}
          style={styles.profilePic}
        />
      )}
      {url != "" && <Image source={{ uri: url }} style={styles.profilePic} />}
      <TouchableOpacity onPress={addImage} style={styles.editProfilePic}>
        <MaterialCommunityIcons name="plus-circle" size={36} color="#FFAF87" />
      </TouchableOpacity>
    </View>
  );
}

export default UploadPic;

const styles = StyleSheet.create({
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#88838A",
  },

  editProfilePic: {
    position: "absolute",
    left: "75%",
    bottom: "0%",
  },
});
