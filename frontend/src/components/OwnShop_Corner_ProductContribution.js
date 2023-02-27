import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const OwnShopCornerProductContribution = ({ filterParams }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/ownshopcornerproductcontribution?startdate=${startDate}&enddate=${endDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [endDate, startDate]);

  if (isLoading) return <p>Loading Own Shop Corner Product Contribution...</p>;
  if (!data?.getOwnShopCornerProductContributionData?.length) return <p>No data available</p>;

  const datas = {
    labels: data.getOwnShopCornerProductContributionData.map(
      (datas) => datas?.sourcetype
    ),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: data.getOwnShopCornerProductContributionData.map(
          (datas) => datas?.ach
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
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
      <DoughnutChart data={datas} width={100} height={50} />
    </div>
  );
};

export default OwnShopCornerProductContribution;
