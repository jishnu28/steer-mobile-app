import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box } from "native-base";
import TouristsNavbar from "../custom_components/TouristsNavbar";
import { StyleSheet, Text, SafeAreaView, Image } from "react-native";

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text>This is our awesome Home screen for now.</Text>
        <Text>Tap on one of the icons in the navbar to open a page.</Text>
        <Text>Currently only itinerary should work</Text>
        <Image
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
        <StatusBar style="auto" />
        <TouristsNavbar navigation={navigation} />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
