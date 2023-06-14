import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ReturnButton from "./ReturnButton";
import HeartButton from "./HeartButton";

interface DetailButtonRowProps {
  navigation: NativeStackNavigationProp<any>;
}

function DetailButtonRow({ navigation }: DetailButtonRowProps) {
  return (
    <View style={styles.detailButtonRow}>
      <ReturnButton navigation={navigation} />
      <HeartButton />
    </View>
  );
}

export default DetailButtonRow;

const styles = StyleSheet.create({
  detailButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
