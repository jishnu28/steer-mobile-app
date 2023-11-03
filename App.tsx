import * as React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./pages/login";
import { ChatContextProvider } from "./pages/chat/ChatContext";
import HomeTabs from "./stack_screens/HomeTabsStackScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useFonts({
    "Bitter-Black": require("./assets/fonts/Bitter-Black.ttf"),
    "Bitter-ExtraBold": require("./assets/fonts/Bitter-ExtraBold.ttf"),
    "Bitter-Bold": require("./assets/fonts/Bitter-Bold.ttf"),
    "Bitter-SemiBold": require("./assets/fonts/Bitter-SemiBold.ttf"),
    "Bitter-Medium": require("./assets/fonts/Bitter-Medium.ttf"),
    "Bitter-Regular": require("./assets/fonts/Bitter-Regular.ttf"),
    "Bitter-Light": require("./assets/fonts/Bitter-Light.ttf"),
    "Bitter-ExtraLight": require("./assets/fonts/Bitter-ExtraLight.ttf"),
    "Bitter-Thin": require("./assets/fonts/Bitter-Thin.ttf"),
    "Bitter-Italic": require("./assets/fonts/Bitter-Italic.ttf"),
    "Bitter-BoldItalic": require("./assets/fonts/Bitter-BoldItalic.ttf"),
  });

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
