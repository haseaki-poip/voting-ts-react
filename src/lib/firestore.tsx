import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";
import { db } from "../firebase";

// アンケート作成
export const createQuestion = async (
  content: string,
  choiceList: string[],
  resultNums: Number[]
): Promise<string> => {
  const wn = await addDoc(collection(db, "questionnaires"), {
    content: content,
    choices: choiceList,
    results: resultNums,
  });

  return wn.id;
};
