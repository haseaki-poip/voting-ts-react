import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { QuestionType } from "../../lib/firestore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

type Prop = {
  questionProp: QuestionType;
};

function BarGraph(prop: Prop) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = prop.questionProp.choices;
  const data = {
    labels,
    datasets: [
      {
        data: prop.questionProp.results,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="w-full sm:w-2/3 h-4/5">
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarGraph;
