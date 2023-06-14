import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import COLORS from "../../config/COLORS";
import CATEGORIES from "../../config/CATEGORIES";

import Ionicons from "@expo/vector-icons/Ionicons";

const width = Dimensions.get("screen").width;

function ExploreLanding() {
  const [activeCategory, setActiveCategory] = useState(0);
  return ( 
    <SafeAreaView style={styles.background}>
      <View style={styles.content}>
        <ScrollView horizontal>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(index)}
              style={{ marginRight: 10 }}
              key={category.id}
            >
              <Text
                style={{
                  fontSize: 20,
                  color:
                    activeCategory === index ? COLORS.ORANGE : COLORS.BROWN,
                  fontFamily: 
                    activeCategory === index ? 'AvenirNext-Bold' : 'Avenir Next',
                }}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.75}
          decelerationRate="fast"
          pagingEnabled
          style={{ marginVertical: 20 }}
        >
          {CATEGORIES[activeCategory].items.map((item, index) => (
            <TouchableOpacity 
              style={styles.card} 
              key={index}
            >
              <View style={styles.heartButtonContainer}>
                <TouchableOpacity style={styles.heartButton}>
                  <Ionicons name="heart" size={40} color={COLORS.WHITE} />
                </TouchableOpacity>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  {item.title} {item.price}
                </Text>
              </View>

              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.BEIGE,
    flex: 1,
  },

  content: {
    padding: 20,
  },

  heartButton: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 100,
    height: 50,
    width: 50,
    padding: 5,
    alignSelf: "flex-end",
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },

  description: {
    textAlign: "justify",
    padding: 10,
    fontFamily: 'Avenir',
    fontSize: 20,
    color: COLORS.BROWN,
    
  },

  descriptionContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: '15%',
    backgroundColor: COLORS.WHITE,
    alignContent: 'center',
    justifyContent: 'center',
    bottom: 0,
    
  },

  image: {
    width: "100%",
    height: "100%",
  },

  card: {
    width: width * 0.7,
    height: width * 0.9,
    overflow: "hidden",
    borderRadius: 20,
    marginRight: 20,
  },
});

export default ExploreLanding;
