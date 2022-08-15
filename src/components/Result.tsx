import BarGraph from "./Graphs/BarGraph";
import ChartGraph from "./Graphs/ChartGraph";
import Toggle from "./layouts/Toggle";
import Vote from "./forms/Vote";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { getQuestion } from "../lib/firestore";
import type { QuestionType } from "../lib/firestore";

type ToggleContextType = {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
};
type SelectContextType = {
  selectIndex: number | null;
  setSelectIndex: (selectIndex: number | null) => void;
};

export const ToggleContext = createContext<ToggleContextType>({
  toggle: true,
  setToggle: (toggle) => {},
});
export const SelectContext = createContext<SelectContextType>({
  selectIndex: null,
  setSelectIndex: (selectIndex) => {},
});

function Result() {
  const [toggle, setToggle] = useState<boolean>(true);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const toggleValue = { toggle, setToggle }; // context用
  const selectValue = { selectIndex, setSelectIndex }; // context用

  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState<QuestionType>({
    id: "",
    content: "",
    choices: [],
    results: [],
    date: new Date(),
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
  }, [selectIndex]);

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
    <div className="pt-4">
      <div className="flex justify-center sm:float-left sm:ml-10">
        <ToggleContext.Provider value={toggleValue}>
          <Toggle />
        </ToggleContext.Provider>
      </div>
      <div className="mt-6 sm:mt-14 flex justify-center">{graph}</div>
      <SelectContext.Provider value={selectValue}>
        <Vote questionProp={question} />
      </SelectContext.Provider>
    </div>
  );
}

export default Result;
