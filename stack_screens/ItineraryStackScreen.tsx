import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItineraryLanding from "../pages/itinerary/itineraryLanding";
import TripDateSelection from "../pages/itinerary/tripDateSelection";
import TripPeopleSelection from "../pages/itinerary/tripPeopleSelection";
import TripInterestSelection from "../pages/itinerary/tripInterestSelection";
import TripPreferences from "../pages/itinerary/tripPreferences";
import ItineraryResults from "../pages/itinerary/itineraryResults";
import { TripInputsContextProvider } from "../pages/itinerary/components/TripInputsContext";

const Stack = createStackNavigator();

export default function ItineraryStack() {
  return (
    <TripInputsContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ItineraryLanding" component={ItineraryLanding} />
        <Stack.Screen name="TripDateSelection" component={TripDateSelection} />
        <Stack.Screen
          name="TripPeopleSelection"
          component={TripPeopleSelection}
        />
        <Stack.Screen
          name="TripInterestSelection"
          component={TripInterestSelection}
        />
        <Stack.Screen name="TripPreferences" component={TripPreferences} />
        <Stack.Screen name="ItineraryResults" component={ItineraryResults} />
      </Stack.Navigator>
    </TripInputsContextProvider>
  );
}
