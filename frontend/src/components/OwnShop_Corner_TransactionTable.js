import React from "react";
import { useState, useEffect } from "react";
import THeadVertical from "./libs/matrixTables/TheadVertical";
import TBody from "./libs/matrixTables/TBody";

const OwnShopCornerTransactionTable = ({ filterParams }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/tablematrixofownshopcornertransaction?startdate=${startDate}&enddate=${endDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [endDate, startDate]);

  if (isLoading) return <p>Loading Table...</p>;
  if (!data?.getMatrixTableofOwnShopCornerTransactionData?.length) return <p>No data available</p>;

  const hasil = [];

  data.getMatrixTableofOwnShopCornerTransactionData.forEach((data) => {
    const index = hasil.findIndex(
      (hasilData) => hasilData.sourcetype === data.sourcetype
    );
    if (index === -1) {
      hasil.push({
        sourcetype: data.sourcetype,
        [data.product.trim()]: [{ ach: Number(data.ach) }],
      });
    } else {
      hasil[index][data.product.trim()] = [{ ach: Number(data.ach) }];
    }
  });

  const hasilTOTAL = [];

  data.getMatrixTableofOwnShopCornerTotalTransactionData.forEach((data) => {
    const index = hasilTOTAL.findIndex(
      (hasilData) => hasilData.sourcetype === data.sourcetype
    );
    if (index === -1) {
      hasilTOTAL.push({
        sourcetype: data.sourcetype,
        [data.product.trim()]: [{ ach: Number(data.ach) }],
      });
    } else {
      hasilTOTAL[index][data.product.trim()] = [{ ach: Number(data.ach) }];
    }
  });

  return (
    <div id="tableContainer">
      <table width={"100%"}>
        <THeadVertical />
        <TBody data={hasil} dataTotal={hasilTOTAL} />
      </table>
    </div>
  );
};

export default OwnShopCornerTransactionTable;
