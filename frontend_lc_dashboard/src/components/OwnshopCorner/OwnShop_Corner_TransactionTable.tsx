import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import THeadVertical from "../libs/matrixTables/TheadVertical";
import TBody from "../libs/matrixTables/TBody";
import { OWN_SHOP_CORNER_TABLE_MATRIX } from "../libs/query";
import CardComponent from "../libs/card";
import { exportPDF } from "../libs/pdfUtils";
import { Box, Table } from "@chakra-ui/react";
import { processData } from "../libs/matrixTables/tableUtils";

interface Props {
  filterParams?: {
    startDate?: string;
    endDate?: string;
    periodic?: string;
  };
}

interface TableData {
  sourcetype: any;
  [key: string]: { ach: number }[];
}

const OwnShopCornerTransactionTable: React.FC<Props> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01";
  const endDate = filterParams?.endDate || "2022-12-30";
  const periodic = filterParams?.periodic || "Month";

  const [data, setData] = useState<TableData[] | null>(null);
  const [dataTotal, setDataTotal] = useState<TableData[] | null>(null);

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(OWN_SHOP_CORNER_TABLE_MATRIX, {
    variables: {
      startDate,
      endDate,
    },
  });

  useEffect(() => {
    if (queryData) {
      setData(processData(queryData.getMatrixTableofOwnShopCornerTransaction));
      setDataTotal(
        processData(queryData.getMatrixTableofTotalOwnShopCornerTransaction)
      );
    }
  }, [queryData]);

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "tableContainer",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <CardComponent
      title={"Table Transaction Corner"}
      onConfirmHandler={onConfirmHandler}
      data-html2canvas-ignore="true"
    >
      <Box id="tableContainer" mx="4" mb="4">
        {error && <p>{error.message}</p>}
        {loading && <p>Loading Table...</p>}
        {data && (
          <Table width={"100%"}>
            <THeadVertical />
            <TBody data={data} dataTotal={dataTotal} />
          </Table>
        )}
      </Box>
    </CardComponent>
  );
};

export default OwnShopCornerTransactionTable;
