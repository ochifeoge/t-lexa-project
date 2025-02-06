import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

export const productLoader = async ({ params }) => {
  try {
    const productRef = doc(db, "products", params.id);

    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      console.log(productSnapshot.data());
      return productSnapshot.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("error fetching product", error);
  }
};
