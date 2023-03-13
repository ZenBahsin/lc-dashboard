import React from "react";
import { useQuery } from "@apollo/client";
import { DoughnutChart } from "../libs/charts/dougnut-chart";
import { OWN_SHOP_CORNER_PRODUCT_CONTRIBUTION } from "../libs/query";
import { Box } from "@chakra-ui/react";
import { exportPDF } from "../libs/pdfUtils";
import CardComponent from "../libs/card";

interface OwnShopCornerProductContributionProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const OwnShopCornerProductContribution: React.FC<
  OwnShopCornerProductContributionProps
> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01";
  const endDate = filterParams?.endDate || "2022-12-30";
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(
    OWN_SHOP_CORNER_PRODUCT_CONTRIBUTION,
    {
      variables: {
        startDate: startDate,
        endDate: endDate,
      },
    }
  );

  // console.log("dataaaaaaaaaaa", data);

  if (loading) return <p>Loading Own Shop Corner Product Contribution...</p>;
  if (error || !data?.getOwnShopCornerProductContribution?.length)
    return <p>No data available</p>;

  const datas = {
    labels: data.getOwnShopCornerProductContribution.map(
      (datas: any) => datas?.sourcetype
    ),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: data.getOwnShopCornerProductContribution.map(
          (datas: any) => datas?.ach
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
        borderWidth: 1,
      },
    ],
  };

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "ownshopcornerproductcontribution",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <CardComponent
      title={"Own Shop Corner Product Contribution"}
      onConfirmHandler={onConfirmHandler}
      data-html2canvas-ignore="true"
    >
      <Box
        id="ownshopcornerproductcontribution"
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

export default OwnShopCornerProductContribution;
