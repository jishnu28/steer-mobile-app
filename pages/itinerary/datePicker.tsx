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
} from "react-native";

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
        <Box w="90%" maxW="400" paddingTop={4} paddingBottom={8}>
          <Progress value={25} mx="4" />
        </Box>
        <Text
          style={{
            fontFamily: "Bitter-Bold",
            fontSize: 32,
            fontWeight: "bold",
            paddingBottom: 20,
            textAlign: "left",
          }}
        >
          When's the trip?
        </Text>
        <Text>selected: {date.toLocaleString()}</Text>
        <Button onPress={showDatepicker} title="Select a date" />
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
});
