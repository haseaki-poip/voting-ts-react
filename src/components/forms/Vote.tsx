import { useContext } from "react";
import { SelectContext } from "../Result";
import type { QuestionType } from "../../lib/firestore";
import { voteUpdate } from "../../lib/firestore";
type Prop = {
  questionProp: QuestionType;
};

function Vote(prop: Prop) {
  const choices = prop.questionProp.choices;
  const results = prop.questionProp.results;
  const id = prop.questionProp.id;
  const { selectIndex, setSelectIndex } = useContext(SelectContext);

  const vote = (index: number) => {
    let resultsCopy = [...results];
    resultsCopy[index] += 1;
    voteUpdate(id, resultsCopy)
      .then(() => {
        setSelectIndex(index);
      })
      .catch((e) => {
        alert("投票できませんでした");
      });
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="max-w-lg border rounded-lg mx-auto">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => vote(index)}
                className={
                  "flex justify-center items-center border  focus-visible:ring text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3 " +
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
