import React from "react";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { exportPDF } from "../libs/pdfUtils";
import ProgressBar from "../libs/progress-bar";
import { B2B_RETAIL_PRODUCT_CONTRIBUTION } from "../libs/query";
import CardComponent from "../libs/card";

interface B2BRetailContributionProductProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const B2BRetailProductContribution: React.FC<
  B2BRetailContributionProductProps
> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(B2B_RETAIL_PRODUCT_CONTRIBUTION, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading B2B Retail Product Contribution...</p>;
  if (error || !data?.getB2BProductContributionRetail.length)
    return <p>No data available</p>;

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "b2bretailproductcontribution",
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
      title={"B2B Retail Product Contribution"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box id="b2bretailproductcontribution" padding={4}>
        {data.getB2BProductContributionRetail.map(
          (data: {
            product: React.Key | null | undefined;
            Percentage_of_revenue_growths: number;
          }): any => (
            <ProgressBar
              key={data.product ?? ""}
              product={data.product?.toString()}
              percentage={data.Percentage_of_revenue_growths}
            />
          )
        )}
      </Box>
    </CardComponent>
  );
};

export default B2BRetailProductContribution;
