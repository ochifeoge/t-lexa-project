import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../components/Firebase";

export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);

  await deleteDoc(productRef);
};
