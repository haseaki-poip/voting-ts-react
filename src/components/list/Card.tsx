import { useNavigate } from "react-router-dom";
import type { QuestionType } from "../../lib/realtimeDB";

type Props = {
  questionProp: QuestionType;
};

function Card(props: Props) {
  const navigate = useNavigate();

  const id = props.questionProp.id;
  const content = props.questionProp.content;
  const choices = props.questionProp.choices;
  const date = props.questionProp.date;

  // 日にちを00/00/00の形に
  const dateString =
    String(date.getFullYear()) +
    "/" +
    String(date.getMonth() + 1) +
    "/" +
    String(date.getDate());
  const totalVote = props.questionProp.results.reduce((a, b) => a + b);

  const showQuestion = () => {
    navigate("/result", { state: { id: id } });
  };

  return (
    <div
      onClick={showQuestion}
      className="bg-white text-center shadow-2xl rounded-md cursor-pointer w-64 h-72"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{content}</div>
        <ul className="text-gray-700 text-base">
          {choices.map((choice, index) => {
            return <li key={index}>・{choice}</li>;
          })}
        </ul>
      </div>
      <div className="px-6 mb-2">
        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {dateString}
        </span>
        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          投票数{totalVote}
        </span>
      </div>
    </div>
  );
}

export default Card;
