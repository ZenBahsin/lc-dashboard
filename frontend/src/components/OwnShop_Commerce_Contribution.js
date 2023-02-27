import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const OwnShopCommerceContribution = () => {
  const [data, setdata] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/ownshopcommercecontribution?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Own Shop Commerce Contribution...</p>;
  if (!data) return <p>No data</p>;

  const generateColors = (n) => {
    const colorPalette = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];

    let colorArray = [];
    for (let i = 0; i < n; i++) {
      colorArray.push(colorPalette[i % colorPalette.length]);
    }

    return colorArray;
  };

  const datas = {
    labels: data.getOwnShopCommerceContributionData.map((datas) => datas?.sourcetype.trim()),
    datasets: [
      {
        label: "Commmerce Contribution",
        data: data.getOwnShopCommerceContributionData.map(
          (datas) => datas?.ach
        ),
        backgroundColor: generateColors(
          data.getOwnShopCommerceContributionData.length
        ),
        borderColor: generateColors(data.getOwnShopCommerceContributionData.length),
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

export default OwnShopCommerceContribution;
