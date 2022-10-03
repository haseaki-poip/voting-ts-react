import { useContext } from "react";
import { SelectContext } from "../Result";
import type { QuestionType } from "../../lib/realtimeDB";
import { voteUpdate } from "../../lib/realtimeDB";

type Prop = {
  questionProp: QuestionType;
};

function Vote(prop: Prop) {
  const choices = prop.questionProp.choices;
  const content = prop.questionProp.content;
  const results = prop.questionProp.results;
  const id = prop.questionProp.id;

  const { selectIndex, setSelectIndex } = useContext(SelectContext);

  // 投票時のボタンクリック処理
  const vote = (index: number) => {
    const update = (i: number | null) => {
      // データベースの投票結果を更新
      voteUpdate(id, resultsCopy)
        .then(() => {
          setSelectIndex(i);
        })
        .catch((e) => {
          alert("投票できませんでした");
        });
    };

    let resultsCopy = [...results];
    // ^^^このようにしてresultsの中身をコピーしないとresultsCopyの中身中身を書き換えれない

    resultsCopy[index] += 1;
    // 一旦選択されたものを1プラスする
    // 投票し直しや、投票取り消し処理の場合は下で行う

    let i: number | null = index;
    if (index === selectIndex) {
      // 前回投票したものと同じものを選択していたら
      // 前回分の投票を無しにするため2を引く
      resultsCopy[selectIndex] -= 2;
      // 何も投票していない状態にするためにnullをセット
      // voteUpdateの中でselectIndexにnullが入れられる
      i = null;
    } else if (selectIndex !== null) {
      // すでに投票していて、他のもに投票し直したら
      // 前回分の投票を無しにするため1を引く
      resultsCopy[selectIndex] -= 1;
    }

    update(i);
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <h2 className="text-gray-800 text-xl lg:text-2xl font-bold text-center mb-4 md:mb-8">
          {content}
        </h2>
        <div className="max-w-lg border-2 border-teal-400 rounded-lg mx-auto">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => vote(index)}
                className={
                  "flex justify-center items-center border-2 border-teal-400  focus-visible:ring text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3 " +
                  (index === selectIndex
                    ? " bg-teal-400 hover:bg-teal-500 active:bg-teal-400 text-white"
                    : " bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800")
                  // ^ ボタン選択時そのボタンの色を変更
                }
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vote;
