import React from "react";
import { useState, useEffect } from "react";
import numeral from "numeral";
import { exportPDF } from "../libs/pdfUtils";
import { Box, Button, Flex, Table, Td, Tr } from "@chakra-ui/react";
import { PRODUCT_RANKED } from "../libs/query";
import CardComponent from "../libs/card";
import { useQuery } from "@apollo/client";

interface StyleProps {
  table: React.CSSProperties;
  td: React.CSSProperties;
}
interface ProductRankedProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const styles: StyleProps = {
  table: {
    width: "30%",
    borderSpacing: "10px",
    borderCollapse: "separate",
  },
  td: {
    textAlign: "center",
    padding: "8px",
    borderRadius: "25px",
    backgroundColor: "#FFA92E",
    color: "white",
  },
};

const ProductRanked: React.FC<ProductRankedProps> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(PRODUCT_RANKED, {
    variables: {
      startDate: startDate,
      endDate: endDate,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Product Ranked...</p>;
  if (error || !data?.getProductRanked.length) return <p>No data</p>;

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "productranked",
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
      title={"Product Ranked"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box
        id="productranked"
        style={{
          height: "60vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <Table style={styles.table}>
          {data.getProductRanked.map((data: any, index: number) => (
            <Tr key={`key-${index}`}>
              <Td>{data.product}</Td>
              <Td style={styles.td}>
                {(data.revenue_growths &&
                  numeral(data.revenue_growths).format("0,0")) ||
                  0}
              </Td>
            </Tr>
          ))}
        </Table>
      </Box>
    </CardComponent>
  );
};

export default ProductRanked;
