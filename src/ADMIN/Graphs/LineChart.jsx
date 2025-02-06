import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
  LineElement,
} from "chart.js";
import { lineData } from "./graphData";

Chartjs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  Title
);

const LineChart = () => {
  return <Line data={lineData.data} options={lineData.options} />;
};

export default LineChart;
