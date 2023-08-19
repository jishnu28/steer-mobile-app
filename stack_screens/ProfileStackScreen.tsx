import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../pages/profile/profile";
import Home from "../pages/home";

const Stack = createStackNavigator();

// TODO: Replace Home with ProfilePage once ProfilePage is ready
export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileLanding" component={Home} />
    </Stack.Navigator>
  );
}
