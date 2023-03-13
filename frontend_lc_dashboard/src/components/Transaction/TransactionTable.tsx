import React, { useState, useEffect } from "react";
import THeadVertical from "../libs/matrixTables/TheadVertical";
import TBody from "../libs/matrixTables/TBody";
import { exportPDF } from "../libs/pdfUtils";
import { Box, Table } from "@chakra-ui/react";
import { TRANSACTION_TABLE_MATRIX } from "../libs/query";
import { useQuery } from "@apollo/client";
import CardComponent from "../libs/card";

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
const TransactionTable: React.FC<Props> = ({ filterParams }) => {
  const [data, setData] = useState<TableData[] | null>(null);
  const [dataTotal, setDataTotal] = useState<TableData[] | null>(null);

  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(TRANSACTION_TABLE_MATRIX, {
    variables: {
      startDate,
      endDate,
    },
  });

  const processData = (data: any) => {
    const hasil: TableData[] = [];

    data.forEach((tableData: any) => {
      const sourcetype = tableData.sourcetype;
      const product = tableData.product?.trim();
      const ach = Number(tableData.ach);

      const index = hasil.findIndex(
        (hasilData) => hasilData.sourcetype === sourcetype
      );

      if (index === -1) {
        hasil.push({
          sourcetype,
          ...(product && { [product]: [{ ach }] }),
        });
      } else {
        hasil[index][product] = [{ ach }];
      }
    });

    console.log("HASILL", hasil);
    return hasil;
  };
  useEffect(() => {
    if (queryData) {
      setData(processData(queryData.getMatrixTableofTransaction));
      setDataTotal(processData(queryData.getMatrixTableofTotalTransaction));
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

export default TransactionTable;
