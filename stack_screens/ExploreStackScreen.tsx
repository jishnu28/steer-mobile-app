import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../pages/explore/detail";
import Explore from "../pages/explore/explore";
import Booking from "../pages/bookings/booking";
import RequestConfirmation from "../pages/bookings/requestConfirmation";

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreLanding" component={Explore} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen
        name="RequestConfirmation"
        component={RequestConfirmation}
      />
    </Stack.Navigator>
  );
}
