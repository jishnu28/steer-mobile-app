import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import ItineraryLanding from "../pages/itinerary/itineraryLanding";
import ExploreStack from "./ExploreStackScreen";
import ChatStack from "./ChatStackScreen";
import ProfileStack from "./ProfileStackScreen";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FF691F"
      inactiveColor="#FFFFFF"
      backBehavior="history"
      barStyle={{
        backgroundColor: "#FFAF87",
        borderTopWidth: 1,
        borderTopColor: "#FF691F",
        height: 80,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarColor: "#FFAF87",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "map-search" : "map-search-outline"}
              color={focused ? color : "#FFFFFF"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Itinerary"
        component={ItineraryLanding}
        options={{
          tabBarColor: "#FFAF87",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-month" : "calendar-month-outline"}
              color={focused ? color : "#FFFFFF"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarColor: "#FFAF87",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "message-text" : "message-text-outline"}
              color={focused ? color : "#FFFFFF"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarColor: "#FFAF87",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={focused ? color : "#FFFFFF"}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
