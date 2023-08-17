import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebaseAuth } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Fab, Icon } from "native-base";

type RootStackParamList = {
  ChatButton: undefined;
  ChatScreen: { chatId: string } | undefined;
};

type launchChatPageNavigationProp = NativeStackNavigationProp<any>;
// Change 'any' back to 'RootStackParamList,"ChatButton"' if it causes any issues

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
    navigation.navigate("Chat", {
      screen: "ChatScreen",
      params: { chatId },
    });
    // : 'bQeden5g87gzkD7CTz5R950gHcE3pNgCVARvtJhIExll4BM3qYdplNK2'
  };

  return (
    <Fab
      renderInPortal={false}
      shadow={2}
      placement="bottom-right"
      bg="#FFAF87"
      size="lg"
      label="Message to book"
      onPress={handleSelectLaunchChat}
      icon={
        <Icon
          color="white"
          as={MaterialCommunityIcons}
          name="chat-outline"
          size="6"
        />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default ChatButton;
