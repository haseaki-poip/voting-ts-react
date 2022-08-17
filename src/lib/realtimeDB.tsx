import { ref, update, set, push, get, child } from "firebase/database";
import { rt_db } from "../firebase";

export type QuestionType = {
  id: string;
  content: string;
  choices: string[];
  results: number[];
  date: Date;
};

// idからアンケート取得
export const getQuestion = async (
  questionId: string
): Promise<QuestionType | null> => {
  const dbRef = ref(rt_db);
  const snapshot = await get(child(dbRef, "questionnaires/" + questionId));
  const question: QuestionType | null = snapshot.val();
  return question;
};

// アンケート作成
export const createQuestion = async (
  content: string,
  choiceList: string[],
  resultNums: number[]
): Promise<string | null> => {
  const postListRef = ref(rt_db, "questionnaires");
  const newPostRef = push(postListRef);
  await set(newPostRef, {
    choices: choiceList,
    content: content,
    results: resultNums,
    date: String(new Date()),
  });
  return newPostRef.key;
};

// 全てのアンケート取得
export const getAllQuestion = async (): Promise<QuestionType[]> => {
  const dbRef = ref(rt_db);
  const snapshot = await get(child(dbRef, "questionnaires"));
  const questionList: QuestionType[] = [];
  const allData = snapshot.val();

  Object.keys(allData).forEach((key) => {
    const data = allData[key];
    const question: QuestionType = {
      id: key,
      content: data.content,
      choices: data.choices,
      results: data.results,
      date: new Date(data.date),
    };
    questionList.push(question);
  });

  return questionList;
};

// 投票
export const voteUpdate = async (questionId: string, results: number[]) => {
  const dbRef = ref(rt_db);
  await update(child(dbRef, "questionnaires/" + questionId), {
    results: results,
  });
};
