import BarGraph from "./Graphs/BarGraph";
import ChartGraph from "./Graphs/ChartGraph";
import Toggle from "./layouts/Toggle";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { getQuestion } from "../lib/firestore";

export type QuestionType = {
  content: string;
  choices: string[];
  results: Number[];
};

type ToggleContextType = {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
};

export const ToggleContext = createContext<ToggleContextType>({
  toggle: true,
  setToggle: (toggle) => {},
});

function Result() {
  const [toggle, setToggle] = useState<boolean>(true);
  const toggleValue = { toggle, setToggle }; // context用
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState<QuestionType>({
    content: "",
    choices: [],
    results: [],
  });

  const [graph, setGraph] = useState<JSX.Element>();

  // navigateによる遷移時の引数を取得
  const [idObject] = useState<{ id: string }>(location.state as { id: string });

  //レンダリング時
  useEffect(() => {
    const error = (message: string) => {
      alert(message);
      navigate("/search");
    };

    // idがなければsearchページに遷移
    if (!idObject) {
      error("アンケートを選択してください");
    }

    // idからアンケートを取得
    getQuestion(idObject.id)
      .then((question) => {
        if (!question) {
          error("アンケートが存在しませんでした。");
        } else {
          setQuestion(question);
          setGraph(<BarGraph questionProp={question} />);
        }
      })
      .catch((e) => {
        error("予期せぬエラー");
      });
  }, []);

  useEffect(() => {
    // toggleによってグラフを変更
    setGraph(
      toggle ? (
        <BarGraph questionProp={question} />
      ) : (
        <ChartGraph questionProp={question} />
      )
    );
  }, [toggle]);

  return (
    <div className="pt-10">
      <div className="flex justify-center sm:float-left sm:ml-10">
        <ToggleContext.Provider value={toggleValue}>
          <Toggle />
        </ToggleContext.Provider>
      </div>
      <div className="mt-10 flex justify-center">{graph}</div>
    </div>
  );
}

export default Result;
