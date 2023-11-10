import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import COLORS from "../../config/COLORS";
import SPACINGS from "../../config/SPACINGS";
import H1 from "../../custom_components/typography/H1";
import SimpleStep from "./components/SimpleStep";
import H3 from "../../custom_components/typography/H3";
import BackNextButtonRow from "./components/BackNextButtonRow";
import { TripInputsContext } from "./components/TripInputsContext";
import { LinearProgress } from "@rneui/themed";

interface TripDateSelectionProps {
  navigation: NativeStackNavigationProp<any>;
}

function TripDateSelection({ navigation }: TripDateSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  const [dateString, setDateString] = useState("");
  const { setTripLength } = React.useContext(TripInputsContext);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    const year = currentDate?.getFullYear();
    const month = (currentDate?.getMonth() ?? 0) + 1; // getMonth() is zero-based
    const day = currentDate?.getDate();
    const formattedDate = `${day}-${month}-${year}`;
    setShow(false);
    setDate(currentDate);
    setDateString(formattedDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endMode, setEndMode] = useState<any>("date");
  const [showEndDate, setShowEndDate] = useState(false);
  const [endDateString, setEndDateString] = useState("");

  const onChangeEnd = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    const year = currentDate?.getFullYear();
    const month = (currentDate?.getMonth() ?? 0) + 1; // getMonth() is zero-based
    const day = currentDate?.getDate();
    const formattedDate = `${day}-${month}-${year}`;
    setShowEndDate(false);
    setEndDate(currentDate);
    setEndDateString(formattedDate);
  };

  const showEndMode = (currentMode: any) => {
    setShowEndDate(true);
    setEndMode(currentMode);
  };

  const showEndDatepicker = () => {
    showEndMode("date");
  };

  const handleNextPress = () => {
    if (date !== undefined && endDate !== undefined && date < endDate) {
      const diffTime = Math.abs(endDate.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTripLength(diffDays);
      navigation.navigate("TripPeopleSelection", {
        navigation: navigation,
      });
    } else {
      alert("Please select a valid date range.");
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <LinearProgress
        color={COLORS.PRIMARY}
        value={0.25}
        variant="determinate"
      />
      <View style={styles.container}>
        <H1>When's the trip?</H1>
        <View style={styles.stepsContainer}>
          <View style={styles.innerContainer}>
            <SimpleStep
              iconName="calendar-month-outline"
              heading="Start Date"
              text="When does the trip start?"
              style={styles.simpleStep}
            />
            <View style={styles.datePicker}>
              {date && <H3 style={{ width: "60%" }}>Start: {dateString}</H3>}
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date ?? new Date()}
                  mode={mode}
                  onChange={onChange}
                />
              )}
              <Pressable onPress={showDatepicker} style={styles.button}>
                <H3>Select a date</H3>
              </Pressable>
            </View>
          </View>
          <View style={styles.innerContainer}>
            <SimpleStep
              iconName="calendar-month-outline"
              heading="End Date"
              text="When does the trip end?"
              style={styles.simpleStep}
            />
            <View style={styles.datePicker}>
              {endDate && (
                <H3 style={{ width: "60%" }}>End: {endDateString}</H3>
              )}
              {showEndDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate ?? new Date()}
                  mode={endMode}
                  onChange={onChangeEnd}
                />
              )}
              <Pressable onPress={showEndDatepicker} style={styles.button}>
                <H3>Select a date</H3>
              </Pressable>
            </View>
          </View>
        </View>
        <BackNextButtonRow
          navigation={navigation}
          nextPage="TripPeopleSelection"
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
    justifyContent: "center",
    margin: SPACINGS.MD,
  },
  stepsContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: SPACINGS.MD,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACINGS.XL,
  },
  simpleStep: {
    marginVertical: SPACINGS.XL,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default TripDateSelection;
