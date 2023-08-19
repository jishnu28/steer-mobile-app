import { createStackNavigator } from "@react-navigation/stack";
import PostAccomodation from "../pages/post/postAccommodation";

const Stack = createStackNavigator();

export default function PostStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="postAccomodation" component={PostAccomodation} />
    </Stack.Navigator>
  );
}
