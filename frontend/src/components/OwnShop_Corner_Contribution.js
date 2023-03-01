import React, { useState, useEffect, useRef } from "react";
import { DoughnutChart } from "./libs/dougnut-chart";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button } from "@chakra-ui/react";
import { exportPDF } from "../components/libs/pdfUtils";

const OwnShopCornerContribution = ({ filterParams }) => {
  const chartRef = useRef();
  const handle = useFullScreenHandle();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  useEffect(() => {
    if (startDate && endDate) {
      setLoading(true);
      fetch(
        `http://localhost:8000/api/ownshopcornercontribution?startdate=${startDate}&enddate=${endDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [startDate, endDate]);

  if (isLoading) return <p>Loading Own Shop Corner Contribution...</p>;
  if (!data?.getOwnShopCornerContributionData?.length)
    return <p>No data available</p>;

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

  const nColors = data.getOwnShopCornerContributionData.length;
  const chartData = {
    labels: data.getOwnShopCornerContributionData.map((datas) =>
      datas?.sourcetype?.trim()
    ),
    datasets: [
      {
        label: "Corner Contribution",
        data: data.getOwnShopCornerContributionData.map((datas) => datas?.ach),
        backgroundColor: generateColors(nColors),
      },
    ],
  };

  return (
    <>
      <button data-html2canvas-ignore="true" onClick={handle.enter}>
        Enter fullscreen
      </button>
      <FullScreen handle={handle}>
        <Button
          data-html2canvas-ignore="true"
          onClick={() =>
            exportPDF({
              elementId: "ownshopcornercontribution",
              startDate,
              periodic,
              endDate,
            })
          }
          className="print-button"
          colorScheme={"facebook"}
        >
          Print
        </Button>

        <div
          id="ownshopcornercontribution"
          style={{
            height: "60vh",
            position: "relative",
            marginBottom: "1%",
            padding: "1%",
          }}
          ref={chartRef}
        >
          {/* <p>
            {startDate} - {endDate}
          </p> */}

          <DoughnutChart data={chartData} width={100} height={50} />
        </div>
      </FullScreen>
      <style>
        {`@media print {
          /* tampilkan logo di pojok kiri atas */
          .logo {
            position: fixed;
            top: 0;
            left: 0;
            width: 100px;
            height: 100px;
            content: url(lightWeight2.png);
          }
          
        }`}
      </style>
    </>
  );
};

export default OwnShopCornerContribution;
