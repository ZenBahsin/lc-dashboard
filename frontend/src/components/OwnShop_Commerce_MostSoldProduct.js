import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ProgressBar from "./libs/progress-bar";

const OwnShopCommerceMostSoldProduct = () => {
  const [data, setData] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/ownshopcommercemostsoldproduct?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Ownshop Most Sold Product ...</p>;
  if (!data) return <p>No data</p>;

  return (
    <Box padding={4}>
      {data.getOwnShopCommerceMostSoldProductData.map((data) => (
        <ProgressBar
          key={data.sourcetype}
          product={data.sourcetype}
          percentage={data.Percentage_of_revenue_growths}
        />
      ))}
    </Box>
  );
};

export default OwnShopCommerceMostSoldProduct;
