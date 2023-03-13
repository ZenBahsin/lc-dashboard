import React from "react";
import { DoughnutChart } from "../libs/charts/dougnut-chart";
import { exportPDF } from "../libs/pdfUtils";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { B2B_CHANNEL_CONTRIBUTION } from "../libs/query";
import CardComponent from "../libs/card";

interface ContributionProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const B2BChannelContribution: React.FC<ContributionProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(B2B_CHANNEL_CONTRIBUTION, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading B2B Channel Contribution...</p>;
  if (error || !data?.getB2BChannelContribution?.length)
    return <p>No data available</p>;

  const datas = {
    labels: data.getB2BChannelContribution.map(
      (datas: { sourcetype: any }) => datas?.sourcetype ?? ""
    ),
    datasets: [
      {
        label: "B2B Channel Contribution",
        data: data.getB2BChannelContribution.map(
          (datas: { revenue_growths: any }) => datas?.revenue_growths ?? 0
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
      elementId: "channelcontribution",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };
  return (
    <CardComponent
      title={"B2B Channel Contribution"}
      onConfirmHandler={onConfirmHandler}
      data-html2canvas-ignore="true"
    >
      <Box
        style={{
          height: "60vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <DoughnutChart data={datas} width={100} height={50} />
      </Box>
    </CardComponent>
  );
};
export default B2BChannelContribution;
