import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItineraryLanding from "../pages/itinerary/itineraryLanding";
import DatePicker from "../pages/itinerary/datePicker";

const Stack = createStackNavigator();

// TODO: Fix issue with component of Detail screen
export default function ItineraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ItineraryLanding" component={ItineraryLanding} />
      <Stack.Screen name="DatePicker" component={DatePicker} />
    </Stack.Navigator>
  );
}
