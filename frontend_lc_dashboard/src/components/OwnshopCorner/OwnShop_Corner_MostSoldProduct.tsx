import React from "react";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { exportPDF } from "../libs/pdfUtils";
import ProgressBar from "../libs/progress-bar";
import { OWN_SHOP_CORNER_MOST_SOLD_PRODUCT } from "../libs/query";
import CardComponent from "../libs/card";

interface OwnShopCornerMostSoldProductProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const OwnShopCornerMostSoldProduct: React.FC<
  OwnShopCornerMostSoldProductProps
> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(OWN_SHOP_CORNER_MOST_SOLD_PRODUCT, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Own Shop Corner Most Sodl Product...</p>;
  if (error || !data?.getOwnShopCornerMostSoldProduct.length)
    return <p>No data available</p>;

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "ownshopmostsoldproduct",
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
      title={"Own Shop Corner Most Sold Product"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box id="ownshopmostsoldproduct" padding={4}>
        {data.getOwnShopCornerMostSoldProduct.map(
          (data: {
            sourcetype: React.Key | null | undefined;
            Percentage_of_revenue_growths: number;
            product: any;
          }): any => (
            <ProgressBar
              key={data.sourcetype ?? ""}
              product={data.sourcetype?.toString()}
              percentage={data.Percentage_of_revenue_growths}
            />
          )
        )}
      </Box>
    </CardComponent>
  );
};

export default OwnShopCornerMostSoldProduct;
