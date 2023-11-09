import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import COLORS from "../../config/COLORS";
import SPACINGS from "../../config/SPACINGS";
import H1 from "../../custom_components/typography/H1";
import BackNextButtonRow from "./components/BackNextButtonRow";
import PeopleOption from "./components/PeopleOption";
import { LinearProgress } from "@rneui/themed";
import { TripInputsContext } from "./components/TripInputsContext";

interface TripPeopleSelectionProps {
  navigation: NativeStackNavigationProp<any>;
}

function TripPeopleSelection({ navigation }: TripPeopleSelectionProps) {
  const [solo, setSolo] = useState<boolean>(false);
  const [couple, setCouple] = useState<boolean>(false);
  const [family, setFamily] = useState<boolean>(false);
  const [friends, setFriends] = useState<boolean>(false);
  const { setTripPax } = React.useContext(TripInputsContext);

  const handlePress = (option: string) => {
    switch (option) {
      case "solo":
        setSolo(true);
        setCouple(false);
        setFamily(false);
        setFriends(false);
        setTripPax("solo");
        break;
      case "couple":
        setSolo(false);
        setCouple(true);
        setFamily(false);
        setFriends(false);
        setTripPax("couple");
        break;
      case "family":
        setSolo(false);
        setCouple(false);
        setFamily(true);
        setFriends(false);
        setTripPax("family");
        break;
      case "friends":
        setSolo(false);
        setCouple(false);
        setFamily(false);
        setFriends(true);
        setTripPax("friends");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <LinearProgress
        color={COLORS.PRIMARY}
        value={0.5}
        variant="determinate"
      />
      <View style={styles.container}>
        <H1>Who's coming?</H1>
        <View style={styles.optionsContainer}>
          <PeopleOption
            isPressed={solo}
            iconName="human-handsup"
            heading="Just me"
            text="A fun solo trip!"
            onPress={() => handlePress("solo")}
          />
          <PeopleOption
            isPressed={couple}
            iconName="human-male-female"
            heading="Couple"
            text="Table for two please!"
            onPress={() => handlePress("couple")}
          />
          <PeopleOption
            isPressed={family}
            iconName="human-male-female-child"
            heading="Family"
            text="All Aboard!"
            onPress={() => handlePress("family")}
          />
          <PeopleOption
            isPressed={friends}
            iconName="human-queue"
            heading="Friends"
            text="Wasn't there a TV show..."
            onPress={() => handlePress("friends")}
          />
        </View>
        <BackNextButtonRow
          nextDisabled={!(solo || couple || family || friends)} // Disable if no option is selected
          navigation={navigation}
          nextPage="TripInterestSelection"
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
  optionsContainer: {
    width: "100%",
    margin: SPACINGS.MD,
  },
  indicatorContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {},
});

export default TripPeopleSelection;
