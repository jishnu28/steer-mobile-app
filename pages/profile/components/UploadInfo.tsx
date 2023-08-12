import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface UploadInfoProps {
  name: string;
  email: string;
  isUserModalVisible: boolean;
  setUserModalVisible(isVisible: boolean): any;
  isEmailModalVisible: boolean;
  setEmailModalVisible(isVisible: boolean): any;
}

function UploadInfo({
  name,
  email,
  isUserModalVisible,
  setUserModalVisible,
  isEmailModalVisible,
  setEmailModalVisible,
}: UploadInfoProps) {
  return (
    <View style={{ marginLeft: 15 }}>
      <View style={styles.button}>
        <Text style={styles.profileText} numberOfLines={2}>
          {name}
        </Text>
        <TouchableOpacity
          onPress={() => setUserModalVisible(!isUserModalVisible)}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#88838A" />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Text style={styles.profileText} numberOfLines={2}>
          {email}
        </Text>
        <TouchableOpacity
          onPress={() => setEmailModalVisible(!isEmailModalVisible)}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#88838A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UploadInfo;

const styles = StyleSheet.create({
  profileText: {
    fontFamily: "Bitter-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#88838A",
    maxWidth: "80%",
    marginVertical: 1,
    marginHorizontal: 5,
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 3,
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F8FAF0",
  },
});
