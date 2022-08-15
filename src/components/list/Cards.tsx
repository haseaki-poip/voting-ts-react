import { useEffect, useState } from "react";
import { getAllQuestion } from "../../lib/firestore";
import type { QuestionType } from "../../lib/firestore";
import Card from "./Card";

function Cards() {
  const [allQuestion, setAllQuestion] = useState<QuestionType[]>([]);

  useEffect(() => {
    getAllQuestion()
      .then((allQuestion) => {
        setAllQuestion(allQuestion);
      })
      .catch((e) => {
        alert("エラーによりデータを取得できませんでした");
      });
  }, []);

  return (
    <div className="back-gradation-for-detail">
      <div className="grid md:grid-cols-4 grid-cols-1 place-items-center justify-items-center gap-5 md:px-20 px-5 py-10">
        {allQuestion.map((question, index) => {
          return <Card key={index} questionProp={question} />;
        })}
      </div>
    </div>
  );
}

export default Cards;
