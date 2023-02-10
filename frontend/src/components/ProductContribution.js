import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const ProductContribution = () => {
  const [data, setData] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/productcontribution?startdate=2022-08-01&enddate=2022-09-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Product Contribution...</p>;
  if (!data) return <p>No pie data</p>;

  const datas = {
    labels: data.getProductContributionData.map((datas) => datas?.product),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: data.getProductContributionData.map(
          (datas) => datas?.revenue_growths
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

export default ProductContribution;
