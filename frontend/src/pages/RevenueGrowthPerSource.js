import React from "react";
import { useState, useEffect } from "react";
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

const RevenueGrowthPerSource = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/revenuegrowthpersource?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Revenue Growth per Source...</p>;
  if (!data) return <p>No profile data</p>;

  const getLabels = Array.from(
    new Set(data.getDataRevenueGrowthPerSource.map((datas) => datas?.bulan))
  );
  getLabels.sort((a, b) => a - b);
  const labels = getLabels.map(String);
  //console.log(labels);

  const optionsArea = {
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

  //   const labels = [
  //     "1",
  //     "2",
  //     "3",
  //     "4",
  //     "5",
  //     "6",
  //     "7",
  //     "8",
  //     "9",
  //     "10",
  //     "11",
  //     "12",
  //   ];

  const filledMonths = data.getDataRevenueGrowthPerSource
    .filter((datas) => datas.sourcetype === "b2b")
    .map((datas) => datas.bulan);
  const newfilledMonths = filledMonths.map(String);
  const datasetB2B = labels.map((datas) => {
    const indexOfFilledData = newfilledMonths.indexOf(datas);
    if (indexOfFilledData !== -1)
      return data.getDataRevenueGrowthPerSource[indexOfFilledData]
        .revenue_growths;
    return null;
  });

  const filledMonthsonshop = data.getDataRevenueGrowthPerSource
    .filter((datas) => datas.sourcetype === "ownshop")
    .map((datas) => datas.bulan);
  const newfilledMonthsonshop = filledMonthsonshop.map(String);
  const datasetOnshop = labels.map((datas) => {
    const indexOfFilledData = newfilledMonthsonshop.indexOf(datas);
    if (indexOfFilledData !== -1)
      return data.getDataRevenueGrowthPerSource[indexOfFilledData]
        .revenue_growths;
    return null;
  });

  const dataChart = {
    labels,
    datasets: [
      {
        tension: 0.35,
        fill: true,
        label: "B2B",
        data: datasetB2B,
        borderColor: "#B3B3B3",
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        tension: 0.35,
        fill: true,
        label: "OwnShop",
        data: datasetOnshop,
        borderColor: "#B3B3B3",
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  // console.log(dataChart);

  return (
    <div
      style={{
        height: "60vh",
        position: "relative",
        marginBottom: "1%",
        padding: "1%",
      }}
    >
      <Bar options={optionsArea} data={dataChart} width={100} height={50} />
    </div>
  );
};

export default RevenueGrowthPerSource;
