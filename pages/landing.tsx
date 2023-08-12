import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";

interface LandingProps {
  navigation: NativeStackNavigationProp<any>;
}

const LandingScreen: React.FC<LandingProps> = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the Login screen after 800 milliseconds
    const timeout = setTimeout(() => {
      navigation.dispatch(StackActions.replace("Login"));
    }, 800);

    // Clear the timeout if the component unmounts before the delay is reached
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* App icon in the middle */}
      <Image source={require("../assets/images/steer-logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAF0",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingScreen;
