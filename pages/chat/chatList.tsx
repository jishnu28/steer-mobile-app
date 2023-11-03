import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { onSnapshot, doc, collection, getDoc } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../firebaseConfig";
import { ChatContext } from "./ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Unsubscribe } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import SPACING from "../../config/SPACINGS";
import H3 from "../../custom_components/typography/H3";

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

  const getRecipientDisplayName = async (recipientUid: string) => {
    try {
      const userDocRef = doc(firestore, "users", recipientUid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return userData.displayName;
      }
      return "Unknown User"; // Default if user not found
    } catch (error) {
      console.error("Error fetching recipient's display name:", error);
      return "Error"; // Handle the error case
    }
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
    "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png";
  //TODO: replace with code to retrieve profile pic from db

  const [recipientDisplayNames, setRecipientDisplayNames] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchRecipientDisplayNames = async () => {
      const updatedRecipientDisplayNames: Record<string, string> = {};

      for (const chat of chats) {
        const recipientUid = chat.userInfo.uid;
        const recipientDisplayName = await getRecipientDisplayName(
          recipientUid
        );
        updatedRecipientDisplayNames[recipientUid] = recipientDisplayName;
      }

      setRecipientDisplayNames(updatedRecipientDisplayNames);
    };

    fetchRecipientDisplayNames();
  }, [chats]);

  return (
    <SafeAreaView style={styles.background}>
      <SearchBar />
      {chats.length === 0 ? (
        <View style={styles.noChatsContainer}>
          <Text style={styles.noChatsText}>You have no active chats.</Text>
        </View>
      ) : (
        chats.map((chat) => {
          const recipientUid = chat.userInfo.uid;
          const recipientDisplayName =
            recipientDisplayNames[recipientUid] || "Loading...";

          return (
            <TouchableOpacity
              style={styles.chatContainer}
              key={chat.chatId}
              onPress={() => handleSelectChat(chat)}
            >
              <Avatar
                source={{ uri: imageUrl }}
                rounded
                size={64}
                containerStyle={styles.avatar}
              />
              <View style={styles.textContainer}>
                <H3>{recipientDisplayName}</H3>
                <Text style={styles.messageText}>{chat.lastMessage}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  chatContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center",
    padding: SPACING.MD,
    backgroundColor: "#E5E8D9",
  },
  textContainer: {
    flex: 1,
  },
  displayNameText: {
    fontFamily: "Bitter-Bold",
    fontSize: 26,
  },
  messageText: {
    fontFamily: "Bitter-Regular",
    fontSize: 20,
    color: "#88838A",
  },
  avatar: {
    marginRight: SPACING.LG,
  },
  noChatsText: {
    fontFamily: "Bitter-Bold",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20,
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatList;
