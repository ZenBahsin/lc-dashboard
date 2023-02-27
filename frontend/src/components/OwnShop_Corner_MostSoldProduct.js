import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ProgressBar from "./libs/progress-bar";

const OwnShopCornerMostSoldProduct = ({ filterParams }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/api/ownshopcornermostsoldproduct?startdate=${startDate}&enddate=${endDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [endDate, startDate]);

  if (isLoading) return <p>Loading Ownshop Most Sold Product ...</p>;
  if (!data?.getOwnShopCornerMostSoldProductData?.length) return <p>No data available</p>;

  return (
    <Box padding={4}>
      {data.getOwnShopCornerMostSoldProductData.map((data) => (
        <ProgressBar
          key={data.sourcetype}
          product={data.sourcetype}
          percentage={data.Percentage_of_revenue_growths}
        />
      ))}
    </Box>
  );
};

export default OwnShopCornerMostSoldProduct;
