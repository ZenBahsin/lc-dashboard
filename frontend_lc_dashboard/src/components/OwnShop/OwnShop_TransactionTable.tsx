import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import THeadVertical from "../libs/matrixTables/TheadVertical";
import TBody from "../libs/matrixTables/TBody";
import { OWN_SHOP_TABLE_MATRIX } from "../libs/query";
import CardComponent from "../libs/card";
import { exportPDF } from "../libs/pdfUtils";
import { Box, Table } from "@chakra-ui/react";

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

const OwnShopTransactionTable: React.FC<Props> = ({ filterParams }) => {
  const startDate = filterParams?.startDate || "2022-01-01";
  const endDate = filterParams?.endDate || "2022-12-30";
  const periodic = filterParams?.periodic || "Month";

  const [data, setData] = useState<TableData[] | null>(null);
  const [dataTotal, setDataTotal] = useState<TableData[] | null>(null);

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(OWN_SHOP_TABLE_MATRIX, {
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

    console.log("HASILe", hasil);
    return hasil;
  };

  useEffect(() => {
    if (queryData) {
      setData(processData(queryData.getMatrixTableofOwnShopTransaction));
      setDataTotal(
        processData(queryData.getMatrixTableofTotalOwnShopTransaction)
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
      title={"Own Shop Table Transaction"}
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

export default OwnShopTransactionTable;
