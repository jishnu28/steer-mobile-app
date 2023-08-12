import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../firebaseConfig";
import { ChatContext } from "./ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Unsubscribe } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container, NativeBaseProvider, View } from "native-base";
import COLORS from "../../config/COLORS";
import SearchBar from "./components/SearchBar";
import ChatButton from "./components/ChatButton";

type RootStackParamList = {
  ChatList: undefined;
  ChatScreen: { chatId: string } | undefined;
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

  const formatTimestamp = (timestamp: number) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleString();
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

  const imageUrl =
    "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"; //to replace with code to retrieve profile pic from db

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.background}>
        <SearchBar />
        {chats.map((chat) => (
          <TouchableOpacity
            style={styles.container}
            key={chat.chatId}
            onPress={() => handleSelectChat(chat)}
          >
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <View style={styles.textContainer}>
              <Text style={styles.displayNameText}>
                {chat.userInfo.displayName}
              </Text>
              <Text style={styles.messageText}>{chat.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.BEIGE,
    // marginLeft: 16,
    // marginRight: 16,
  },
  container: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E5E8D9",
  },
  textContainer: {
    flex: 1, // Take remaining available space
  },
  displayNameText: {
    fontFamily: "Bitter",
    fontSize: 26,
    fontWeight: "bold",
  },
  messageText: {
    fontFamily: "Bitter",
    fontSize: 20,
    color: "#88838A",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 12,
  },
});

export default ChatList;
