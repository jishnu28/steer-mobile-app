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

    const isCurrentUser = message.senderId === currentUser.uid;

  return (
    <View>
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.owner : styles.otherUser,
        ]}
      >
        <Text style={styles.textMessage}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 40,
    padding: 10,
    marginBottom: 8,
    minHeight: 40,
  },
  owner: {
    alignSelf: "flex-end",
    backgroundColor: "#A4A0A6",
  },
  otherUser: {
    alignSelf: "flex-start",
    backgroundColor: "#D7D5D7",
  },
  textMessage: {
    color: "black",
    fontSize: 16,
  },
});

export default Message;