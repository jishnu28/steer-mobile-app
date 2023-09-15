import React from "react";
import { NativeBaseProvider, Center, Button, View } from "native-base";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ItineraryLandingProps {
  navigation: NativeStackNavigationProp<any>;
}
function ItineraryLanding({ navigation }: ItineraryLandingProps) {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Center flex={1}>
          <View marginBottom={12}>
            <Text style={[styles.heading, { textAlign: "center" }]}>
              Build your
            </Text>
            <Text
              style={[
                styles.heading,
                {
                  fontFamily: "Bitter-Bold",
                  fontSize: 40,
                  marginTop: 36,
                },
              ]}
            >
              perfect
            </Text>
            <Text
              style={[
                styles.heading,
                {
                  fontFamily: "Bitter-Bold",
                  textAlign: "right",
                  fontSize: 40,
                  paddingLeft: 48,
                  marginBottom: 36,
                },
              ]}
            >
              itinerary
            </Text>
            <Text style={[styles.heading, { textAlign: "center" }]}>
              with us...
            </Text>
          </View>
          <View style={{ marginTop: 28 }}>
            <Button
              variant="outline"
              colorScheme="orange"
              backgroundColor={"#FFAF87"}
              style={{ borderWidth: 2, borderRadius: 100, marginTop: 12 }}
              onPress={() => navigation.navigate("DatePicker")}
            >
              <Text
                style={{
                  fontFamily: "Bitter-Medium",
                  fontSize: 24,
                  paddingVertical: 8,
                  paddingHorizontal: 48,
                  color: "#3E3B3F",
                }}
              >
                Get Started!
              </Text>
            </Button>
          </View>
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E8D9",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontFamily: "Bitter-Medium",
    height: 50,
    fontSize: 32,
  },
});

export default ItineraryLanding;
