import {
  collection,
  doc,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { defaultPicURL } from "../../../config/CONSTANTS";

// Type declarations for the fields in the accommodations collection
export interface AccommodationData {
  isActive: boolean;
  owner: string;
  title: string;
  description: string;
  images: string[]; // image URLs are fetched from cloud storage and stored as strings here
  numGuests: number;
  numBeds: number;
  numBaths: number;
  numBedrooms: number;
  price: number;
  address: string;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasHeating: boolean;
  hasWaterheater: boolean;
  accommodationTags: string[]; // for use in search and itinerary generation
  postingDate: Timestamp;
  // TODO: Add in the 'reviews' collection as a subcollection here
}

export default async function createAccommodation(newData: AccommodationData) {
  try {
    if (newData.images.length === 0) {
      newData.images.push(defaultPicURL);
    }
    const docRef = await addDoc(
      collection(firestore, "accommodations"),
      newData
    );
    await updateDoc(doc(firestore, "accommodations", docRef.id), {
      firestoreID: docRef.id,
    });
  } catch (error) {
    console.error(
      "Error creating new document in accommodations collection:",
      error
    );
    // TODO: Handle error or show error message to the user
  }
}
