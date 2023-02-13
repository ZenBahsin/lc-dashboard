const THeadVertical = () => {
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

  return (
    <thead>
      <tr>
        <th colSpan={3}></th>
        {tableHeadData.map((data, index) => (
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
        {tableHeadData.map((datas, indexs) => (
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

export default THeadVertical;
