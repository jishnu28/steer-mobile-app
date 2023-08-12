// import { doc, updateDoc } from "firebase/firestore";
// import { firestore } from "../../../firebaseConfig";

// interface DBEmailUploadProps {
//     document: string;
//     email: string;
// }

// export default async function DBEmailUpload({
//     document,
//     email,
// }:  DBEmailUploadProps) {
    
//     try {
//         const docRef= doc(firestore, "users", document)
//         await updateDoc(docRef, {
//             email: email,    
//         }); 
//     } catch (error) {
//         console.error(
//             "Error updating email to users collection:",
//             error
//         );
//     }
}