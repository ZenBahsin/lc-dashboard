import React, { useState } from "react";
import { Box, Flex, Button, SimpleGrid, Center } from "@chakra-ui/react";
import B2BTransactionTable from "../components/B2B/B2B_TransactionTable";
import B2BChannelContribution from "../components/B2B/B2B_ChannelContribution";
import B2BProductContribution from "../components/B2B/B2B_ProductContribution";
import B2BRevenueGrowth from "../components/B2B/B2B_RevenueGrowth";
import DateFilter from "../components/libs/Filter/dateFilter";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { exportPDF } from "../components/libs/pdfUtils";
import ConfirmDialog from "../components/libs/confirm-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

const B2B = () => {
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
      elementId: "b2b",
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
        <Box id="b2b">
          <Box m="8">
            <B2BTransactionTable filterParams={filterParams} />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <B2BChannelContribution filterParams={filterParams} />
            </Box>
            <Box m="8">
              <B2BProductContribution filterParams={filterParams} />
            </Box>
          </SimpleGrid>
          <Box m="8">
            <B2BRevenueGrowth filterParams={filterParams} />
          </Box>
        </Box>
      </FullScreen>
    </>
  );
};

export default B2B;
