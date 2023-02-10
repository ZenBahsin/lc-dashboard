import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const B2BProductContribution = () => {
  const [data, setData] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/b2bproductcontribution?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading B2B Product Contribution...</p>;
  if (!data) return <p>No pie data</p>;

  const datas = {
    labels: data.getB2BProductContributionData.map((datas) => datas?.product),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: data.getB2BProductContributionData.map(
          (datas) => datas?.revenue_growth
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
        borderWidth: 1
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
      <DoughnutChart
        data={datas}
        width={100}
        height={50}
      />
    </div>
  );
};

export default B2BProductContribution;
