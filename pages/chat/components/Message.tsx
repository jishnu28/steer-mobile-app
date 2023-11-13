import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { firebaseAuth } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import SPACINGS from "../../../config/SPACINGS";
import ICONSIZES from "../../../config/ICONSIZES";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import FONTSIZES from "../../../config/FONTSIZES";
import { Timestamp } from "firebase/firestore";

interface MessageProps {
  message: {
    createdAt: Timestamp;
    senderId: string;
    text: string;
  };
}

const auth = firebaseAuth;

function formatFirestoreTimestamp(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month}/${day}, ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  return formattedDate;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const currentUser = {
    displayName: "John Doe",
    email: auth?.currentUser?.email,
    uid: auth?.currentUser?.uid,
  };

  const isCurrentUser = message.senderId === currentUser.uid;

  return (
    <View>
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.owner : styles.otherUser,
        ]}
      >
        <BodyText style={styles.textMessage}>{message.text}</BodyText>
        <View style={styles.timestampContainer}>
          <BodyText style={styles.timestamp}>
            {formatFirestoreTimestamp(message.createdAt)}
          </BodyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: SPACINGS.XL,
    padding: SPACINGS.MD,
    marginBottom: SPACINGS.MD,
    minHeight: ICONSIZES.LG,
    maxWidth: "80%",
  },
  owner: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.PRIMARY,
    borderBottomRightRadius: 0,
  },
  otherUser: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.LIGHTACCENT,
    borderTopLeftRadius: 0,
  },
  textMessage: {},
  timestamp: {
    fontSize: FONTSIZES.XS,
    color: "#000",
  },
  timestampContainer: {
    alignSelf: "flex-end",
  },
});

export default Message;
