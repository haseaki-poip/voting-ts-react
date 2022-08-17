import BarGraph from "./Graphs/BarGraph";
import ChartGraph from "./Graphs/ChartGraph";
import Toggle from "./layouts/Toggle";
import Vote from "./forms/Vote";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { getQuestion } from "../lib/realtimeDB";
import { rt_db } from "../firebase";
import { ref, onValue } from "firebase/database";

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

  const [graph, setGraph] = useState<JSX.Element>();
  const [vote, setVote] = useState<JSX.Element>();

  // navigateによる遷移時の引数を取得
  const [idObj] = useState<{ id: string | null }>(
    location.state as { id: string | null }
  );

  const error = (message: string) => {
    alert(message);
    navigate("/search");
  };

  //初期レンダリングとrealtimeDB発火時でのUI更新
  const upDateResult = (idObject: { id: string | null }) => {
    // idがなければsearchページに遷移
    if (idObject.id === null) {
      error("アンケートを選択してください");
    } else {
      const id = idObject.id;

      getQuestion(id) // idからアンケートを取得
        .then((question) => {
          if (!question) {
            error("アンケートが存在しませんでした。");
          } else {
            const questionValue = {
              id: id,
              content: question.content,
              choices: question.choices,
              results: question.results,
              date: question.date,
            };
            setVote(<Vote questionProp={questionValue} />);
            setGraph(
              toggle ? (
                <BarGraph questionProp={questionValue} />
              ) : (
                <ChartGraph questionProp={questionValue} />
              )
            );
          }
        })
        .catch((e) => {
          error("予期せぬエラー");
        });
    }
  };

  //レンダリング時
  useEffect(() => {
    const starCountRef = ref(rt_db, "questionnaires/" + idObj.id + "/results");
    // データ更新時にリアルタイムで発火
    onValue(starCountRef, (snapshot) => {
      upDateResult(idObj);
    });

    upDateResult(idObj);
  }, [selectIndex, toggle]);

  return (
    <div className="pt-4">
      <div className="flex justify-center sm:float-left sm:ml-10">
        <ToggleContext.Provider value={toggleValue}>
          <Toggle />
        </ToggleContext.Provider>
      </div>
      <div className="mt-6 sm:mt-14 flex justify-center">{graph}</div>
      <SelectContext.Provider value={selectValue}>
        {vote}
      </SelectContext.Provider>
    </div>
  );
}

export default Result;
