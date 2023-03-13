import React from "react";
import { useQuery } from "@apollo/client";
import { DoughnutChart } from "../libs/charts/dougnut-chart";
import { Box } from "@chakra-ui/react";
import { exportPDF } from "../libs/pdfUtils";
import { OWN_SHOP_CORNER_CONTRIBUTION } from "../libs/query";
import CardComponent from "../libs/card";

interface OwnShopCornerContributionProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const OwnShopCornerContribution: React.FC<OwnShopCornerContributionProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(OWN_SHOP_CORNER_CONTRIBUTION, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Own Shop Corner Product Contribution...</p>;
  if (error || !data?.getOwnShopCornerContribution?.length)
    return <p>No data available</p>;

  const generateColors = (n: number) => {
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

  const nColors = data.getOwnShopCornerContribution.length;
  const chartData = {
    labels: data.getOwnShopCornerContribution.map(
      (datas: { sourcetype: string }) => datas?.sourcetype?.trim()
    ),
    datasets: [
      {
        label: "Corner Contribution",
        data: data.getOwnShopCornerContribution.map(
          (datas: { ach: any }) => datas?.ach
        ),
        backgroundColor: generateColors(nColors),
      },
    ],
  };

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "ownshopcornercontribution",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <CardComponent
      title={"Own Shop Corner Contribution"}
      onConfirmHandler={onConfirmHandler}
      data-html2canvas-ignore="true"
    >
      <Box
        id="ownshopcornercontribution"
        style={{
          height: "60vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <DoughnutChart data={chartData} width={100} height={50} />
      </Box>
    </CardComponent>
  );
};

export default OwnShopCornerContribution;
