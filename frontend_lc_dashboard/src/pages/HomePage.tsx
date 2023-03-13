import React, { useState } from "react";
import { Box, Flex, Button, SimpleGrid, Center } from "@chakra-ui/react";
import RevenueGrowth from "../components/HomePage/RevenueGrowth";
import RevenueGrowthPerSource from "../components/HomePage/RevenueGrowthPerSource";
import ProductRanked from "../components/HomePage/ProductRanked";
import DateFilter from "../components/libs/Filter/dateFilter";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { exportPDF } from "../components/libs/pdfUtils";
import ConfirmDialog from "../components/libs/confirm-dialog";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
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
      elementId: "homepage_overview",
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
        <Box id="homepage_overview">
          <Box m="8">
            <RevenueGrowth filterParams={filterParams} />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8">
            <Box m="8">
              <RevenueGrowthPerSource filterParams={filterParams} />
            </Box>
            <Box m="8">
              <ProductRanked filterParams={filterParams} />
            </Box>
          </SimpleGrid>
        </Box>
      </FullScreen>
    </>
  );
};

export default Home;
