/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";
import THeadVertical from "./libs/matrixTables/TheadVertical";
import TBody from "./libs/matrixTables/TBody";

const TransactionTable = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startdate = "2022-08-01";
  const enddate = "2022-08-30";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/tablematrixoftransaction?startdate=${startdate}&enddate=${enddate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Table...</p>;
  if (!data) return <p>No profile data</p>;
  console.log(data);

  const hasil = [];

  data.getMatrixTableofTransactionData.forEach((data) => {
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

  console.log(hasil);

  const hasilTOTAL = [];

  data.getMatrixTableofTotalTransactionData.forEach((data) => {
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
    <table>
      <THeadVertical />
      <TBody data={hasil} dataTotal={hasilTOTAL} />
    </table>
  </div>
  );
};

export default TransactionTable;
