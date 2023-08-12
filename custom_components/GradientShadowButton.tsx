import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow } from "react-native-shadow-2";
import { Box } from "native-base";

interface GradientShadowButtonProps {
  onPress: () => void;
  title: string;
}

const GradientShadowButton: React.FC<GradientShadowButtonProps> = ({
  onPress,
  title,
}) => {
  const shadowStyle = {
    width: 200,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="60%"
      alignSelf="center"
      position="absolute"
      bottom={100}
    >
      <Shadow style={shadowStyle}>
        <LinearGradient
          colors={["#FFAF87", "#FF8E53"]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.button}
        >
          <TouchableOpacity onPress={onPress} style={styles.touchable}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Shadow>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Bitter-Regular",
  },
});

export default GradientShadowButton;
