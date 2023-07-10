import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ChatContext } from "./ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestore } from "../../firebaseConfig";
import { Unsubscribe } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Message from "./components/Message";
import Input from "./components/Input";

type RootStackParamList = {
    ChatList: undefined;
    ChatScreen: undefined;
};

type messagesNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ChatScreen"
>;

type MessagesProps = {
    navigation: messagesNavigationProp;
};


const ChatScreen = ({ navigation }: MessagesProps)=> {

  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(()=>{
    const documentRef = doc(collection(firestore, "chats"), data.chatId)

    const unsubscribe: Unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        const data = docSnapshot.exists() ? docSnapshot.data() : null;
        const messagesArray = data ? data.messages : [];
        setMessages(messagesArray);
    });
    
    return () => unsubscribe();
  }, [data.chatId]);

    return (
        <View style={styles.container}>
            <Text style={styles.username}>{data.userInfo.displayName}</Text>
                <View style={styles.messages}>
                    {messages.map((m: any) => (
                        <Message message={m} key={m.id} />
                    ))}
                </View>
                <View style={styles.inputContainer}>
                    <Input/>
                </View>
        </View>    
  );
};


const styles = StyleSheet.create({
    messages: {
        // Add styles for the messages container
      },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatScreen;
