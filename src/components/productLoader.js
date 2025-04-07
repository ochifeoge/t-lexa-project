import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

export const productLoader = async ({ params }) => {
  try {
    const productRef = doc(db, "products2", params.id);

    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      return {
        id: params.id,
        ...productSnapshot.data(),
      };
    } else {
      console.log("No such document!");
      alert("no, such document exist");
    }
  } catch (error) {
    console.log("error fetching product", error);
  }
};
