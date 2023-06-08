import React from "react";
import { Box, Text, Icon, HStack, Center, Pressable } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface TouristsNavbarProps {
  navigation: NativeStackNavigationProp<any>;
  currentIndex?: number;
}

function TouristsNavbar({ navigation, currentIndex }: TouristsNavbarProps) {
  const [selected, setSelected] = React.useState(currentIndex);

  const handlePress = (num: number, dest: string) => {
    setSelected(num);
    navigation.navigate(dest);
  };

  return (
    <Box
      bg="white"
      width="100%"
      alignSelf="center"
      position="absolute"
      bottom={0}
    >
      <HStack bg="indigo.700" alignItems="center" shadow={6} height={60}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          height="100%"
          flex={1}
          onPress={() => handlePress(0, "Explore")}
        >
          <Center>
            <Icon
              mb="1"
              paddingTop="5%"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "map-search" : "map-search-outline"}
                />
              }
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12" paddingBottom="5%">
              Explore
            </Text>
          </Center>
        </Pressable>

        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          height="100%"
          flex={1}
          onPress={() => handlePress(1, "Itinerary")}
        >
          <Center>
            <Icon
              mb="1"
              paddingTop="5%"
              as={
                <Ionicons name={selected === 1 ? "create" : "create-outline"} />
              }
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12" paddingBottom="5%">
              Itinerary
            </Text>
          </Center>
        </Pressable>

        <Pressable
          opacity={selected === 2 ? 1 : 0.5}
          height="100%"
          flex={1}
          onPress={() => handlePress(2, "Messages")}
        >
          <Center>
            <Icon
              mb="1"
              paddingTop="5%"
              as={
                <MaterialCommunityIcons
                  name={
                    selected === 2 ? "message-text" : "message-text-outline"
                  }
                />
              }
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12" paddingBottom="5%">
              Messages
            </Text>
          </Center>
        </Pressable>

        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          height="100%"
          flex={1}
          onPress={() => handlePress(3, "Profile")}
        >
          <Center>
            <Icon
              mb="1"
              paddingTop="5%"
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? "account" : "account-outline"}
                />
              }
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12" paddingBottom="5%">
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}

export default TouristsNavbar;
