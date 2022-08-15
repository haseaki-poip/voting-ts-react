import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase";

export type QuestionType = {
  id: string;
  content: string;
  choices: string[];
  results: number[];
  date: Date;
};

// アンケート作成
export const createQuestion = async (
  content: string,
  choiceList: string[],
  resultNums: number[]
): Promise<string> => {
  const wn = await addDoc(collection(db, "questionnaires"), {
    content: content,
    choices: choiceList,
    results: resultNums,
    timestamp: serverTimestamp(),
  });

  return wn.id;
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
      id: snapshot.id,
      content: data.content,
      choices: data.choices,
      results: data.results,
      date: data.timestamp.toDate(),
    };
  } else {
    return null;
  }
};

// 全てのアンケート取得
export const getAllQuestion = async (): Promise<QuestionType[]> => {
  const docSnap = await getDocs(collection(db, "questionnaires"));

  const questionList: QuestionType[] = [];
  docSnap.forEach((doc) => {
    const question: QuestionType = {
      id: doc.id,
      content: doc.data().content,
      choices: doc.data().choices,
      results: doc.data().results,
      date: doc.data().timestamp.toDate(),
    };
    questionList.push(question);
  });

  return questionList;
};

// 投票
export const voteUpdate = async (questionId: string, results: number[]) => {
  await setDoc(
    doc(db, "questionnaires", questionId),
    {
      results: results,
    },
    { merge: true } // merge: trueで一部のみ更新
  );
};
