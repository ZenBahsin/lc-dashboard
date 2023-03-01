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
import ConfirmDialog from "../components/libs/confirm-dialog";

const OwnShopCorner = () => {
  const [filterParams, setFilterParams] = useState({});
  const handle = useFullScreenHandle();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const handleFilter = (params) => {
    setFilterParams(params);
  };

  const onConfirmHandler = (notes) => {
    setShowConfirmDialog(false);
    exportPDF({
      elementId: "ownshopcorner",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  const onCancelHandler = () => {
    setShowConfirmDialog(false);
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
        <ConfirmDialog
          isOpen={showConfirmDialog}
          title="Print Konfirmasi"
          message="Apakah Anda yakin ingin mencetak Laporan Ini?"
          confirmLabel="Print"
          TitleLabel="Judul Laporan"
          onConfirm={onConfirmHandler}
          onCancel={onCancelHandler}
          options="Judul Report"
        >
          {({ openDialog }) => (
            <Button
              ml={8}
              onClick={openDialog}
              className="print-button"
              colorScheme={"facebook"}
              tooltip="print"
            >
              Print
            </Button>
          )}
        </ConfirmDialog>
        <div id="ownshopcorner">
          <Box m="8">
            <OwnShopCornerTransactionTable filterParams={filterParams} />
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
