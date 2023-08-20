import React, { useState } from "react";
import {
  FormControl,
  VStack,
  Input,
  Text,
  Heading,
  View,
  ScrollView,
} from "native-base";
import { Dimensions } from "react-native";
import NumberToggle from "./NumberToggle";
import BooleanToggle from "./BooleanToggle";

const { width, height } = Dimensions.get("window");

interface ExperienceInputsProps {}

const ExperienceInputs = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [numGuests, setNumGuests] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [categoryTags, setCategoryTags] = useState<string[]>([]);

  return (
    <View
      h={0.75 * height}
      style={{ flex: 1 }}
      py={4}
      backgroundColor={"#FAF8F0"}
    >
      <VStack px={4}>
        <Heading>Upload Experience</Heading>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Title:
            </Text>
          </FormControl.Label>
          <Input
            value={title}
            placeholder="Enter.."
            onChangeText={(text) => setTitle(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Description:
            </Text>
          </FormControl.Label>
          <Input
            value={description}
            placeholder="Enter.."
            onChangeText={(text) => setDescription(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Address:
            </Text>
          </FormControl.Label>
          <Input
            value={address}
            placeholder="Enter.."
            onChangeText={(text) => setAddress(text)}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16}>
              Price/person:
            </Text>
          </FormControl.Label>
          <Input
            value={price.toString()}
            placeholder="Enter.."
            onChangeText={(text) => setPrice(Number(text))}
          />
        </FormControl>

        <FormControl w={0.9 * width} p={2}>
          <FormControl.Label>
            <Text fontFamily={"Bitter-Medium"} fontSize={16} pb={1}>
              How many pax per booking:
            </Text>
          </FormControl.Label>
          <NumberToggle numItems={numGuests} setNumItems={setNumGuests} />
        </FormControl>
      </VStack>
    </View>
  );
};

export default ExperienceInputs;
