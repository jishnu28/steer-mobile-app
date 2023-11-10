import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeartButton from "./HeartButton";
import ImageCarousel from "./ImageCarousel";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { RefreshControl } from "react-native-gesture-handler";
import SPACINGS from "../../../config/SPACINGS";
import FONTSIZES from "../../../config/FONTSIZES";
import COLORS from "../../../config/COLORS";

interface ExploreItemCarouselProps {
  activeCategory?: number;
  collectionName?: string;
  items?: DocumentData[];
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const cardWidth: number = width * 0.8;
const cardHeight: number = height * 0.6;

function ExploreItemCarousel({
  navigation,
  collectionName,
  items,
}: ExploreItemCarouselProps) {
  const [dbItems, setDbItems] = React.useState<DocumentData[]>([]);
  const [refreshing, setRefreshing] = useState(true);

  async function fetchData() {
    if (collectionName) {
      const currItems: DocumentData[] = [];
      const querySnapshot = await getDocs(
        collection(firestore, collectionName)
      );
      querySnapshot.docs.forEach((doc) => {
        currItems.push(doc.data());
      });
      setDbItems(currItems);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    if (collectionName) {
      fetchData();
    }
    setDbItems(items ?? []);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginVertical: 20 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      {dbItems.map((item, index) => (
        <View key={index}>
          <View style={styles.heartButtonContainer}>
            <HeartButton item={item} />
          </View>

          <View style={styles.card}>
            <Pressable
              style={styles.descriptionBackground}
              onPress={() =>
                navigation.navigate("Detail", {
                  item: item,
                  navigation: navigation,
                })
              }

              // Uncomment this section to see the Gallery view
              // navigation.navigate("Gallery", {
              //   item: item,
              //   navigation: navigation,
              // })}
            >
              <View style={styles.descriptionContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {" "}
                    {item.title}{" "}
                  </Text>
                </View>
                <Text style={styles.price}>
                  ${item.price}
                  <Text style={[styles.price, { fontSize: 14 }]}>
                    {" "}
                    / night
                  </Text>{" "}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("Detail", {
                  item: item,
                  navigation: navigation,
                })
              }
            >
              <ImageCarousel
                width={cardWidth}
                height={cardHeight}
                imagesToShow={
                  item.images ?? [
                    "../../../assets/images/default-listing-image.png",
                  ]
                }
                navigation={navigation}
                item={item}
                page={false}
              />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default ExploreItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    overflow: "hidden",
    borderRadius: SPACINGS.XL,
    marginVertical: SPACINGS.MD,
  },

  titleContainer: {
    flex: 1,
    alignItems: "flex-start",
  },

  title: {
    fontSize: FONTSIZES.XL,
    fontFamily: "Bitter-Bold",
    color: COLORS.WHITE,
    flexWrap: "wrap",
  },

  price: {
    fontSize: FONTSIZES.XL,
    fontFamily: "Bitter-Bold",
    color: COLORS.WHITE,
  },

  descriptionContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACINGS.MD,
    width: "100%",
    height: 88,
  },

  descriptionBackground: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: 88,
    backgroundColor: COLORS.PRIMARY,
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },
});
