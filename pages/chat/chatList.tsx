import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../firebaseConfig";
import { ChatContext } from "./ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Unsubscribe } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  ChatList: undefined;
  ChatScreen: undefined;
};

type chatPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChatList"
>;

type ChatListProps = {
  navigation: chatPageNavigationProp;
};

const auth = firebaseAuth;

const ChatList = ({ navigation }: ChatListProps) => {
  const [chats, setChats] = useState<any[]>([]);
  const { dispatch } = useContext(ChatContext);
  const currentUser = {
    displayName: "John Doe",
    email: auth?.currentUser?.email,
    uid: auth?.currentUser?.uid,
  };

  const handleSelectChat = (chat: any) => {
    dispatch({ type: "GET_CHAT_ID", payload: chat.userInfo });
    navigation.navigate("ChatScreen");
  };

  useEffect(() => {
    const documentRef = doc(
      collection(firestore, "userChats"),
      currentUser.uid
    );
    const unsubscribe: Unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
      const data = docSnapshot.data();
      setChats(data?.chats || []);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {chats.map((chat) => (
        <TouchableOpacity
          key={chat.chatId}
          onPress={() => handleSelectChat(chat)}
        >
          <Text>{chat.userInfo.displayName}</Text>
          <Text>{chat.lastMessage}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8E6", // Pale yellow background color
  },
});

export default ChatList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   chatContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   chatText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
