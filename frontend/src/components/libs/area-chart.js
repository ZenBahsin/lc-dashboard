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
export const optionsArea = {
  responsive: true,
  plugins: {
    legend: {
      //   position: 'top' as const,
      display: false,
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
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

export const AreaChart = ({ data, width, height }) => {
  return (
    <Line options={optionsArea} data={data} width={width} height={height} />
  );
};
