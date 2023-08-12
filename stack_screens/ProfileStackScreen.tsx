import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditEmail from "../pages/profile/edit_email";
import EditName from "../pages/profile/edit_name";
import EditProfile from "../pages/profile/edit_profile";
import ProfilePage from "../pages/profile/profile";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileLanding" component={ProfilePage} />
      <Stack.Screen name="Edit" component={EditProfile} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="EditEmail" component={EditEmail} />
    </Stack.Navigator>
  );
}
