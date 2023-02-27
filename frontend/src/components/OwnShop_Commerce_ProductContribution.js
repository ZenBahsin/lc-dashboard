import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const OwnShopCommerceProductContribution = () => {
  const [data, setData] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/ownshopcommerceproductcontribution?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return <p>Loading Own Shop Commerce Product Contribution...</p>;
  if (!data) return <p>No data</p>;

  const datas = {
    labels: data.getOwnShopCommerceProductContributionData.map(
      (datas) => datas?.sourcetype
    ),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: data.getOwnShopCommerceProductContributionData.map(
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

export default OwnShopCommerceProductContribution;
