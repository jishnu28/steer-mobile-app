import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface UploadInfoProps {
  name: string;
  isUserModalVisible: boolean;
  setUserModalVisible(isVisible: boolean): any;
  navigation: NativeStackNavigationProp<any>;
}

function UploadInfo({
  name,
  isUserModalVisible,
  setUserModalVisible,
  navigation,
}: UploadInfoProps) {
  const handleSignOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error: { message: any }) => alert(error.message));
  };

  return (
    <View style={{ marginLeft: 15 }}>
      <View style={styles.button}>
        <Text style={styles.profileText} numberOfLines={2}>
          {name}
        </Text>
        <TouchableOpacity
          onPress={() => setUserModalVisible(!isUserModalVisible)}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#88838A" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UploadInfo;

const styles = StyleSheet.create({
  profileText: {
    fontFamily: "Bitter-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#343135",
    maxWidth: "80%",
    marginVertical: 1,
    marginHorizontal: 5,
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 5,
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F8FAF0",
  },

  signOutButton: {
    backgroundColor: "#FFAF87",
    width: "60%",
    padding: 5,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontFamily: "Bitter-Bold",
    fontWeight: "700",
    fontSize: 16,
  },
});
