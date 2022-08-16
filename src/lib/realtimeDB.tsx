import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { rt_db } from "../firebase";

export type QuestionType = {
  id: string;
  content: string;
  choices: string[];
  results: number[];
  date: Date;
};

type GetDataType = {
  content: string;
  choices: string[];
  results: number[];
  date: Date;
};

export const a = () => {
  const db = getDatabase();
  const starCountRef = ref(rt_db, "questionnaires");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};

export const writeUserData = () => {
  const postListRef = ref(rt_db, "questionnaires");
  const newPostRef = push(postListRef);
  console.log(newPostRef.key);
  set(newPostRef, {
    choices: ["はい", "いいえ"],
    content: "野球は好きか",
    results: [8, 5],
    date: String(new Date()),
  });
};

// 全てのアンケート取得
export const getAllQuestion = async (): Promise<QuestionType[]> => {
  const starCountRef = ref(rt_db, "questionnaires");

  const questionList: QuestionType[] = [];
  onValue(starCountRef, (snapshot) => {
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
  });
  return questionList;
};
