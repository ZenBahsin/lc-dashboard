import React from "react";
import { Button, Card, Center, Flex, Text } from "@chakra-ui/react";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ConfirmDialog from "../confirm-dialog";

interface CardComponentProps {
  onConfirmHandler: (notes: any) => void;
  children: React.ReactNode;
  title: String;
}

const CardComponent: React.FC<CardComponentProps> = ({
  onConfirmHandler,
  children,
  title,
}) => {
  const handle = useFullScreenHandle();
  return (
    <Card>
      <Flex justifyContent={"space-between"} m="4" justifyItems={"center"}>
        <Center>
          <Text fontSize={"lg"} as="b">
            {title}
          </Text>
        </Center>
        <Flex justifyContent={"flex-end"}>
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
                colorScheme={"facebook"}
              >
                Print
              </Button>
            )}
          </ConfirmDialog>
          <Center>
            <FontAwesomeIcon
              className="expand-button"
              data-html2canvas-ignore="true"
              icon={faExpand}
              size="2x"
              color="#007bff"
              onClick={handle.enter}
              style={{ cursor: "pointer" }}
            />
          </Center>
        </Flex>
      </Flex>
      <FullScreen handle={handle}>{children}</FullScreen>
    </Card>
  );
};

export default CardComponent;
