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
  ChartData
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

interface DoughnutChartProps {
  data: ChartData<"doughnut", number[], string>;
  width: number;
  height: number;
}

const optionsOfDoughnut: any = {
  maintainAspectRatio: false,
  responsive: true,
  segmentStrokeWidth: 5,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        fontSize: 14,
        fontColor: "black",
      },
    },
  },
};

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  width,
  height,
}) => {
  return (
    <Doughnut
      options={optionsOfDoughnut}
      data={data}
      width={width}
      height={height}
    />
  );
};
