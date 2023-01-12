import { collection, addDoc } from "firebase/firestore";
import MSG from "../../utils/constant";

export const AddNewDocument = async function (NameCollection, Data) {
  try {
    const docRef = await addDoc(collection(db, NameCollection), Data);
    console.log("Document written with ID: ", docRef.id);
    return MSG("Sucessfully", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
