import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import B2BRetailTransactionTable from "../components/B2B_Retail_TransactionTable";
import B2BRetailContribution from "../components/B2B_Retail_Contribution";
import B2BOrderGrowthPerRetail from "../components/B2B_Retail_OrderGrowthPerRetail";
import B2BRetailProductContribution from "../components/B2B_Retail_ProductContribution";

const B2BRetail = () => {
  return (
    <>
      <Card>
        <B2BRetailTransactionTable />
      </Card>
      <Flex justifyContent="left" mb="8" mt="50px">
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <B2BRetailContribution />
        </Card>
      </Flex>
      <Flex justifyContent="left" mb="8" mt="50px">
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <B2BOrderGrowthPerRetail />
        </Card>
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <B2BRetailProductContribution />
        </Card>
      </Flex>
    </>
  );
};

export default B2BRetail;
