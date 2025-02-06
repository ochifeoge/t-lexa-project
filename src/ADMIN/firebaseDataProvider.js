import { db } from "../components/Firebase";

import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseDataProvider = {
  getList: async (resource, params) => {
    const querySnapshot = await getDocs(collection(db, resource));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data, totala: data.length };
  },
  getOne: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    const docSnap = await getDoc(docRef);
    return { data: { id: docSnap.id, ...docSnap.data() } };
  },
  create: async (resource, params) => {
    const docRef = await addDoc(collection(db, resource), params.data);
    return { data: { id: docRef.id, ...params.data } };
  },
  /*   update: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    await updateDoc(docRef, params.data);
    return { data: { id: params.id, ...params.data } };
  }, */
  delete: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    await deleteDoc(docRef);
    return { data: params.id };
  },
};
export const getOne = async (resource, productId) => {
  const docRef = doc(db, resource, productId);
  const docSnap = await getDoc(docRef);
  return { data: { id: docSnap.id, ...docSnap.data() } };
};

export const update = async (database, resource, id, data) => {
  const docRef = doc(database, resource, id);
  await updateDoc(docRef, data);
};

export default firebaseDataProvider;
