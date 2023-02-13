import React from "react";
import { useState, useEffect } from "react";
import THeadVertical from "./libs/matrixTables/TheadVertical";
import TBody from "./libs/matrixTables/TBody";

const B2BCorpTransactionTable = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startdate = "2022-01-01";
  const enddate = "2022-12-30";
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/tablematrixofb2bretailtransaction?startdate=${startdate}&enddate=${enddate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Table...</p>;
  if (!data) return <p>No data</p>;

  const hasil = [];

  data.getMatrixTableofB2BRetailTransactionData.forEach((data) => {
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

  data.getMatrixTableofB2BRetailTotalTransactionData.forEach((data) => {
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
    <table style={{ width: "100%" }} id="mytable">
      <THeadVertical />
      <TBody data={hasil} dataTotal={hasilTOTAL} />
    </table>
  );
};

export default B2BCorpTransactionTable;
