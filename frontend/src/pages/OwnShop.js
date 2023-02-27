import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import OwnShopTransactionTable from "../components/OwnShop_TransactionTable";
import OwnShopChannelContribution from "../components/OwnShop_ChannelContribution";
import OwnShopProductContribution from "../components/OwnShop_ProductContribution";
import OwnShopRevenueGrowth from "../components/OwnShop_RevenueGrowth";

const OwnShop = () => {
  return (
    <>
      <Card>
        <OwnShopTransactionTable />
      </Card>
      <Flex justifyContent="center" mb="8" mt="50px">
        <Card width="calc(50% - 10px)">
          <OwnShopChannelContribution />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <OwnShopProductContribution />
        </Card>
      </Flex>
      <Card>
        <OwnShopRevenueGrowth />
      </Card>
    </>
  );
};

export default OwnShop;
