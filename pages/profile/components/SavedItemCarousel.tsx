import React, { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeartButton from "../../explore/components/HeartButton";
import SavedImageCarousel from "./SavedImageCarousel";
import {
  getDoc,
  getDocs,
  collection,
  DocumentData,
  doc,
} from "firebase/firestore";
import { firestore, firebaseAuth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface SavedItemCarouselProps {
  // activeCategory: number;
  collectionName: string;
  // navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const cardWidth: number = width * 0.8;
const cardHeight: number = height * 0.54;

function SavedItemCarousel({
  // activeCategory,
  // navigation,
  collectionName,
}: SavedItemCarouselProps) {
  const [dbItems, setDbItems] = React.useState<DocumentData[]>([]);
  const [user, loading, error] = useAuthState(firebaseAuth);

  useEffect(() => {
    async function fetchData() {
      const currItems: DocumentData[] = [];

      const userRef = doc(firestore, "users", user?.uid as any);
      const userDoc = await getDoc(userRef);
      const savedItems = userDoc.data()?.favouritedPosts;
      // console.log(savedItems);

      const querySnapshot = await getDocs(
        collection(firestore, collectionName)
      );
      querySnapshot.docs.forEach((doc) => {
        if (savedItems?.includes(doc.id)) {
          currItems.push(doc.data());
        }
      });
      setDbItems(currItems);
    }

    fetchData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginVertical: 20 }}
    >
      {dbItems.map((item, index) => (
        <View key={`${index}-${item.title}`}>
          <View style={styles.card}>
            <Pressable
              key={index}
              style={styles.descriptionBackground}
              // onPress={() =>
              //   navigation.navigate("Detail", {
              //     item: item,
              //     navigation: navigation,
              //   })
              // }
            >
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}> {item.title} </Text>
                <Text style={styles.price}>
                  {" "}
                  ${item.price}
                  <Text style={[styles.price, { fontSize: 14 }]}>
                    /night
                  </Text>{" "}
                </Text>
              </View>
            </Pressable>

            <SavedImageCarousel
              width={cardWidth}
              height={cardHeight}
              imagesToShow={item.images ?? []}
              item={item}
              page={false}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default SavedItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontFamily: "Bitter-Bold",
    fontWeight: "800",
    color: "#343135",
    flexWrap: "wrap",
  },

  price: {
    fontSize: 24,
    fontFamily: "Bitter-Bold",
    fontWeight: "800",
    color: "#FFFFFF",
  },

  descriptionContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
    height: 87,
  },

  descriptionBackground: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: 87,
    backgroundColor: "#E5E8D9",
    opacity: 0.8,
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },
});
