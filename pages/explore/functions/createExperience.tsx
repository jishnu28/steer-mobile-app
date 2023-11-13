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
export interface ExperienceData {
  isActive: boolean;
  owner: string; // TODO: use id to link to post owner's profile
  title: string;
  description: string;
  images: string[]; // image URLs are fetched from cloud storage and stored as strings here
  price: number; // assumed price per person
  address: string; // replace with location coordinates so that potentially a map can be embedded in the future
  experienceTags: string[]; // for use in search and itinerary generation
  postingDate: Timestamp;
  // TODO: Add in the 'reviews' collection as a subcollection here
}

export default async function createExperience(newData: ExperienceData) {
  const sampleData: ExperienceData = {
    isActive: true,
    owner: "testOwner - this should be replaced with the user's UID",
    title: "Terrific testing tricycling",
    description: "This is a terrific testing tricycling experience",
    images: [],
    price: 1,
    address: "456 Testing Avenue",
    experienceTags: ["testing", "terrific", "tricycling"],
    postingDate: Timestamp.fromDate(new Date()),
  };

  try {
    if (newData.images.length === 0) {
      newData.images.push(defaultPicURL);
    }
    const docRef = await addDoc(collection(firestore, "experiences"), newData);
    await updateDoc(doc(firestore, "experiences", docRef.id), {
      firestoreID: docRef.id,
    });
  } catch (error) {
    console.error(
      "Error creating new document in experiences collection:",
      error
    );
    // TODO: Handle error or show error message to the user
  }
}
