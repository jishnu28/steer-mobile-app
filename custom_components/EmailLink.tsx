import { Linking, Text } from "react-native";

interface EmailLinkProps {
  email: string;
  children: React.ReactNode;
}

const EmailLink: React.FC<EmailLinkProps> = ({ email, children }) => {
  const handlePress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return <Text onPress={handlePress}>{children}</Text>;
};

export default EmailLink;
