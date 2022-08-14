import {
  query,
  where,
  collection,
  getDocs,
  getDoc,
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

type QuestionType = {
  content: string;
  choices: string[];
  results: Number[];
};
// idからアンケート取得
export const getQuestion = async (
  questionId: string
): Promise<QuestionType | null> => {
  const snapshot = await getDoc(doc(db, "questionnaires", questionId));
  const exist = snapshot.exists();
  if (exist) {
    const data = snapshot.data();
    return {
      content: data.content,
      choices: data.choices,
      results: data.results,
    };
  } else {
    return null;
  }
};
