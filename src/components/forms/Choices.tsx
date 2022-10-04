import { ChangeEvent, useState } from "react";

type ChoicesProps = {
  choices: string[];
  setChoices: (choices: string[]) => void;
};

function Choices({ choices, setChoices }: ChoicesProps) {
  const [boxBools, setBoxBools] = useState<Boolean[]>([
    true, //ひとつ目の選択肢は強制で表示
    false,
    false,
    false,
    false,
  ]);

  // 選択肢を増やす
  const handlePlus = () => {
    const falseIndex = boxBools.indexOf(false);
    if (falseIndex >= 0) {
      //インデックスが一致、または元からtureの時はtrueを入れる
      setBoxBools(
        boxBools.map((bool, index) =>
          index === falseIndex || bool ? true : false
        )
      );
    }
  };
  // 選択肢を減らす
  const handleMinus = () => {
    const tureIndex = boxBools.lastIndexOf(true);
    if (tureIndex >= 1) {
      //インデックスが一致、または元からtureの時はtrueを入れる
      setBoxBools(
        boxBools.map((bool, index) =>
          index === tureIndex || !bool ? false : true
        )
      );
      // 選択肢のボックス消去時に値も消去
      setChoices(
        choices.map((choice, index) => (index === tureIndex ? "" : choice))
      );
    }
  };

  const choiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const changeIndex: number = Number(e.target.name);
    const inputValue: string = e.target.value;
    setChoices(
      choices.map((choice, index) =>
        index === changeIndex ? inputValue : choice
      )
    );
  };

  return (
    <div>
      <div className="mb-1">
        {boxBools.map((bool, index) => (
          <div
            className="mb-1"
            key={index}
            style={{ display: bool ? "block" : "none" }}
          >
            <input
              onChange={(e) => choiceChange(e)}
              name={String(index)}
              value={choices[index]}
              type="text"
              className="h-10 px-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-500"
              placeholder={"選択肢" + String(index + 1)}
              autoComplete="off"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <button
          onClick={handlePlus}
          className="ml-2 h-7 w-7 bg-teal-400 rounded text-white hover:bg-teal-500"
        >
          +
        </button>
        <button
          onClick={handleMinus}
          className="ml-2 h-7 w-7 bg-teal-400 rounded text-white hover:bg-teal-500"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default Choices;
