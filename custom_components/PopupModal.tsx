import React from "react";
import Modal from "react-native-modal";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import COLORS from "../config/COLORS";
import BodyText from "./typography/BodyText";

interface PopupModalProps {
  //https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1
  inputHeading: string;
  inputValue: string; //Input value of useState
  setInputValue(newValue: string): any; //set input value to useState
  saveValue(): any; //Takes in function that updates the value to Firebase
  isModalVisible: boolean; //Modal value of useState
  setModalVisibility(newVisibility: boolean): any; //set modal value to useState
}

const PopupModal = ({
  inputHeading,
  inputValue,
  setInputValue,
  saveValue,
  isModalVisible,
  setModalVisibility,
}: PopupModalProps) => {
  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={false}
      backdropOpacity={0.4}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.modalPopUp}>
        <BodyText>{inputHeading}</BodyText>
        <TextInput
          style={styles.infoBox}
          value={inputValue}
          onChangeText={(newValue) => setInputValue(newValue)}
        />
        <View style={styles.modalButtonSection}>
          <TouchableOpacity
            onPress={() => {
              setInputValue("");
              setModalVisibility(!isModalVisible);
            }}
            style={styles.modalButton}
          >
            <BodyText>Back</BodyText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              saveValue();
              setInputValue("");
              setModalVisibility(!isModalVisible);
            }}
            style={[
              styles.modalButton,
              { backgroundColor: COLORS.PRIMARY, borderWidth: 0 },
            ]}
          >
            <BodyText style={{ color: COLORS.WHITE }}>Confirm</BodyText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  modalPopUp: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: 160,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHTACCENT,
  },

  modalText: {
    fontFamily: "Bitter-Regular",
    fontSize: 17,
  },

  infoBox: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },

  modalButtonSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
  },

  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 80,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 40,
  },
});
