import { ChangeEvent, useContext } from "react";
import { ContentContext } from "../Create";

function Content() {
  const { content, setContent } = useContext(ContentContext);

  const contentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  return (
    <div className="mb-1">
      <span className="text-sm">アンケート内容</span>
      <textarea
        typeof="text"
        className="h-20 py-1 px-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-500 resize-none"
        onChange={(e) => contentChange(e)}
        autoComplete="off"
      ></textarea>
    </div>
  );
}

export default Content;
