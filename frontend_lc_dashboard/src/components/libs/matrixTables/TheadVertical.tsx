interface TableHeadData {
  name: string;
  subhead: { ach: string }[];
}

const THeadVertical = () => {
  const tableHeadData: TableHeadData[] = [
    { name: "Workshop", subhead: [{ ach: "Ach" }] },
    {
      name: "Apps",
      subhead: [{ ach: "Ach" }],
    },
    {
      name: "LIGHTtools",
      subhead: [{ ach: "Ach" }],
    },
    {
      name: "LIGHTmeals",
      subhead: [{ ach: "Ach" }],
    },
    {
      name: "Paket",
      subhead: [{ ach: "Ach" }],
    },
    {
      name: "Total",
      subhead: [{ ach: "Ach" }],
    },
  ];

  return (
    <thead>
      <tr>
        <th colSpan={1} style={{ background: "white" }}></th>
        {tableHeadData.map((data, index) => (
          <th
            className={index % 2 ? "grey" : "green"}
            key={`name-${index}`}
            colSpan={1}
          >
            {data.name}
          </th>
        ))}
      </tr>
      <tr>
        <th colSpan={1} style={{ background: "white" }}></th>
        {tableHeadData.map((datas, indexs) => (
          <th
            className={indexs % 2 ? "soft-grey" : "soft-green"}
            key={`subhead-${indexs}`}
          >
            {datas?.subhead[0].ach}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THeadVertical;
