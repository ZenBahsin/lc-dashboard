import React from "react";
import { AreaChart } from "../libs/charts/area-chart";
import { exportPDF } from "../libs/pdfUtils";
import { REVENUE_GROWTH } from "../libs/query";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import CardComponent from "../libs/card";

interface RevenueGrowthProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const RevenueGrowth: React.FC<RevenueGrowthProps> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(REVENUE_GROWTH, {
    variables: {
      startDate: startDate,
      endDate: endDate,
      groupby: periodic,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Revenue Growth...</p>;
  if (error || !data?.getRevenueGrowth?.length) return <p>No data available</p>;

  const datatachart = {
    labels: data.getRevenueGrowth
      .map((datas: { periode: any }) => datas?.periode)
      .filter((label: undefined) => label !== undefined) as string[],
    datasets: [
      {
        fill: false,
        data: data.getRevenueGrowth
          .map((datas: { revenue_growths: any }) => datas?.revenue_growths)
          .filter((data: undefined) => data !== undefined) as number[],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "revenuegrowth",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <CardComponent
      data-html2canvas-ignore="true"
      title={"Revenue Growth"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box
        id="revenuegrowth"
        style={{
          height: "60vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <AreaChart data={datatachart} width={200} height={50} />
      </Box>
    </CardComponent>
  );
};

export default RevenueGrowth;
