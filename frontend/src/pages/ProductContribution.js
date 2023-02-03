import React from "react";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

const ProductContribution = () => {
  const [datapie, setDatapie] = useState(null);

  const [isLoadingpie, setLoadingpie] = useState(false);

  useEffect(() => {
    setLoadingpie(true);
    fetch(
      "http://localhost:8000/api/productcontribution?startdate=2022-08-01&enddate=2022-09-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setDatapie(data);
        setLoadingpie(false);
      });
  }, []);

  if (isLoadingpie) return <p>Loading Product Contribution...</p>;
  if (!datapie) return <p>No pie data</p>;

  const datapies = {
    labels: datapie.getProductContributionData.map((datas) => datas?.product),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: datapie.getProductContributionData.map(
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
      <Doughnut
        data={datapies}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
      ;
    </div>
  );
};

export default ProductContribution;