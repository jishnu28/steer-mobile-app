import { createStackNavigator } from "@react-navigation/stack";
import PostAccomodation from "../pages/post/postAccommodation";
import PostLanding from "../pages/post/postLanding";
import PostExperience from "../pages/post/postExperience";
import PostConfirmation from "../pages/post/postConfirmation";

const Stack = createStackNavigator();

export default function PostStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="postLanding" component={PostLanding} />
      <Stack.Screen name="postAccommodation" component={PostAccomodation} />
      <Stack.Screen name="postExperience" component={PostExperience} />
      <Stack.Screen name="postConfirmation" component={PostConfirmation} />
    </Stack.Navigator>
  );
}
