import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import COLORS from "../../config/COLORS";
import SPACINGS from "../../config/SPACINGS";
import H1 from "../../custom_components/typography/H1";
import { TripInputsContext } from "./components/TripInputsContext";
import BodyText from "../../custom_components/typography/BodyText";
import { Tab, TabView } from "@rneui/themed";
import H3 from "../../custom_components/typography/H3";

interface ItineraryResultsProps {
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("window").width;

function ItineraryResults({ navigation }: ItineraryResultsProps) {
  const { tripLength, tripPax, tripBudget, tripInterests, tripPreferences } =
    React.useContext(TripInputsContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = React.useState(0);
  const [indicatorX, setIndicatorX] = useState(0); // for fixing translateX bug with tab component
  const tabWidth = width / 3;

  // TODO: fetch filtered options from accommodation database
  // TODO: fetch filtered options from activity database
  // TODO: get timetable start and end timings
  // TODO: get no. of activities per day
  // TODO: get duration and time of day for each activity from AI (morning, afternoon, evening)
  // TODO: get AI generated itinerary summary

  return (
    <SafeAreaView style={styles.background}>
      {loading && (
        <View style={styles.container}>
          <H1 style={{ textAlign: "center" }}>
            Hang tight while we plan your trip!
          </H1>
          <BodyText>This may take up to a few minutes...</BodyText>
          <View style={styles.stepsContainer}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          </View>
        </View>
      )}
      {!loading && (
        <View style={[styles.container, { margin: 0 }]}>
          <H1 style={{ textAlign: "center", marginBottom: SPACINGS.MD }}>
            Here's your itinerary!
          </H1>
          <Tab
            value={index}
            onChange={(e) => {
              setIndex(e);
              setIndicatorX(e * tabWidth);
            }}
            disableIndicator={true}
            scrollable={true}
            indicatorStyle={{
              backgroundColor: "white",
              height: 0,
              transform: [{ translateX: indicatorX }], // for fixing translateX bug with tab component
            }}
          >
            <Tab.Item
              title="Overview"
              titleStyle={styles.tabTitle}
              containerStyle={[styles.tabContainer]}
            />
            <Tab.Item
              title="Day 1"
              titleStyle={styles.tabTitle}
              containerStyle={styles.tabContainer}
            />
            <Tab.Item
              title="Day 2"
              titleStyle={styles.tabTitle}
              containerStyle={styles.tabContainer}
            />
          </Tab>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={styles.tabView}>
              <H3>Overview</H3>
            </TabView.Item>
            <TabView.Item style={styles.tabView}>
              <H3>Day 1</H3>
            </TabView.Item>
            <TabView.Item style={styles.tabView}>
              <H3>Day 2</H3>
            </TabView.Item>
          </TabView>
          <BodyText>hello</BodyText>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.LIGHTACCENT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
  },
  container: {
    flex: 1,
    margin: SPACINGS.MD,
  },
  stepsContainer: {
    margin: SPACINGS.MD,
  },
  simpleStep: {
    marginVertical: SPACINGS.XL,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACINGS.MD,
    borderRadius: SPACINGS.XL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: COLORS.WHITE,
    marginRight: SPACINGS.SM,
  },
  tabTitle: {
    color: COLORS.PRIMARY,
    paddingVertical: SPACINGS.XS,
    paddingHorizontal: SPACINGS.XXS,
  },
  tabContainer: {
    backgroundColor: COLORS.LIGHTBG,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginHorizontal: SPACINGS.SM,
    borderRadius: SPACINGS.XL,
    alignContent: "center",
    justifyContent: "center",
  },
  tabView: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    width: "100%",
    margin: SPACINGS.MD,
  },
});

export default ItineraryResults;
