// import { doc, updateDoc } from "firebase/firestore";
// import { firestore } from "../../../firebaseConfig";

// interface DBUsernameUploadProps {
//     document: string;
//     username: string;
// }

// export default async function DBUsernameUpload({
//     document,
//     username,
// }:  DBUsernameUploadProps) {
    
//     try {
//         const docRef= doc(firestore, "users", document)
//         await updateDoc(docRef, {
//             displayName: username,    
//         }); 
//     } catch (error) {
//         console.error(
//             "Error updating username to users collection:",
//             error
//         );
//     }
// }