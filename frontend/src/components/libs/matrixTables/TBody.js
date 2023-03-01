import numeral from "numeral";
const TBody = (props) => {
  const { data, dataTotal } = props;
  return (
    <tbody>
      {data.map((datakiri, index) => (
        <tr key={`row-${index}`}>
          <th className="green" key={`kiri-${index}`}  colSpan={1}>
            {datakiri.sourcetype}
          </th>
          <td className="soft-green" key={`workshop-${index}`}>
            {(datakiri.WORKSHOP &&
              numeral(datakiri.WORKSHOP[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="soft-grey" key={`apps-${index}`}>
            {(datakiri.APPS && numeral(datakiri.APPS[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="soft-green" key={`lightools-${index}`}>
            {(datakiri.LIGHTTOOLS &&
              numeral(datakiri.LIGHTTOOLS[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="soft-grey" key={`lightmeal-${index}`}>
            {(datakiri.LIGHTMEAL &&
              numeral(datakiri.LIGHTMEAL[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="soft-green" key={`paket-${index}`}>
            {(datakiri.PAKET && numeral(datakiri.PAKET[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="soft-grey" key={`total-kiri-${index}`}>
            {numeral(
              (datakiri.WORKSHOP ? datakiri.WORKSHOP[0].ach : 0) +
                (datakiri.APPS ? datakiri.APPS[0].ach : 0) +
                (datakiri.LIGHTTOOLS ? datakiri.LIGHTTOOLS[0].ach : 0) +
                (datakiri.LIGHTMEAL ? datakiri.LIGHTMEAL[0].ach : 0) +
                (datakiri.PAKET ? datakiri.PAKET[0].ach : 0)
            ).format("0,0")}
          </td>
        </tr>
      ))}

      {dataTotal.map((data, index) => (
        <tr key={`row-total-${index}`}>
          <th className="grey" key={`total-${index}`} colSpan={1}>
            {data.sourcetype}
          </th>
          <td className="green" key={`workshop-total-${index}`}>
            {(data.WORKSHOP && numeral(data.WORKSHOP[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="grey" key={`apps-total-${index}`}>
            {(data.APPS && numeral(data.APPS[0].ach).format("0,0")) || 0}
          </td>

          <td className="green" key={`lightools-total-${index}`}>
            {(data.LIGHTTOOLS &&
              numeral(data.LIGHTTOOLS[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="grey" key={`lightmeals-total-${index}`}>
            {(data.LIGHTMEAL && numeral(data.LIGHTMEAL[0].ach).format("0,0")) ||
              0}
          </td>

          <td className="green" key={`paket-total-${index}`}>
            {(data.PAKET && numeral(data.PAKET[0].ach).format("0,0")) || 0}
          </td>

          <td className="grey" key={`all-total-${index}`}>
            {numeral(
              (data.WORKSHOP ? data.WORKSHOP[0].ach : 0) +
                (data.APPS ? data.APPS[0].ach : 0) +
                (data.LIGHTTOOLS ? data.LIGHTTOOLS[0].ach : 0) +
                (data.LIGHTMEAL ? data.LIGHTMEAL[0].ach : 0) +
                (data.PAKET ? data.PAKET[0].ach : 0)
            ).format("0,0")}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
