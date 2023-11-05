import { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { firestore } from "../../../firebaseConfig";
import {
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { firebaseAuth } from "../../../firebaseConfig";
import { ChatContext } from "../ChatContext";
import uuidRandom from "uuid-random";
import COLORS from "../../../config/COLORS";

const auth = firebaseAuth;

const Input: React.FC = () => {
  const [text, setText] = useState("");
  const currentUser = {
    displayName: "John Doe",
    email: auth?.currentUser?.email,
    uid: auth?.currentUser?.uid,
  };

  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    try {
      const uuid = uuidRandom();

      await updateDoc(doc(collection(firestore, "chats"), data.chatId), {
        messages: arrayUnion({
          id: uuid,
          text,
          senderId: currentUser.uid,
          createdAt: new Date(),
        }),
      });

      // Code snippet below to be included soon, to update the latest chat message in the chat list

      //   await updateDoc(doc(collection(firestore, "userChats"), currentUser.uid), {
      //     [`chats.${data.chatId}.lastMessage`]: {
      //       text,
      //     },
      //     [`chats.${data.chatId}.date`]: new Date(),
      //   });

      //   await updateDoc(doc(collection(firestore, "userChats"), data.userInfo.uid), {
      //     [`chats.${data.chatId}.lastMessage`]: {
      //       text,
      //     },
      //     [`chats.${data.chatId}.date`]: new Date(),
      //   });

      setText("");
    } catch (error) {
      console.log("Error updating Firestore:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type message..."
          onChangeText={(value) => setText(value)}
          value={text}
        />
        <View style={styles.send}>
          <Button title="Send" onPress={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10, // Add horizontal padding
    paddingBottom: Platform.OS === "android" ? 20 : 0, // Add bottom padding
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "android" ? 20 : 0,
    bottom: 0,
    width: "100%",
  },
  textInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.LIGHTACCENT,
    backgroundColor: COLORS.LIGHTACCENT,
    borderRadius: 40, // Rounded input box
    paddingHorizontal: 12,
    fontFamily: "Bitter-Regular",
  },
  send: {
    marginLeft: 8,
  },
});

export default Input;
