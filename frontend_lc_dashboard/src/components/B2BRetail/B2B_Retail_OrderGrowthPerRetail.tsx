import React from "react";
import { useQuery } from "@apollo/client";
import { GroupBarChart } from "../libs/charts/bar-group-chart";
import { Box } from "@chakra-ui/react";
import { exportPDF } from "../libs/pdfUtils";
import { B2B_ORDER_GROWTH_PER_RETAIL } from "../libs/query";
import CardComponent from "../libs/card";

interface B2BOrderGrowthPerRetailProps {
  filterParams: {
    periodic?: string;
    startDate?: string;
    endDate?: string;
  };
}

const B2BOrderGrowthPerRetail: React.FC<B2BOrderGrowthPerRetailProps> = ({
  filterParams,
}) => {
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const { loading, error, data } = useQuery(B2B_ORDER_GROWTH_PER_RETAIL, {
    variables: {
      startDate: startDate,
      endDate: endDate,
      groupby: periodic,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading Oerder Growth per Corner...</p>;
  if (error || !data?.getOrderGrowthPerRetail?.length)
    return <p>No data available</p>;

  const getLabels = Array.from(
    new Set(
      data.getOrderGrowthPerRetail.map((datas: { periode: any; }) =>
        datas?.periode
      )
    )
  );
  getLabels.sort((a: any, b: any): any =>
  periodic === "Day"
    ? new Date(a).valueOf() - new Date(b).valueOf()
    : Number(a) - Number(b)
);
const labels = getLabels.map(String);

  const sourceTypes: any[] = [];
  data.getOrderGrowthPerRetail.forEach((datas: { sourcetype: any; }) => {
    if (!sourceTypes.includes(datas.sourcetype)) {
      sourceTypes.push(datas.sourcetype);
    }
  });

  const datasets: { tension: number; fill: boolean; label: any; data: any[]; borderColor: string; borderWidth: number; pointRadius: number; backgroundColor: string; }[] = [];
  sourceTypes.forEach((sourcetype) => {
    const filledMonths = data.getOrderGrowthPerRetail
      .filter((datas: { sourcetype: any; }) => datas.sourcetype === sourcetype)
      .map((datas: { periode: any; }) =>
       datas?.periode
      );

    const getDataOrder = data.getOrderGrowthPerRetail
      .filter((datas: { sourcetype: any; }) => datas.sourcetype === sourcetype)
      .map((datas: { revenue_growths: any; }) => datas?.revenue_growths);

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
      elementId: "ordergrowthperretail",
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
      title={"B2B Order Growth Per Retail"}
      onConfirmHandler={onConfirmHandler}
    >
      <Box
        id="ordergrowthperretail"
        style={{
          height: "60vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <GroupBarChart data={dataChart} />
      </Box>
    </CardComponent>
  );
};

export default B2BOrderGrowthPerRetail;
