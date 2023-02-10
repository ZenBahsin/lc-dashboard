import React from "react";
import { useState, useEffect } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";

const ChannelContribution = () => {
  const [data, setdata] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/channelcontribution?startdate=2022-08-01&enddate=2022-09-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Channel Contribution...</p>;
  if (!data) return <p>No pie data</p>;

  const datas = {
    labels: data.getChannelContributionData.map(
      (datas) => datas?.sourcetype
    ),
    datasets: [
      {
        label: "Channel Contribution",
        data: data.getChannelContributionData.map(
          (datas) => datas?.revenue_growths
        ),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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

export default ChannelContribution;
