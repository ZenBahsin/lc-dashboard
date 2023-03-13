import React from "react";
import { DoughnutChart } from "../libs/charts/dougnut-chart";
import { exportPDF } from "../libs/pdfUtils";
import { Box } from "@chakra-ui/react";
import { PRODUCT_CONTRIBUTION } from "../libs/query";
import { useQuery } from "@apollo/client";
import CardComponent from "../libs/card";

interface ProductContributionProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const ProductContribution: React.FC<ProductContributionProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(PRODUCT_CONTRIBUTION, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  if (loading) return <p>Loading Product Contribution...</p>;
  if (error || !data?.getProductContribution?.length)
    return <p>No data available</p>;

  const datas = {
    labels: data.getProductContribution.map(
      (datas: { product: any }) => datas?.product ?? ""
    ),
    datasets: [
      {
        spacing: 25,
        label: "Product Contribution",
        data: data.getProductContribution.map(
          (datas: { revenue_growths: any }) => datas?.revenue_growths ?? 0
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
      elementId: "productcontribution",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };
  return (
    <CardComponent
      title={"Product Contribution"}
      onConfirmHandler={onConfirmHandler}
      data-html2canvas-ignore="true"
    >
      <Box
        id="productcontribution"
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

export default ProductContribution;
