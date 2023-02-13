import React from "react";
import { useState, useEffect } from "react";
import { GroupBarChart } from "./libs/bar-group-chart";

const B2BOrderGrowthPerRetail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const groupby = "Month";
  const startdate = "2022-01-01";
  const enddate = "2022-12-30";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/ordergrowthperretail?startdate=${startdate}&enddate=${enddate}&groupby=${groupby}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Oerder Growth per Retail...</p>;
  if (!data) return <p>No data</p>;

  const getLabels = Array.from(
    new Set(
      data.getDataOrderGrowthPerRetail.map((datas) =>
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

  console.log(labels);

  const sourceTypes = [];
  data.getDataOrderGrowthPerRetail.forEach((datas) => {
    if (!sourceTypes.includes(datas.sourcetype)) {
      sourceTypes.push(datas.sourcetype);
    }
  });

  const datasets = [];
  sourceTypes.forEach((sourcetype) => {
    const filledMonths = data.getDataOrderGrowthPerRetail
      .filter((datas) => datas.sourcetype === sourcetype)
      .map((datas) =>
        groupby === "Week"
          ? datas?.Minggu
          : groupby === "Month"
          ? datas?.bulan
          : datas?.Hari
      );

    const getDataOrder = data.getDataOrderGrowthPerRetail
      .filter((datas) => datas.sourcetype === sourcetype)
      .map((datas) => datas?.revenue_growths);

    const newfilledMonths = filledMonths.map(String);
    const dataset = labels.map((datas) => {
      const indexOfFilledData = newfilledMonths.indexOf(datas);
      if (indexOfFilledData !== -1) return getDataOrder[indexOfFilledData];
      return null;
    });

    datasets.push({
      tension: 0.35,
      fill: true,
      label: sourcetype.trim(),
      data: dataset,
      borderColor: "#B3B3B3",
      borderWidth: 2,
      pointRadius: 0,
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
    });
  });

  const dataChart = {
    labels,
    datasets,
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
      <p>
        {startdate} - {enddate}
      </p>
      <p>{groupby}</p>
      <GroupBarChart data={dataChart} width={100} height={50} />
    </div>
  );
};

export default B2BOrderGrowthPerRetail;
