import React from "react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
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
  ArcElement,
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
  Legend,
  ArcElement
);

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const groupby = "Day";
  const startdate = "2022-09-15";
  const enddate = "2022-09-30";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/revenuegrowth?startdate=${startdate}&enddate=${enddate}&groupby=${groupby}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Revenue Growth...</p>;
  if (!data) return <p>No profile data</p>;

  const optionsArea = {
    responsive: true,
    maintainAspectRatio: false,
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

  const datatachart = {
    labels: data.getDataRevenueGrowth.map((datas) =>
      groupby === "Week" ? (
        datas?.Minggu
      ) : groupby === "Month" ? (
        datas?.bulan
      ) : (
        datas?.hari
      )
    ),
    datasets: [
      {
        fill: false,
        // label: "Dataset 2",
        data: data.getDataRevenueGrowth.map((datas) => datas?.revenue_growths),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div
      style={{
        height: "60vh",
        position: "relative",
        marginBottom: "1%",
        padding: "1%",
      }}
    >
      <p>
        {startdate} - {enddate}
      </p>
      <p>{groupby}</p>
      <Line options={optionsArea} data={datatachart} width={100} height={50} />
    </div>
  );
};

export default Home;
