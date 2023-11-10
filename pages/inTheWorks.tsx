import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  View,
} from "react-native";
import EmailLink from "../custom_components/EmailLink";
import H1 from "../custom_components/typography/H1";
import BodyText from "../custom_components/typography/BodyText";
import SPACINGS from "../config/SPACINGS";

const InTheWorks = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <H1 style={styles.text}>Oops! We're still working on this:</H1>
        <Image
          source={require("../assets/animations/coding-cat.gif")}
          style={styles.image}
        />
        <BodyText style={styles.text}>
          In the meantime, feel free to submit your feedback to us at the
          following link:{" "}
          <EmailLink email="steerapprc4@gmail.com">
            steerapprc4@gmail.com
          </EmailLink>
        </BodyText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
  },
  image: {
    margin: SPACINGS.MD,
    borderRadius: SPACINGS.XL,
  },
  text: {
    textAlign: "center",
  },
});

export default InTheWorks;
