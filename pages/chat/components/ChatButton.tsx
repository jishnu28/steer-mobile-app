import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebaseAuth, firestore } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Fab, Icon } from "native-base";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

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

  const handleSelectLaunchChat = async () => {
    const hostInfo = {
      uid: "bQeden5g87gzkD7CTz5R950gHcE3", 
    };  // to replace with code to retrieve host id from database

    const hostId = hostInfo.uid;

    const chatId =
      currentUserId < hostId ? currentUserId + hostId : hostId + currentUserId;

      console.log(chatId);

      // Check if a document with the chatId exists in the "chats" collection
      const chatDocRef = doc(firestore, "chats", chatId);
      const chatDocSnap = await getDoc(chatDocRef);
  
      if (!chatDocSnap.exists()){
        
        try {
          await setDoc(doc(firestore, "chats", chatId), {
            messages: {},
            userIdA: currentUserId,
            userIdB: hostId
          });
    
          // Update the user's "chats" array in the "userChats" collection
          const userChatsDocRef = doc(firestore, "userChats", currentUserId);
          const userChatsDoc = await getDoc(userChatsDocRef);
    
          if (userChatsDoc.exists()) {
            const userChatsData = userChatsDoc.data();
          
            const updatedChats = [
              ...userChatsData.chats,
              {
                chatId: chatId,
                ['userInfo']:{
                  uid: hostId
                }
              },
            ];
          
            await updateDoc(userChatsDocRef, {
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
      // navigation.navigate("Chat", {
      //   screen: "ChatScreen",
      //   params: { chatId },
      // });

      dispatch({
        type: "GET_CHAT_ID",
        payload: hostInfo, // or replace with the actual value
          // ... other info about the other user
        
      });

      // navigation.navigate("ChatScreen");
    // console.log(chatId);
    navigation.navigate("Chat", {
      screen: "ChatScreen",
      params: { chatId },
    });
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
