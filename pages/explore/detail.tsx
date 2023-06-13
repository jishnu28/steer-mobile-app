import React from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DetailButtonRow from "./components/DetailButtonRow";
import COLORS from "../../config/COLORS";

const width = Dimensions.get("screen").width;

function Detail({ route }: any) {
  const itemTitle = route.params.itemTitle;
  const itemPrice = route.params.itemPrice;
  const itemImage = route.params.itemImage;
  const itemDescription = route.params.itemDescription;

  const navigation = route.params.navigation;

  return (
    <View style={styles.container}>
      <ImageBackground source={itemImage} style={styles.image}>
        <ScrollView style={styles.background}>
          <DetailButtonRow navigation={navigation} />

          <View style={{ paddingTop: 10 }}>
            <Text>{itemTitle}</Text>
            <Text>{itemPrice}</Text>
            <Text>{itemDescription}</Text>
          </View>
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
    backgroundColor: COLORS.BEIGE,
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
