import { useState, createContext } from "react";
import Content from "./forms/Content";
import Choices from "./forms/Choices";
import { createQuestion } from "../lib/firestore";
import { useNavigate } from "react-router-dom";

//createContextのための型宣言
type ContentContextType = {
  content: string;
  setContent: (content: string) => void;
};
type ChoicesContextType = {
  choices: string[];
  setChoices: (choices: string[]) => void;
};

export const ContentContext = createContext<ContentContextType>({
  content: "",
  setContent: (content) => {},
});
export const ChoicesContext = createContext<ChoicesContextType>({
  choices: ["", "", "", "", ""],
  setChoices: (choices) => {},
});

function Create() {
  const [content, setContent] = useState<string>("");
  const [choices, setChoices] = useState<string[]>(["", "", "", "", ""]);
  const contentValue = { content, setContent }; // context用
  const choicesValue = { choices, setChoices }; // context用
  const navigate = useNavigate();

  // createボタンが押された時
  const handleButton = () => {
    const create = () => {
      createQuestion(content, choiceList, resultNums)
        .then((questionId) => {
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
    //　選択肢の数だけ0の配列を作る
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
            <ContentContext.Provider value={contentValue}>
              <Content />
            </ContentContext.Provider>

            <div className="mb-1">
              <span className="text-sm text-gray-400">
                選択肢を追加してください
              </span>
            </div>
            <ChoicesContext.Provider value={choicesValue}>
              <Choices />
            </ChoicesContext.Provider>

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
