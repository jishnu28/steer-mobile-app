import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { firebaseAuth, firestore } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FAB, Icon } from "@rneui/themed";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import SPACINGS from "../../../config/SPACINGS";
import COLORS from "../../../config/COLORS";
import ICONSIZES from "../../../config/ICONSIZES";

type RootStackParamList = {
  ChatButton: undefined;
  ChatScreen: { chatId: string } | undefined;
};

type launchChatPageNavigationProp = NativeStackNavigationProp<any>;
// Change 'any' back to 'RootStackParamList,"ChatButton"' if it causes any issues

type LaunchChatProps = {
  navigation: launchChatPageNavigationProp;
  hostID: string;
};

const auth = firebaseAuth;

const ChatButton = ({ navigation, hostID }: LaunchChatProps) => {
  const { dispatch } = useContext(ChatContext);
  const currentUser = {
    displayName: "John Doe",
    email: auth?.currentUser?.email,
    uid: auth?.currentUser?.uid,
  };

  const currentUserId = currentUser.uid || "";

  const handleSelectLaunchChat = async () => {
    const hostInfo = {
      uid: hostID,
    };

    const hostId = hostInfo.uid;

    const chatId =
      currentUserId < hostId ? currentUserId + hostId : hostId + currentUserId;

    console.log(chatId);

    // Check if a document with the chatId exists in the "chats" collection
    const chatDocRef = doc(firestore, "chats", chatId);
    const chatDocSnap = await getDoc(chatDocRef);

    if (!chatDocSnap.exists()) {
      try {
        await setDoc(doc(firestore, "chats", chatId), {
          messages: {},
          userIdA: currentUserId,
          userIdB: hostId,
        });

        // Update the user's "chats" array in the "userChats" collection
        const currentUserChatsDocRef = doc(
          firestore,
          "userChats",
          currentUserId
        );
        const currentUserChatsDoc = await getDoc(currentUserChatsDocRef);

        if (currentUserChatsDoc.exists()) {
          const currentUserChatsData = currentUserChatsDoc.data();

          const updatedChats = [
            ...currentUserChatsData.chats,
            {
              chatId: chatId,
              ["userInfo"]: {
                uid: hostId,
              },
            },
          ];

          await updateDoc(currentUserChatsDocRef, {
            chats: updatedChats,
          });

          // const updatedChats = userChatsData.chats.concat(chatId);

          // await updateDoc(userChatsDocRef, {
          //   chats: updatedChats,
          // });

          console.log("Chat created and user updated.");
        } else {
          console.log("User document not found.");
        }

        const hostChatsDocRef = doc(firestore, "userChats", hostId);
        const hostChatsDoc = await getDoc(hostChatsDocRef);

        if (hostChatsDoc.exists()) {
          const hostChatsData = hostChatsDoc.data();

          const updatedHostChats = [
            ...hostChatsData.chats,
            {
              chatId: chatId,
              ["userInfo"]: {
                uid: currentUserId,
              },
            },
          ];

          await updateDoc(hostChatsDocRef, {
            chats: updatedHostChats,
          });
        } else {
          console.log("Host document not found.");
        }

        // const userChatsDocRef = doc(firestore, "userChats", currentUserId);
        // const userChatsDoc = await getDoc(userChatsDocRef);

        // if (userChatsDoc.exists()) {
        //   const userChatsData = userChatsDoc.data();
        //   const updatedChats = userChatsData.chats.concat(chatId);

        //   await updateDoc(userChatsDocRef, {
        //     chats: updatedChats,
        //   });

        //   console.log("Chat created and user updated.");
        // } else {
        //   console.log("User document not found.");
        // }
      } catch (error) {
        console.error("Error while creating chat or updating user:", error);
      }
    }

    dispatch({
      type: "GET_CHAT_ID",
      payload: hostInfo,
    });

    navigation.navigate("Chat", {
      screen: "ChatScreen",
      params: { chatId },
    });
  };

  return (
    <FAB
      style={styles.fab}
      color={COLORS.PRIMARY}
      placement="right"
      size="large"
      title="Contact"
      onPress={handleSelectLaunchChat}
      icon={
        <Icon
          type="material-community"
          name="chat-outline"
          color={COLORS.WHITE}
          size={ICONSIZES.XS}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: SPACINGS.XS },
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChatButton;
