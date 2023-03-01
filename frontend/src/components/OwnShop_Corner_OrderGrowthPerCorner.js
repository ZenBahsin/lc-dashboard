import React from "react";
import { useState, useEffect } from "react";
import { GroupBarChart } from "./libs/bar-group-chart";

const OwnShopCornerOrderGrowthPerCorner = ({ filterParams }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";
  console.log("periodic di oerder growth",periodic);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/revenuegrowthpercorner?startdate=${startDate}&enddate=${endDate}&groupby=${periodic}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [endDate, periodic, startDate]);

  if (isLoading) return <p>Loading Oerder Growth per Corner...</p>;
  if (!data?.getDataRevenueGrowthPerCorner?.length)
    return <p>No data available</p>;

  const getLabels = Array.from(
    new Set(
      data.getDataRevenueGrowthPerCorner.map((datas) =>
        periodic === "Week"
          ? datas?.Minggu
          : periodic === "Month"
          ? datas?.bulan
          : datas?.Hari
      )
    )
  );
  getLabels.sort((a, b) =>
    periodic === "Day" ? new Date(a) - new Date(b) : a - b
  );
  const labels = getLabels.map(String);

  console.log(labels);

  const sourceTypes = [];
  data.getDataRevenueGrowthPerCorner.forEach((datas) => {
    if (!sourceTypes.includes(datas.sourcetype)) {
      sourceTypes.push(datas.sourcetype);
    }
  });

  const datasets = [];
  sourceTypes.forEach((sourcetype) => {
    const filledMonths = data.getDataRevenueGrowthPerCorner
      .filter((datas) => datas.sourcetype === sourcetype)
      .map((datas) =>
        periodic === "Week"
          ? datas?.Minggu
          : periodic === "Month"
          ? datas?.bulan
          : datas?.Hari
      );

    const getDataOrder = data.getDataRevenueGrowthPerCorner
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
      <p data-html2canvas-ignore="true">
        {startDate} - {endDate}
      </p>
      <p data-html2canvas-ignore="true">{periodic}</p>
      <GroupBarChart data={dataChart} width={100} height={50} />
    </div>
  );
};

export default OwnShopCornerOrderGrowthPerCorner;
