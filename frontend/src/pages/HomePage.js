import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import RevenueGrowth from "../components/RevenueGrowth";
import RevenueGrowthPerSource from "../components/RevenueGrowthPerSource";
import ProductRanked from "../components/ProductRanked";

const Home = () => {
  return (
    <>
      <Card>
        <RevenueGrowth />
      </Card>
      <Flex justifyContent="center" mb="8" mt="50px">
        <Card width="calc(50% - 10px)">
          <RevenueGrowthPerSource />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <ProductRanked />
        </Card>
      </Flex>
    </>
  );
};

export default Home;
