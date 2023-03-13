import React, { useState } from "react";
import { Box, Flex, Button, SimpleGrid, Center } from "@chakra-ui/react";
import TransactionTable from "../components/Transaction/TransactionTable";
import ChannelContribution from "../components/Transaction/ChannelContribution";
import ProductContribution from "../components/Transaction/ProductContribution";
import RevenueGrowth from "../components/HomePage/RevenueGrowth";
import DateFilter from "../components/libs/Filter/dateFilter";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { exportPDF } from "../components/libs/pdfUtils";
import ConfirmDialog from "../components/libs/confirm-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

const Transaction = () => {
  interface FilterParams {
    startDate?: string;
    endDate?: string;
    periodic?: string;
  }
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const handle = useFullScreenHandle();
  const startDate = filterParams?.startDate || "2022-01-01"; // tambahkan ? pada filterParams
  const endDate = filterParams?.endDate || "2022-12-30"; // tambahkan ? pada filterParams
  const periodic = filterParams?.periodic || "Month";

  const handleFilter = (params: React.SetStateAction<{}>) => {
    setFilterParams(params);
  };

  const onConfirmHandler = (notes: any) => {
    exportPDF({
      elementId: "transaction",
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
        <Box id="transaction">
          <Box m="8">
            <TransactionTable filterParams={filterParams} />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <ChannelContribution filterParams={filterParams} />
            </Box>
            <Box m="8">
              <ProductContribution filterParams={filterParams} />
            </Box>
          </SimpleGrid>
          <Box m="8">
            <RevenueGrowth filterParams={filterParams} />
          </Box>
        </Box>
      </FullScreen>
    </>
  );
};

export default Transaction;
