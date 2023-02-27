import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import OwnShopCommerceTransactionTable from "../components/OwnShop_Commerce_TransactionTable";
import OwnShopCommerceContribution from "../components/OwnShop_Commerce_Contribution";
import OwnShopCommerceProductContribution from "../components/OwnShop_Commerce_ProductContribution";
import OwnShopCommerceMostSoldProduct from "../components/OwnShop_Commerce_MostSoldProduct";
import OwnShopCommerceOrderGrowthPerCommerce from "../components/OwnShop_Commerce_OrderGrowthPerCommerce";

const OwnShopCommerce = () => {
  return (
    <>
      <Card>
        <OwnShopCommerceTransactionTable />
      </Card>
      <Flex justifyContent="left" mb="8" mt="50px">
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <OwnShopCommerceContribution />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <OwnShopCommerceProductContribution />
        </Card>
      </Flex>
      <Flex justifyContent="left" mb="8" mt="50px">
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <OwnShopCommerceMostSoldProduct />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <OwnShopCommerceOrderGrowthPerCommerce />
        </Card>
      </Flex>
    </>
  );
};

export default OwnShopCommerce;
