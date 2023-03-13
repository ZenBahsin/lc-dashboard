import React, { useState } from "react";
import { Box, Flex, Button, SimpleGrid, Center } from "@chakra-ui/react";
import DateFilter from "../components/libs/Filter/dateFilter";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { exportPDF } from "../components/libs/pdfUtils";
import ConfirmDialog from "../components/libs/confirm-dialog";
import OwnShopCornerProductContribution from "../components/OwnshopCorner/OwnShop_Corner_ProductContribution";
import OwnShopCornerContribution from "../components/OwnshopCorner/OwnShop_Corner_Contribution";
import OwnShopCornerMostSoldProduct from "../components/OwnshopCorner/OwnShop_Corner_MostSoldProduct";
import OwnShopCornerOrderGrowthPerCorner from "../components/OwnshopCorner/OwnShop_Corner_OrderGrowthPerCorner";
import OwnShopCornerTransactionTable from "../components/OwnshopCorner/OwnShop_Corner_TransactionTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

const OwnShopCorner: React.FC = () => {
  const [filterParams, setFilterParams] = useState<Record<string, any>>({});
  const handle = useFullScreenHandle();
  const startDate = filterParams?.startDate || "2022-01-01";
  const endDate = filterParams?.endDate || "2022-12-30";
  const periodic = filterParams?.periodic || "Month";

  const handleFilter = (params: Record<string, any>) => {
    setFilterParams(params);
  };

  const onConfirmHandler = (notes: string) => {
    exportPDF({
      elementId: "ownshopcorner",
      startDate,
      endDate,
      periodic,
      printFullPage: true,
      notes,
    });
  };

  return (
    <>
      <Box>
        <DateFilter onFilter={handleFilter} />
      </Box>
      <Flex justifyContent={"flex-end"} m="6">
        <ConfirmDialog
          title="Print Konfirmasi"
          message="Apakah Anda yakin ingin mencetak Laporan Ini?"
          confirmLabel="Print"
          TitleLabel="Judul Laporan"
          onConfirm={onConfirmHandler}
          options
        >
          {({ openDialog }) => (
            <Button
              mr={2}
              data-html2canvas-ignore="true"
              onClick={openDialog}
              className="print-button"
              colorScheme={"teal"}
            >
              Print Full Page
            </Button>
          )}
        </ConfirmDialog>
        <Center>
          <FontAwesomeIcon
            data-html2canvas-ignore="true"
            icon={faExpand}
            size="2x"
            color="#2C7A7B"
            onClick={handle.enter}
            style={{ cursor: "pointer" }}
          />
        </Center>
      </Flex>

      <FullScreen handle={handle}>
        <Box id="ownshopcorner">
          <Box m="8">
            <OwnShopCornerTransactionTable filterParams={filterParams} />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <OwnShopCornerContribution filterParams={filterParams} />
            </Box>
            <Box m="8">
              <OwnShopCornerProductContribution filterParams={filterParams} />
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <OwnShopCornerMostSoldProduct filterParams={filterParams} />
            </Box>
            <Box m="8">
              <OwnShopCornerOrderGrowthPerCorner filterParams={filterParams} />
            </Box>
          </SimpleGrid>
        </Box>
      </FullScreen>
    </>
  );
};

export default OwnShopCorner;
