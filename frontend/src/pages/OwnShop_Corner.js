import React, { useState } from "react";
import { Box, Flex, Card, Button, SimpleGrid } from "@chakra-ui/react";
import OwnShopCornerTransactionTable from "../components/OwnShop_Corner_TransactionTable";
import OwnShopCornerContribution from "../components/OwnShop_Corner_Contribution";
import OwnShopCornerProductContribution from "../components/OwnShop_Corner_ProductContribution";
import OwnShopCornerMostSoldProduct from "../components/OwnShop_Corner_MostSoldProduct";
import OwnShopCornerOrderGrowthPerCorner from "../components/OwnShop_Corner_OrderGrowthPerCorner";
import DateFilter from "../components/libs/dateFilter";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { exportPDF } from "../components/libs/pdfUtils";

const OwnShopCorner = () => {
  const [filterParams, setFilterParams] = useState({});
  const handle = useFullScreenHandle();

  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams

  const handleFilter = (params) => {
    setFilterParams(params);
  };

  return (
    <>
      <Box>
        <DateFilter onFilter={handleFilter} />
      </Box>
      <Flex justifyContent="flex-end">
        <button onClick={handle.enter}>Enter fullscreen</button>
      </Flex>
      <FullScreen handle={handle}>
        <Button
          ml="8"
          onClick={() =>
            exportPDF({
              elementId: "ownhsopcorner",
              startDate,
              endDate,
              printFullPage: true,
            })
          }
          className="print-button"
          colorScheme={"facebook"}
        >
          Print
        </Button>
        <div id="ownhsopcorner">
          <Box m="8">
            <Card>
              <OwnShopCornerTransactionTable filterParams={filterParams} />
            </Card>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <Card>
                <OwnShopCornerContribution filterParams={filterParams} />
              </Card>
            </Box>
            <Box m="8">
              <Card>
                <OwnShopCornerProductContribution filterParams={filterParams} />
              </Card>
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <Card>
                <OwnShopCornerMostSoldProduct filterParams={filterParams} />
              </Card>
            </Box>
            <Box m="8">
              <Card>
                <OwnShopCornerOrderGrowthPerCorner
                  filterParams={filterParams}
                />
              </Card>
            </Box>
          </SimpleGrid>
        </div>
      </FullScreen>
    </>
  );
};

export default OwnShopCorner;
