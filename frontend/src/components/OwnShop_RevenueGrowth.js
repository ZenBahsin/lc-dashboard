import React from "react";
import { useState, useEffect } from "react";
import { AreaChart } from "./libs/area-chart";

const OwnShopRevenueGrowth = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const groupby = "Month";
  const startdate = "2022-01-01";
  const enddate = "2022-12-30";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/ownshoprevenuegrowth?startdate=${startdate}&enddate=${enddate}&groupby=${groupby}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Own Shop Revenue Growth...</p>;
  if (!data) return <p>No data</p>;

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
    labels: data.getDataOwnShopRevenueGrowth.map((datas) =>
      groupby === "Week"
        ? datas?.Minggu
        : groupby === "Month"
        ? datas?.bulan
        : datas?.hari
    ),
    datasets: [
      {
        fill: false,
        // label: "Dataset 2",
        data: data.getDataOwnShopRevenueGrowth.map((datas) => datas?.revenue_growths),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
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
        <AreaChart
          options={optionsArea}
          data={datatachart}
          width={200}
          height={50}
        />
      </div>
    </>
  );
};

export default OwnShopRevenueGrowth;
