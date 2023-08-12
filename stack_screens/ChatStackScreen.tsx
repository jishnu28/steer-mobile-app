import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "../pages/chat/chatList";
import ChatScreen from "../pages/chat/chatScreen";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Messages" component={ChatList} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}
