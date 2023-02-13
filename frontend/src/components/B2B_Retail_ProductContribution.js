import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ProgressBar from "./libs/progress-bar";

const B2BRetailProductContribution = () => {
  const [data, setData] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/b2bproductcontributionretail?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading B2B Retail Product Contribution...</p>;
  if (!data) return <p>No data</p>;

  return (
    <Box padding={4}>
      {data.getB2BProductContributionRetailData.map((data) => (
        <ProgressBar
          key={data.product}
          product={data.product}
          percentage={data.Percentage_of_revenue_growths}
        />
      ))}
    </Box>
  );
};

export default B2BRetailProductContribution;
