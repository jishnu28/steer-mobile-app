import * as React from "react";

import Home from "./pages/home";
import ItineraryLanding from "./pages/itinerary/itineraryLanding";
import Explore from "./pages/explore/explore";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./pages/explore/detail";
import LoginScreen from "./pages/login";

const Stack = createNativeStackNavigator();

export default function App() {
  /**
   * To add new screens, add them to the Stack.Navigator as follows:
   * <Stack.Screen name="Example" component={Example} />
   * name is the name of the screen -> must match the 'dest' argument used in TouristsNavbar
   * component is the component to be rendered -> import these above
   *
   * When you add in your screen, stick to the order of: (top)Home -> Explore -> Itinerary -> Messages -> Profile(bottom)
   */
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Itinerary" component={ItineraryLanding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
