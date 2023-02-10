/* eslint-disable eqeqeq */
import React from "react";
import { useState, useEffect } from "react";
import numeral from "numeral";

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

  if (isLoading) return <p>Loading Tablesssssssssssssssss...</p>;
  if (!data) return <p>No profile data</p>;
  console.log(data);

  const tableHeadData = [
    {
      name: "Workshop",
      subhead: [{ ach: "Ach" }, { target: "Target" }, { persen: "%" }],
    },
    {
      name: "Apps",
      subhead: [{ ach: "Ach" }, { target: "Target" }, { persen: "%" }],
    },
    {
      name: "LIGHTtools",
      subhead: [{ ach: "Ach" }, { target: "Target" }, { persen: "%" }],
    },
    {
      name: "LIGHTmeals",
      subhead: [{ ach: "Ach" }, { target: "Target" }, { persen: "%" }],
    },
    {
      name: "Paket",
      subhead: [{ ach: "Ach" }, { target: "Target" }, { persen: "%" }],
    },
    {
      name: "Total",
      subhead: [{ ach: "Ach" }, { target: "Target" }, { persen: "%" }],
    },
  ];

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

  const TBody = (props) => {
    const { data, dataTotal } = props;
    return (
      <tbody>
        {data.map((datakiri, index) => (
          <tr>
            <th className="green" key={`key-${index}`} colSpan={3}>
              {datakiri.sourcetype}
            </th>
            <td className="soft-green" key={`key-${index}`}>
              {(datakiri.WORKSHOP &&
                numeral(datakiri.WORKSHOP[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="soft-green" key={`key-${index}`}></td>
            <td className="soft-green" key={`key-${index}`}></td>

            <td className="soft-grey" key={`key-${index}`}>
              {(datakiri.APPS && numeral(datakiri.APPS[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="soft-grey" key={`key-${index}`}></td>
            <td className="soft-grey" key={`key-${index}`}></td>

            <td className="soft-green" key={`key-${index}`}>
              {(datakiri.LIGHTTOOLS &&
                numeral(datakiri.LIGHTTOOLS[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="soft-green" key={`key-${index}`}></td>
            <td className="soft-green" key={`key-${index}`}></td>

            <td className="soft-grey" key={`key-${index}`}>
              {(datakiri.LIGHTMEAL &&
                numeral(datakiri.LIGHTMEAL[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="soft-grey" key={`key-${index}`}></td>
            <td className="soft-grey" key={`key-${index}`}></td>

            <td className="soft-green" key={`key-${index}`}>
              {(datakiri.PAKET &&
                numeral(datakiri.PAKET[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="soft-green" key={`key-${index}`}></td>
            <td className="soft-green" key={`key-${index}`}></td>

            <td className="soft-grey" key={`key-${index}`}>
              {numeral(
                (datakiri.WORKSHOP ? datakiri.WORKSHOP[0].ach : 0) +
                  (datakiri.APPS ? datakiri.APPS[0].ach : 0) +
                  (datakiri.LIGHTTOOLS ? datakiri.LIGHTTOOLS[0].ach : 0) +
                  (datakiri.LIGHTMEAL ? datakiri.LIGHTMEAL[0].ach : 0) +
                  (datakiri.PAKET ? datakiri.PAKET[0].ach : 0)
              ).format("0,0")}
            </td>
            <td className="soft-grey" key={`key-${index}`}></td>
            <td className="soft-grey" key={`key-${index}`}></td>
          </tr>
        ))}

        {dataTotal.map((data, index) => (
          <tr>
            <th className="grey" key={`key-${index}`} colSpan={3}>
              {data.sourcetype}
            </th>
            <td className="green" key={`key-${index}`}>
              {(data.WORKSHOP && numeral(data.WORKSHOP[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="green" key={`key-${index}`}></td>
            <td className="green" key={`key-${index}`}></td>

            <td className="grey" key={`key-${index}`}>
              {(data.APPS && numeral(data.APPS[0].ach)).format("0,0") || 0}
            </td>
            <td className="grey" key={`key-${index}`}></td>
            <td className="grey" key={`key-${index}`}></td>

            <td className="green" key={`key-${index}`}>
              {(data.LIGHTTOOLS &&
                numeral(data.LIGHTTOOLS[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="green" key={`key-${index}`}></td>
            <td className="green" key={`key-${index}`}></td>

            <td className="grey" key={`key-${index}`}>
              {(data.LIGHTMEAL &&
                numeral(data.LIGHTMEAL[0].ach).format("0,0")) ||
                0}
            </td>
            <td className="grey" key={`key-${index}`}></td>
            <td className="grey" key={`key-${index}`}></td>

            <td className="green" key={`key-${index}`}>
              {(data.PAKET && numeral(data.PAKET[0].ach).format("0,0")) || 0}
            </td>
            <td className="green" key={`key-${index}`}></td>
            <td className="green" key={`key-${index}`}></td>

            <td className="grey" key={`key-${index}`}>
              {numeral(
                (data.WORKSHOP ? data.WORKSHOP[0].ach : 0) +
                  (data.APPS ? data.APPS[0].ach : 0) +
                  (data.LIGHTTOOLS ? data.LIGHTTOOLS[0].ach : 0) +
                  (data.LIGHTMEAL ? data.LIGHTMEAL[0].ach : 0) +
                  (data.PAKET ? data.PAKET[0].ach : 0)
              ).format("0,0")}
            </td>
            <td className="grey" key={`key-${index}`}></td>
            <td className="grey" key={`key-${index}`}></td>
          </tr>
        ))}
      </tbody>
    );
  };
  const THeadVertical = (props) => {
    const { data } = props;
    //console.log(data[0].subhead[0].ach);
    return (
      <thead>
        <tr>
          <th colSpan={3}></th>
          {data.map((data, index) => (
            <th
              className={index % 2 ? "grey" : "green"}
              key={`key-${index}`}
              colSpan={3}
            >
              {data.name}
            </th>
          ))}
        </tr>
        <tr>
          <th colSpan={3}></th>
          {data.map((datas, indexs) => (
            <>
              <th
                className={indexs % 2 ? "soft-grey" : "soft-green"}
                key={`key-${indexs}`}
              >
                {datas?.subhead[0].ach}
              </th>
              <th
                className={indexs % 2 ? "soft-grey" : "soft-green"}
                key={`key-${indexs}`}
              >
                {datas?.subhead[1].target}
              </th>
              <th
                className={indexs % 2 ? "soft-grey" : "soft-green"}
                key={`key-${indexs}`}
              >
                {datas?.subhead[2].persen}
              </th>
            </>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <table style={{ width: "100%" }} id="mytable">
      <THeadVertical data={tableHeadData} />
      <TBody data={hasil} dataTotal={hasilTOTAL} />
    </table>
  );
};

export default TransactionTable;
