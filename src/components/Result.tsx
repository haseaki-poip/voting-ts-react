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
  const navigate = useNavigate();
  const location = useLocation();

  // navigateによる遷移時の引数を取得
  const [idObj] = useState<{ id: string | null }>(
    location.state as { id: string | null }
  );
  const [toggle, setToggle] = useState<boolean>(true);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [graph, setGraph] = useState<JSX.Element>();
  const [vote, setVote] = useState<JSX.Element>();

  const toggleValue = { toggle, setToggle }; // context用
  const selectValue = { selectIndex, setSelectIndex }; // context用

  // エラー時の遷移処理
  const error = () => {
    navigate("/search");
  };

  //初期レンダリングとrealtimeDB発火時でのUI更新
  const upDateResult = (idObject: { id: string | null }) => {
    // idがなければsearchページに遷移
    if (!idObject.id) {
      error();
    } else {
      const id = idObject.id;

      getQuestion(id) // idからアンケートを取得
        .then((question) => {
          if (!question) {
            error();
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
          error();
        });
    }
  };

  //レンダリング時
  useEffect(() => {
    if (!idObj) {
      error();
    } else {
      const starCountRef = ref(
        rt_db,
        "questionnaires/" + idObj.id + "/results"
      );
      // データ更新時にリアルタイムで発火
      onValue(starCountRef, (snapshot) => {
        upDateResult(idObj);
      });

      upDateResult(idObj);
    }
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
