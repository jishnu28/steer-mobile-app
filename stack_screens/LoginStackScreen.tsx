import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/login";
import LandingScreen from "../pages/landing";

const LoginStack = createStackNavigator();

export default function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Landing" component={LandingScreen} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}
