import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import COLORS from "../../config/COLORS";
import SPACINGS from "../../config/SPACINGS";
import H1 from "../../custom_components/typography/H1";
import H3 from "../../custom_components/typography/H3";
import BackNextButtonRow from "./components/BackNextButtonRow";
import BodyText from "../../custom_components/typography/BodyText";
import PairOptions from "./components/PairOptions";
import { LinearProgress } from "@rneui/themed";
import { TripInputsContext } from "./components/TripInputsContext";

interface TripPreferencesProps {
  navigation: NativeStackNavigationProp<any>;
}

function TripPreferences({ navigation }: TripPreferencesProps) {
  const [lowBudget, setLowBudget] = useState<boolean>(false);
  const [averageBudget, setAverageBudget] = useState<boolean>(false);
  const [highBudget, setHighBudget] = useState<boolean>(false);
  const [timingPreference, setTimingPreference] = useState<string | undefined>(
    undefined
  );
  const [pacePreference, setPacePreference] = useState<string | undefined>(
    undefined
  );
  const { setTripBudget, setTripPreferences } =
    React.useContext(TripInputsContext);

  const handlePress = (option: string) => {
    switch (option) {
      case "low":
        setLowBudget(true);
        setAverageBudget(false);
        setHighBudget(false);
        break;
      case "average":
        setLowBudget(false);
        setAverageBudget(true);
        setHighBudget(false);
        break;
      case "high":
        setLowBudget(false);
        setAverageBudget(false);
        setHighBudget(true);
        break;
      default:
        break;
    }
  };

  const handleNextPress = () => {
    const budget = lowBudget ? 49 : averageBudget ? 99 : 500;
    const preferences = [];
    if (timingPreference) preferences.push(timingPreference);
    if (pacePreference) preferences.push(pacePreference);
    setTripBudget(budget);
    setTripPreferences(preferences);
    navigation.navigate("ItineraryResults", {
      navigation: navigation,
    });
  };

  return (
    <SafeAreaView style={styles.background}>
      <LinearProgress color={COLORS.PRIMARY} value={1} variant="determinate" />
      <View style={styles.container}>
        <H1>Just a few more details!</H1>
        <View style={styles.questionsContainer}>
          <H3>What's your budget?</H3>
          <View style={styles.optionsContainer}>
            <Pressable
              style={[
                styles.budgetButton,
                lowBudget
                  ? { borderColor: COLORS.PRIMARY }
                  : { borderColor: COLORS.LIGHTACCENT },
              ]}
              onPress={() => handlePress("low")}
            >
              <BodyText>Low-$</BodyText>
            </Pressable>
            <Pressable
              style={[
                styles.budgetButton,
                averageBudget
                  ? { borderColor: COLORS.PRIMARY }
                  : { borderColor: COLORS.LIGHTACCENT },
              ]}
              onPress={() => handlePress("average")}
            >
              <BodyText>Average-$$</BodyText>
            </Pressable>
            <Pressable
              style={[
                styles.budgetButton,
                highBudget
                  ? { borderColor: COLORS.PRIMARY }
                  : { borderColor: COLORS.LIGHTACCENT },
              ]}
              onPress={() => handlePress("high")}
            >
              <BodyText>High-$$$</BodyText>
            </Pressable>
          </View>
          <H3 style={{ marginBottom: SPACINGS.XS }}>
            Select one option in each pair:
          </H3>
          <PairOptions
            leftOption="Early bird"
            rightOption="Night owl"
            onOptionSelected={setTimingPreference}
          />
          <PairOptions
            leftOption="Packed trip"
            rightOption="Leisure retreat"
            onOptionSelected={setPacePreference}
          />
        </View>
        <BackNextButtonRow
          nextDisabled={
            !(lowBudget || averageBudget || highBudget) ||
            timingPreference == undefined ||
            pacePreference == undefined
          } // Disable if no option is selected
          navigation={navigation}
          nextPage="ItineraryResults"
          onNextPress={handleNextPress}
        />
      </View>
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
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: SPACINGS.MD,
  },
  questionsContainer: {
    width: "100%",
    margin: SPACINGS.MD,
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: SPACINGS.XXL,
  },
  budgetButton: {
    width: "33%",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    padding: SPACINGS.MD,
    borderWidth: 2,
    borderRadius: SPACINGS.XL,
    margin: SPACINGS.SM,
  },
  button: {},
});

export default TripPreferences;
