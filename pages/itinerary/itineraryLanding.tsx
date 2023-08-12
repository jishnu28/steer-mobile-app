import React from "react";
import {
  NativeBaseProvider,
  Heading,
  Text,
  ScrollView,
  Slider,
  Stack,
  Box,
  Center,
  Skeleton,
} from "native-base";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Linking,
  Image,
} from "react-native";

interface EmailLinkProps {
  email: string;
  children: React.ReactNode;
}

const EmailLink: React.FC<EmailLinkProps> = ({ email, children }) => {
  const handlePress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <Text onPress={handlePress} textDecorationLine={"underline"}>
      {children}
    </Text>
  );
};

const ItineraryLanding = () => {
  // const [natureValue, setnatureValue] = React.useState(50);
  // const [trekkingValue, settrekkingValue] = React.useState(50);
  // const [birdWatchingValue, setbirdWatchingValue] = React.useState(50);
  // const [campActivitiesValue, setcampActivitiesValue] = React.useState(50);
  // const [budgetValue, setbudgetValue] = React.useState(50);
  // const [durationValue, setdurationValue] = React.useState(50);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Center>
          <Heading paddingBottom={10}>
            Oops! We're still working on this:
          </Heading>
          <Image source={require("../../assets/coding-cat.gif")} />
          <Text padding={10} fontSize={"md"}>
            In the meantime, feel free to submit your feedback to us at the
            following link:{" "}
            <EmailLink email="steerapprc4@gmail.com">
              steerapprc4@gmail.com
            </EmailLink>
          </Text>
        </Center>
        {/* <ScrollView>
          <Box paddingBottom="16">
            <Heading alignContent="center">Make my itinerary!</Heading>
            <Text>
              Help us build the perfect itinerary for you! Simply fill up the
              form below and we will do the rest!
            </Text>
          </Box>
          <Box alignItems="center" w="100%" paddingBottom="16">
            <Stack space={4} alignItems="center" w="75%" maxW="300">
              <Text textAlign="center">Nature: {natureValue}</Text>
              <Slider
                defaultValue={50}
                colorScheme="cyan"
                onChange={(v) => {
                  setnatureValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text textAlign="center">Trekking: {trekkingValue}</Text>
              <Slider
                defaultValue={50}
                colorScheme="cyan"
                onChange={(v) => {
                  settrekkingValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text textAlign="center">Bird-watching: {birdWatchingValue}</Text>
              <Slider
                defaultValue={50}
                colorScheme="cyan"
                onChange={(v) => {
                  setbirdWatchingValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text textAlign="center">
                Camp-activities: {campActivitiesValue}
              </Text>
              <Slider
                defaultValue={50}
                colorScheme="cyan"
                onChange={(v) => {
                  setcampActivitiesValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </Stack>
          </Box>
          <Box alignItems="center" w="100%" paddingBottom="16">
            <Stack space={4} alignItems="center" w="75%" maxW="300">
              <Text textAlign="center">Budget: {budgetValue}</Text>
              <Slider
                defaultValue={0}
                colorScheme="green"
                onChange={(v) => {
                  setbudgetValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text textAlign="center">Duration of Stay: {durationValue}</Text>
              <Slider
                defaultValue={0}
                colorScheme="green"
                onChange={(v) => {
                  setdurationValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </Stack>
          </Box>
        </ScrollView> */}
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

export default ItineraryLanding;
