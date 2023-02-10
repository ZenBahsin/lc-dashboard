import React from "react";
import { Box, Flex, Card } from "@chakra-ui/react";
import B2BCorporateProductContribution from "../components/B2B_Corp_ProductContribution";
import B2BCorpTransactionTable from "../components/B2B_Corp_TransactionTable";

const B2BCorporate = () => {
  return (
    <>
      <Card>
        <B2BCorpTransactionTable />
      </Card>
      <Flex justifyContent="left" mb="8" mt="50px">
        <Box width="20px" />
        <Card width="calc(50% - 10px)">
          <B2BCorporateProductContribution />
        </Card>
      </Flex>
    </>
  );
};

export default B2BCorporate;
