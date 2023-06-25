import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseAuth } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";

interface MessageProps {
  message: {
    senderId: string;
    text: string;
  };
}

const auth = firebaseAuth;

const Message: React.FC<MessageProps> = ({ message }) => {
    const currentUser = { 
        displayName: "John Doe",
        email: auth?.currentUser?.email,
        uid: auth?.currentUser?.uid,
    };
    const { data } = useContext(ChatContext);



  return (
    <View>
      <View style={[styles.message, message.senderId === currentUser.uid && styles.owner]}>
        <View style={styles.messageInfo}></View>
        <Text>just now</Text>
      </View>
      <View style={styles.messageContent}>
        <Text>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    // Add styles for the message container
  },
  owner: {
    // Add styles for the owner container
  },
  messageInfo: {
    // Add styles for the message info container
  },
  messageContent: {
    // Add styles for the message content container
  },
});

export default Message;