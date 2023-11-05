import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import ItineraryLanding from "../pages/itinerary/itineraryLanding";
import InTheWorks from "../pages/inTheWorks";
import ExploreStack from "./ExploreStackScreen";
import ChatStack from "./ChatStackScreen";
import ProfileStack from "./ProfileStackScreen";
import PostStack from "./PostStackScreen";
import COLORS from "../config/COLORS";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: "#FF691F",
        tabBarInactiveTintColor: COLORS.WHITE,
        tabBarActiveBackgroundColor: COLORS.PRIMARY,
        tabBarInactiveBackgroundColor: COLORS.PRIMARY,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: -8,
        },
        tabBarIconStyle: {
          paddingBottom: Platform.OS === "ios" ? 12 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Bitter-Regular",
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "map-search" : "map-search-outline"}
              color={focused ? color : COLORS.WHITE}
              size={30}
              style={focused ? styles.focusedIcon : styles.unfocusedIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Itinerary"
        component={InTheWorks}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-month" : "calendar-month-outline"}
              color={focused ? color : COLORS.WHITE}
              size={30}
              style={focused ? styles.focusedIcon : styles.unfocusedIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "plus-circle" : "plus-circle-outline"}
              color={focused ? color : COLORS.WHITE}
              size={30}
              style={focused ? styles.focusedIcon : styles.unfocusedIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "message-text" : "message-text-outline"}
              color={focused ? color : COLORS.WHITE}
              size={30}
              style={focused ? styles.focusedIcon : styles.unfocusedIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={focused ? color : COLORS.WHITE}
              size={30}
              style={focused ? styles.focusedIcon : styles.unfocusedIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedIcon: {
    paddingBottom: 4,
    shadowColor: "#FF691F",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  unfocusedIcon: {
    paddingBottom: 0,
  },
});
