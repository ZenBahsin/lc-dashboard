import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const optionsOfDoughnut = {
  maintainAspectRatio: false,
  responsive: true,
  segmentStrokeWidth: 5,
  plugins: {
    legend: {
      //   position: 'top' as const,
      display: true,
    },
  },
};

export const DoughnutChart = ({ data, width, height }) => {
  return (
    <Doughnut
      options={optionsOfDoughnut}
      data={data}
      width={width}
      height={height}
    />
  );
};