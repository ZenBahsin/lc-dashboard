import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const B2BChannelContribution = () => {
  const [data, setdata] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/b2bchannelcontribution?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading B2B Channel Contribution...</p>;
  if (!data) return <p>No data</p>;

  const datas = {
    labels: data.getB2BChannelContributionData.map(
      (datas) => datas?.sourcetype
    ),
    datasets: [
      {
        label: "Channel Contribution",
        data: data.getB2BChannelContributionData.map(
          (datas) => datas?.revenue_growths
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
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

export default B2BChannelContribution;
