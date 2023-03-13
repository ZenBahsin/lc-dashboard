import React from "react";
import { GroupBarChart } from "../libs/charts/bar-group-chart";
import { exportPDF } from "../libs/pdfUtils";
import { Box } from "@chakra-ui/react";
import { REVENUE_GROWTH_PER_SOURCE } from "../libs/query";
import CardComponent from "../libs/card";
import { useQuery } from "@apollo/client";

interface OrderGrowthPerSourceProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}
const RevenueGrowthPerSource: React.FC<OrderGrowthPerSourceProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(REVENUE_GROWTH_PER_SOURCE, {
    variables: {
      startDate: startDate,
      endDate: endDate,
      groupby: periodic,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Oerder Growth per Corner...</p>;
  if (error || !data?.getRevenueGrowthPerSource?.length)
    return <p>No data available</p>;

  const getLabels = Array.from(
    new Set(
      data.getRevenueGrowthPerSource.map((datas: any) => datas?.periode)
    )
  );
  getLabels.sort((a: any, b: any): any =>
    periodic === "Day"
      ? new Date(a).valueOf() - new Date(b).valueOf()
      : Number(a) - Number(b)
  );
  const labels: string[] = getLabels.map(String);

  console.log(labels);

  const sourceTypes: any[] = [];
  data.getRevenueGrowthPerSource.forEach((datas: { sourcetype: any }) => {
    if (!sourceTypes.includes(datas.sourcetype)) {
      sourceTypes.push(datas.sourcetype);
    }
  });

  const datasets: any[] = [];
  sourceTypes.forEach((sourcetype) => {
    const filledMonths = data.getRevenueGrowthPerSource
      .filter((datas: { sourcetype: any }) => datas.sourcetype === sourcetype)
      .map((datas: { periode: any }) => datas?.periode);

    const getDataOrder: number[] = data.getRevenueGrowthPerSource
      .filter((datas: any) => datas.sourcetype === sourcetype)
      .map((datas: any) => datas?.revenue_growths);

    const newfilledMonths = filledMonths.map(String);
    const dataset = labels.map((datas) => {
      const indexOfFilledData = newfilledMonths.indexOf(datas);
      if (indexOfFilledData !== -1) return getDataOrder[indexOfFilledData];
      return null;
    });

    datasets.push({
      tension: 0.35,
      fill: true,
      label: sourcetype.trim(),
      data: dataset,
      borderColor: "#B3B3B3",
      borderWidth: 2,
      pointRadius: 0,
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
    });
  });

  const dataChart = {
    labels,
    datasets,
  };

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "revenuegrowthpersource",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <CardComponent
      data-html2canvas-ignore="true"
      title={"Revenue Growth Per Source"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box
        id="revenuegrowthpersource"
        style={{
          height: "60vh",
          position: "relative",
          padding: "1%",
        }}
      >
        <GroupBarChart data={dataChart} />
      </Box>
    </CardComponent>
  );
};

export default RevenueGrowthPerSource;
