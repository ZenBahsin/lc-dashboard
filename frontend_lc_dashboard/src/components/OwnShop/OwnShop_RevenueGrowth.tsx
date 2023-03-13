import React from "react";
import { AreaChart } from "../libs/charts/area-chart";
import { exportPDF } from "../libs/pdfUtils";
import { OWN_SHOP_REVENUE_GROWTH } from "../libs/query";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import CardComponent from "../libs/card";

interface OwnShopRevenueGrowthProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const OwnShopRevenueGrowth: React.FC<OwnShopRevenueGrowthProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(OWN_SHOP_REVENUE_GROWTH, {
    variables: {
      startDate: startDate,
      endDate: endDate,
      groupby: periodic,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Own Shop Revenue Growth...</p>;
  if (error || !data?.getOwnShopRevenueGrowth?.length)
    return <p>No data available</p>;


  const datatachart = {
    labels: data.getOwnShopRevenueGrowth.map(
      (datas: { periode: any }) => datas?.periode
    ),
    datasets: [
      {
        fill: false,
        // label: "Dataset 2",
        data: data.getOwnShopRevenueGrowth.map(
          (datas: { revenue_growths: any }) => datas?.revenue_growths
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "ownshoprevenuegrowth",
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
      title={"Own Shop Revenue Growth"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box
        id="ownshoprevenuegrowth"
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

export default OwnShopRevenueGrowth;
