import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./pages/login";
import { ChatContextProvider } from "./pages/chat/ChatContext";
import HomeTabs from "./stack_screens/HomeTabsStackScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ChatContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatContextProvider>
  );
}
