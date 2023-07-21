import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import DetailButtonRow from "./components/DetailButtonRow";
import DetailInfoCard from "./components/DetailInfoCard";
import ACCOMODATION from "../../config/ACCOMODATION";
const width = Dimensions.get("screen").width;

function Detail({ route }: any) {
  const item = route.params.item;
  const navigation = route.params.navigation;

  return (
    <View style={styles.container}>
      <ImageBackground source={item.image} style={styles.image}>
        <ScrollView style={styles.background}>
          <DetailButtonRow navigation={navigation} />
          <DetailInfoCard item={item} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  background: {
    top: width * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  container: {
    flex: 1,
  },

  image: {
    height: "60%",
    flex: 1,
    justifyContent: "center",
  },
});
