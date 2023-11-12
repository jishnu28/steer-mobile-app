import React, { useState } from "react";
import { Text, TouchableOpacity, Modal, View, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import COLORS from "../../../config/COLORS";

const DateSelection: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  // const [areDatesSelected, setAreDatesSelected] = useState(false); // Track selection state

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

  const handleCheckInPress = () => {
    setShowCalendar(true);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  const formatDate = (date: Date | null) => {
    return date ? moment(date).format("DD MMM YYYY") : "Select Dates";
  };

  var areDatesSelected = selectedStartDate !== null && selectedEndDate !== null;
  return (
    <>
      <TouchableOpacity onPress={handleCheckInPress}>
        <Text style={styles.headingText}>Dates:</Text>
        <Text style={styles.inputText}>
          {formatDate(selectedStartDate)} - {formatDate(selectedEndDate)}
        </Text>
      </TouchableOpacity>

      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.calendarModal}>
          <CalendarPicker
            onDateChange={(date) => handleDateSelect(date?.toDate() || null)}
            allowRangeSelection={true}
            minDate={new Date()}
            textStyle={{
              fontFamily: "Bitter-Regular",
            }}
            selectedDayColor="#FFC9AD"
          />
          <TouchableOpacity
            onPress={handleCalendarClose}
            disabled={!areDatesSelected}
          >
            <View
              style={areDatesSelected ? styles.button : styles.disableButton}
            >
              <Text style={styles.buttonText}>Select dates</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  calendarModal: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
    justifyContent: "center",
  },
  disableButton: {
    backgroundColor: "lightgray",
    padding: 10,
    alignItems: "center",
    margin: 30,
    borderRadius: 30,
  },
  button: {
    backgroundColor: "#FFAF87",
    padding: 10,
    alignItems: "center",
    margin: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Bitter-Regular",
  },
  headingText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Bitter-Bold",
    paddingLeft: 10,
    padding: 5,
    marginTop: 20,
  },
  inputText: {
    color: "#FF7733",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Bitter-Regular",
    paddingLeft: 10,
    padding: 5,
  },
});

export default DateSelection;
