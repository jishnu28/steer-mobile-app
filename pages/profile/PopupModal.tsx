import React from "react";
import Modal from "react-native-modal";
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

interface PopupModalProps {
    //https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1
    inputName: string;
    inputValue: string; //Input value of useState
    setInputValue(newValue: string): any; //set input value to useState
    saveValue(): any; //Takes in function that updates the value to Firebase
    isModalVisible: boolean; //Modal value of useState
    setModalVisibility(newVisibility: boolean): any; //set modal value to useState
};

const PopupModal = ({inputName, inputValue, setInputValue, saveValue, isModalVisible, setModalVisibility}: PopupModalProps) => {
    return (
        <Modal 
            isVisible={isModalVisible} 
            coverScreen= {false}
            backdropOpacity= {0.4}
            style= {{justifyContent:'center', alignItems:'center'}}
            >
            <View style={styles.modalPopUp}>
                <Text style={styles.modalText}>Enter your new {inputName} below:</Text>
                <TextInput
                    style={styles.infoBox}
                    value={inputValue}
                    onChangeText={newValue => setInputValue(newValue)}
                />
                <View style={styles.modalButtonSection}>
                    <TouchableOpacity
                        onPress={()=>{
                            setInputValue('')
                            setModalVisibility(!isModalVisible)
                        }}
                        style={styles.modalButton}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            saveValue()
                            setInputValue('')
                            setModalVisibility(!isModalVisible)
                        }}
                        style={styles.modalButton}
                    >
                        <Text>Confirm</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}

export default PopupModal

const styles = StyleSheet.create({
    modalPopUp: {
        justifyContent: "space-around",
        alignItems: 'center',
        width: '90%',
        height: 160,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#E5E8D9'
    },

    modalText: {
        fontSize: 17
    },

    infoBox: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    modalButtonSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },

    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 80,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 40,
    }
});