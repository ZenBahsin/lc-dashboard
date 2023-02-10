import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import B2BTransactionTable from "../components/B2B_TransactionTable";
import B2BRevenueGrowth from "../components/B2B_RevenueGrowth";
import B2BChannelContribution from "../components/B2B_ChannelContribution";
import B2BProductContribution from "../components/B2B_ProductContribution";

const B2B = () => {
  return (
    <>
      <Card>
        <B2BTransactionTable />
      </Card>
      <Flex justifyContent="center" mb="8" mt="50px">
        <Card width="calc(50% - 10px)">
          <B2BChannelContribution />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <B2BProductContribution />
        </Card>
      </Flex>
      <Card>
        <B2BRevenueGrowth />
      </Card>
    </>
  );
};

export default B2B;
