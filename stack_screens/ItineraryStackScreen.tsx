import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItineraryLanding from "../pages/itinerary/itineraryLanding";
import TripDateSelection from "../pages/itinerary/tripDateSelection";

const Stack = createStackNavigator();

export default function ItineraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ItineraryLanding" component={ItineraryLanding} />
      <Stack.Screen name="TripDateSelection" component={TripDateSelection} />
    </Stack.Navigator>
  );
}
