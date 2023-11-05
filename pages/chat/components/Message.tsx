import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseAuth } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import SPACINGS from "../../../config/SPACINGS";
import ICONSIZES from "../../../config/ICONSIZES";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";

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
        <BodyText style={styles.textMessage}>{message.text}</BodyText>
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
});

export default Message;
