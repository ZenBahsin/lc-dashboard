import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const B2BRetailContribution = () => {
  const [data, setdata] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/b2bretailcontribution?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading B2B Channel Contribution...</p>;
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
    labels: data.getB2BRetailContributionData.map((datas) => datas?.sourcetype.trim()),
    datasets: [
      {
        label: "Retail Contribution",
        data: data.getB2BRetailContributionData.map(
          (datas) => datas?.revenue_growths
        ),
        backgroundColor: generateColors(
          data.getB2BRetailContributionData.length
        ),
        borderColor: generateColors(data.getB2BRetailContributionData.length),
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

export default B2BRetailContribution;
