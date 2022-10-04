import { useState } from "react";
import Content from "./forms/Content";
import Choices from "./forms/Choices";
import { createQuestion } from "../lib/realtimeDB";
import { useNavigate } from "react-router-dom";

function Create() {
  const [content, setContent] = useState<string>("");
  const [choices, setChoices] = useState<string[]>(["", "", "", "", ""]);
  const navigate = useNavigate();

  // createボタンが押された時
  const handleButton = () => {
    const create = () => {
      createQuestion(content, choiceList, resultNums)
        .then((questionId) => {
          console.log(questionId);
          navigate("/result", { state: { id: questionId } });
        })
        .catch((e) => {
          alert("保存できませんでした");
        });
    };

    // 空欄の要素を削除
    const choiceList = choices.filter((choice) => {
      return choice.replace(/\s+/g, "") !== ""; //スペースのみ対策
    });
    //　選択肢の数だけ投票数0の配列を作る
    const resultNums = [...Array(choiceList.length)].map(() => 0);

    if (resultNums.length !== 0 && content.replace(/\s+/g, "") !== "") {
      create();
    }
  };

  return (
    <div className="py-20 h-screen bg-gray-300 px-2">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full px-4 py-6 ">
            <Content {...{ content: content, setContent: setContent }} />

            <div className="mb-1">
              <span className="text-sm text-gray-400">
                選択肢を追加してください
              </span>
            </div>
            <Choices {...{ choices: choices, setChoices: setChoices }} />

            <div className="mt-3 text-right">
              <button
                onClick={handleButton}
                className="ml-2 h-10 w-32 bg-teal-400 rounded text-white hover:bg-teal-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
