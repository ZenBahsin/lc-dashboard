import React from "react";
import { useQuery } from "@apollo/client";
import { DoughnutChart } from "../libs/charts/dougnut-chart";
import { Box } from "@chakra-ui/react";
import { exportPDF } from "../libs/pdfUtils";
import { OWN_SHOP_CHANNEL_CONTRIBUTION } from "../libs/query";
import CardComponent from "../libs/card";

interface OwnShopChannelContributionProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const OwnShopChannelContribution: React.FC<OwnShopChannelContributionProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(OWN_SHOP_CHANNEL_CONTRIBUTION, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Own Shop Corner Product Contribution...</p>;
  if (error || !data?.getOwnShopChannelContribution?.length)
    return <p>No data available</p>;

  const chartData = {
    labels: data.getOwnShopChannelContribution.map(
      (datas: { sourcetype: any }) => datas?.sourcetype
    ),
    datasets: [
      {
        label: "Channel Contribution",
        data: data.getOwnShopChannelContribution.map(
          (datas: { revenue_growths: any }) => datas?.revenue_growths
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

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "ownshopchannelcontribution",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <CardComponent
      title={"Own Shop Channel Contribution"}
      onConfirmHandler={onConfirmHandler}
      data-html2canvas-ignore="true"
    >
      <Box
        id="ownshopchannelcontribution"
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

export default OwnShopChannelContribution;
