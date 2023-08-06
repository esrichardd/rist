import {
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/config";
import { FilterDocument } from "./types";

export async function saveDocument(collectionName: string, data: object) {
  const docRef = await addDoc(collection(firestore, collectionName), data);
  return getDocument(collectionName, docRef.id);
}

export async function getDocuments(collectionName: string) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const documents = querySnapshot.docs.map((doc) => mapDocumentToData(doc));
  return documents;
}

export async function getFilteredDocuments(
  collectionName: string,
  filters: FilterDocument[]
) {
  const queryConstraints: QueryFieldFilterConstraint[] = filters.map((filter) =>
    where(filter.field, filter.operator, filter.value)
  );

  const q = query(collection(firestore, collectionName), ...queryConstraints);
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => mapDocumentToData(doc));

  return documents;
}

export async function getDocument(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? mapDocumentToData(docSnap) : null;
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: object
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data);
  return getDocument(collectionName, id);
}

export async function deleteDocument(collectionName: string, id: string) {
  await deleteDoc(doc(firestore, collectionName, id));
  return true;
}

const mapDocumentToData = (doc: QueryDocumentSnapshot) => {
  return { id: doc.id, ...doc.data() };
};
