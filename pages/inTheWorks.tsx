import React from "react";
import { NativeBaseProvider, Heading, Text, Center } from "native-base";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Linking,
  Image,
} from "react-native";
import EmailLink from "../custom_components/EmailLink";

const inTheWorks = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Center>
          <Heading fontFamily={"Bitter-Bold"} paddingBottom={10}>
            Oops! We're still working on this:
          </Heading>
          <Image source={require("../../assets/animations/coding-cat.gif")} />
          <Text fontFamily={"Bitter-Regular"} padding={10} fontSize={"md"}>
            In the meantime, feel free to submit your feedback to us at the
            following link:{" "}
            <EmailLink email="steerapprc4@gmail.com">
              steerapprc4@gmail.com
            </EmailLink>
          </Text>
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default inTheWorks;
