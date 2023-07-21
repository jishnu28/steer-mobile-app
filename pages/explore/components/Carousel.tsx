import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import ACCOMODATION from "../../../config/ACCOMODATION";
import CarouselItem from "./CarouselItem";
import ReturnButton from "./ReturnButton";

function Carousel({ route }: any) {
  const navigation = route.params.navigation;

  var paginatorView = [];
  for (let index = 0; index < ACCOMODATION.length; index++) {
    paginatorView.push(<View style={styles.dotInactive}></View>);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.returnButton}>
        <ReturnButton navigation={navigation} />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator
        data={ACCOMODATION}
        renderItem={({ item }) => <CarouselItem item={item} />}
        bounces={false}
        snapToAlignment="center"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
      />

      {/* <View style={styles.paginator}>
        {paginatorView}
      </View> */}
    </SafeAreaView>
  );
}

export default Carousel;

const styles = StyleSheet.create({
  returnButton: {
    width: "100%",
    paddingLeft: 20,
    alignContent: "flex-start",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },

  dotInactive: {
    borderWidth: 1,
    borderRadius: 100,
    height: 15,
    width: 15,
    marginLeft: 5,
    marginRight: 5,
  },

  paginator: {
    backgroundColor: "green",
    flexDirection: "row",
  },
});
