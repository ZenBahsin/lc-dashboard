import numeral from "numeral";
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
            {(datakiri.PAKET && numeral(datakiri.PAKET[0].ach).format("0,0")) ||
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
            {(data.APPS && numeral(data.APPS[0].ach).format("0,0")) || 0}
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
            {(data.LIGHTMEAL && numeral(data.LIGHTMEAL[0].ach).format("0,0")) ||
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

export default TBody;
