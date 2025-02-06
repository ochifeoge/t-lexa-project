import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { barData } from "./graphData";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,

  Legend,
  Tooltip,
  Title
);

const BarChart = () => {
  return <Bar data={barData.data} options={barData.options} />;
};

export default BarChart;
