import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { NativeBaseProvider, Box, Progress } from "native-base";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  View,
} from "react-native";
import Calendar from "react-native-calendar-date-range-picker";

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Box
          w="90%"
          maxW="400"
          paddingTop={4}
          paddingBottom={8}
          alignSelf={"center"}
        >
          <Progress
            value={25}
            mx="4"
            backgroundColor={"#F8FAF0"}
            _filledTrack={{ backgroundColor: "#9CADA4" }}
          />
        </Box>
        <Text
          style={{
            fontFamily: "Bitter-Bold",
            fontSize: 32,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingBottom: 20,
            textAlign: "left",
          }}
        >
          When's the trip?
        </Text>
        <Text>selected: {date.toLocaleString()}</Text>
        <Button onPress={showDatepicker} title="Select a date" />
        <Box width={"95%"} alignSelf={"center"}>
          <Calendar
            subtitle={(count) => `${count} nights`}
            monthHeight={300}
            renderWeekTextComponent={(weekdayTitle) => (
              <Text style={styles.monthTextStyle} key={weekdayTitle}>
                {weekdayTitle}
              </Text>
            )}
            renderMonthTextComponent={(monthName) => (
              <Text>
                {`${monthName.format("MMMM")} ${monthName
                  .clone()
                  .locale("en")
                  .format("YYYY")}`}
              </Text>
            )}
            renderFooterComponent={(handleDonePressed, daysDifference) => (
              <View style={{ alignItems: "center" }}>
                <View style={styles.dividerStyle} />
                <Button
                  onPress={handleDonePressed}
                  title={`Done (${daysDifference} selected)`}
                />
              </View>
            )}
          />
        </Box>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  monthTextStyle: {
    marginTop: 20,
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 5,
  },
  dividerStyle: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",
  },
});
