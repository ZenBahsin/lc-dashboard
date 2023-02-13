import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
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

export const GroupBarChart = ({ data, width, height }) => {
  return (
    <Bar
      options={options}
      data={data}
      width={width}
      height={height}
    />
  );
};
