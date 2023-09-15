import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../pages/profile/profile";

const Stack = createStackNavigator();

// TODO: Fix issue with component of ProfilePage screen
export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileLanding" component={ProfilePage} />
    </Stack.Navigator>
  );
}
