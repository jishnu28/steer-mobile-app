import React, { useState, useEffect } from "react";
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firestore, messageQuery, firebaseAuth } from "../../firebaseConfig";
import {  addDoc, collection, query, orderBy, onSnapshot, DocumentData, Unsubscribe } from 'firebase/firestore';
import TouristsNavbar from "../../custom_components/TouristsNavbar";


export default function Chat() {
    const [messages, setMessages] = useState<IMessage[]>([]);
  
    useEffect(() => {
      const messageQuery = query(collection(firestore, "messages"), orderBy("createdAt", "desc"));
  
      // Load initial messages from Firebase database
      const unsubscribe: Unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            _id: data.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
          } as IMessage;
        });
        setMessages(messages);
      });
  
      return () => unsubscribe();
    }, []);


    const handleSend = async (newMessages: IMessage[]) => {
        const [message] = newMessages;
        try {
          await addDoc(collection(firestore, "messages"), {
            id: message._id,
            text: message.text,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            user: message.user,
          });
        } catch (error) {
          console.error("Error sending message: ", error);
        }
      };

      const auth = firebaseAuth;

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => handleSend(newMessages)}
      user={{
        _id: auth?.currentUser?.email || '',
        name: 'John Doe', // User's name
      }}
    />
  );
}
