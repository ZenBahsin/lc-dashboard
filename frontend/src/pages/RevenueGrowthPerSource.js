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
  const groupby = "Week";
  const startdate = "2022-06-01";
  const enddate = "2022-06-20";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/revenuegrowthpersource?startdate=${startdate}&enddate=${enddate}&groupby=${groupby}`
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
    new Set(
      data.getDataRevenueGrowthPerSource.map((datas) =>
        groupby === "Week"
          ? datas?.Minggu
          : groupby === "Month"
          ? datas?.bulan
          : datas?.Hari
      )
    )
  );
  getLabels.sort((a, b) =>
    groupby === "Day" ? new Date(a) - new Date(b) : a - b
  );
  const labels = getLabels.map(String);
  //labels.sort((a, b) => new Date(a) - new Date(b));

  console.log(labels);

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
    .map((datas) =>
      groupby === "Week"
        ? datas?.Minggu
        : groupby === "Month"
        ? datas?.bulan
        : datas?.Hari
    );

  const getDataRevenueB2B = data.getDataRevenueGrowthPerSource
    .filter((datas) => datas.sourcetype === "b2b")
    .map((datas) => datas?.revenue_growths);

  console.log(getDataRevenueB2B);

  const newfilledMonths = filledMonths.map(String);
  const datasetB2B = labels.map((datas) => {
    const indexOfFilledData = newfilledMonths.indexOf(datas);
    if (indexOfFilledData !== -1) return getDataRevenueB2B[indexOfFilledData];
    return null;
  });

  const filledMonthsonshop = data.getDataRevenueGrowthPerSource
    .filter((datas) => datas.sourcetype === "ownshop")
    .map((datas) =>
      groupby === "Week"
        ? datas?.Minggu
        : groupby === "Month"
        ? datas?.bulan
        : datas?.Hari
    );

  // console.log(filledMonthsonshop);

  const getDataRevenueOwnShop = data.getDataRevenueGrowthPerSource
    .filter((datas) => datas.sourcetype === "ownshop")
    .map((datas) => datas?.revenue_growths);

  console.log(getDataRevenueOwnShop);

  const newfilledMonthsonshop = filledMonthsonshop.map(String);
  const datasetOnshop = labels.map((datas) => {
    const indexOfFilledData = newfilledMonthsonshop.indexOf(datas);
    if (indexOfFilledData !== -1)
      return getDataRevenueOwnShop[indexOfFilledData];
    return null;
  });

  console.log(datasetOnshop);

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
      <p>
        {startdate} - {enddate}
      </p>
      <p>{groupby}</p>
      <Bar options={optionsArea} data={dataChart} width={100} height={50} />
    </div>
  );
};

export default RevenueGrowthPerSource;
