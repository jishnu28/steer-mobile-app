import { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { firestore } from "../../../firebaseConfig";
import { updateDoc, doc, arrayUnion, serverTimestamp, collection } from "firebase/firestore";
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
    }};

  return (
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
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 35, // Add horizontal padding
    paddingBottom: 0, // Add bottom padding
    position: "absolute",
    bottom: 0,
    width: "100%",
},
textInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.ACCENT,
    backgroundColor: COLORS.ACCENT,
    borderRadius: 40, // Rounded input box
    paddingHorizontal: 12,
},
send: {
    marginLeft: 8,
},
});

export default Input;
