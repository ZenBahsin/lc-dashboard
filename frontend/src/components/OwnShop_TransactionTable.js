/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";
import THeadVertical from "./libs/matrixTables/TheadVertical";
import TBody from "./libs/matrixTables/TBody";

const OwnShopTransactionTable = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startdate = "2022-01-01";
  const enddate = "2022-12-30";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/tablematrixofownshoptransaction?startdate=${startdate}&enddate=${enddate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Table...</p>;
  if (!data) return <p>No data</p>;
  // console.log(data);

  const hasil = [];

  data.getMatrixTableofOwnShopTransactionData.forEach((data) => {
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

  data.getMatrixTableofOwnShopTotalTransactionData.forEach((data) => {
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

export default OwnShopTransactionTable;