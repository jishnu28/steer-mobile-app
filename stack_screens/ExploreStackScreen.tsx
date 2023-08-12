import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../pages/explore/detail";
import Explore from "../pages/explore/explore";

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreLanding" component={Explore} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
