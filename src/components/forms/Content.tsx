import { useContext } from "react";
import { ContentContext } from "../Create";

function Content() {
  const { content, setContent } = useContext(ContentContext);

  const contentChange = (inputContent: string) => {
    if (inputContent.length < 30) setContent(inputContent);
  };
  return (
    <div className="mb-1">
      <span className="text-sm">アンケート内容</span>
      <textarea
        typeof="text"
        className="h-20 py-1 px-3 w-full border-2 border-teal-400 rounded focus:outline-none focus:border-teal-500 resize-none"
        value={content}
        onChange={(e) => contentChange(e.target.value)}
        autoComplete="off"
      ></textarea>
    </div>
  );
}

export default Content;
