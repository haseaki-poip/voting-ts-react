import { useEffect, useState } from "react";
import type { QuestionType } from "../../lib/realtimeDB";
import { getAllQuestion } from "../../lib/realtimeDB";
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 place-items-center justify-items-center gap-5 md:px-20 px-5 py-10">
        {allQuestion.map((question, index) => {
          return <Card key={index} questionProp={question} />;
        })}
      </div>
    </div>
  );
}

export default Cards;
