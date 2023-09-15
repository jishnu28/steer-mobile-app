import { Linking } from "react-native";
import { Text } from "native-base";

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

export default EmailLink;
