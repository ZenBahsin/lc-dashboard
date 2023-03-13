import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartData
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface AreaChartProps {
  data: ChartData<'line', number[], string>;
  width: number;
  height: number;
}

export const optionsArea = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        borderColor: "#E2E8F0",
        drawBorder: true,
        color: "#EDF2F7",
      },
    },
    y: {
      grid: {
        borderColor: "#E2E8F0",
        drawBorder: true,
        color: "#EDF2F7",
      },
    },
  },
};

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  width,
  height,
}) => {
  return (
    <Line options={optionsArea} data={data} width={width} height={height} />
  );
};
