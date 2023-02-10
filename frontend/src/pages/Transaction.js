import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import RevenueGrowth from "../components/RevenueGrowth";
import TransactionTable from "../components/TransactionTable";
import ChannelContribution from "../components/ChannelContribution";
import ProductContribution from "../components/ProductContribution";

const Transaction = () => {
  return (
    <>
      <Card>
        <TransactionTable />
      </Card>
      <Flex justifyContent="center" mb="8" mt="50px">
        <Card width="calc(50% - 10px)">
          <ChannelContribution />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <ProductContribution />
        </Card>
      </Flex>
      <Card>
        <RevenueGrowth />
      </Card>
    </>
  );
};

export default Transaction;
