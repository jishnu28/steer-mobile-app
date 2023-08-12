import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../../../config/COLORS";
import { firebaseAuth } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ChatButton: undefined;
  ChatScreen: { chatId: string } | undefined;
};

type launchChatPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChatButton"
>;

type LaunchChatProps = {
  navigation: launchChatPageNavigationProp;
};

const auth = firebaseAuth;

const ChatButton = ({ navigation }: LaunchChatProps) => {
  const { dispatch } = useContext(ChatContext);
  const currentUser = {
    displayName: "John Doe",
    email: auth?.currentUser?.email,
    uid: auth?.currentUser?.uid,
  };

  const currentUserId = currentUser.uid || "";

  const handleSelectLaunchChat = () => {
    const hostId = "bQeden5g87gzkD7CTz5R950gHcE3"; // to replace with code to retrieve host id from database
    const chatId =
      currentUserId < hostId ? currentUserId + hostId : hostId + currentUserId;

    console.log(chatId);
    navigation.navigate("ChatScreen", { chatId });
    // : 'bQeden5g87gzkD7CTz5R950gHcE3pNgCVARvtJhIExll4BM3qYdplNK2'
  };

  return (
    <TouchableOpacity
      onPress={handleSelectLaunchChat}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>Message to Book</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#FFAF87", // Change to your desired button color
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: "Bitter-Bold",
    fontSize: 18,
  },
});

export default ChatButton;
