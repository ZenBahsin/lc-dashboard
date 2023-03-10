import React, { useState, useRef, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import Conditional from "../conditional/index";

interface Props {
  onConfirm: (notes: string) => void;
  onClose?: () => void;
  title?: string;
  message?: string;
  closeLabel?: string;
  confirmLabel: string;
  TitleLabel?: string;
  children: ({ openDialog }: { openDialog: () => void }) => ReactNode;
  options?: boolean;
}

const ConfirmDialog = ({
  onConfirm,
  onClose,
  title,
  message,
  closeLabel,
  confirmLabel,
  TitleLabel,
  children,
  options,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState("");
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onCloseHandler = () => {
    if (onClose && typeof onClose === "function") {
      onClose();
    }
    setIsOpen(false);
  };

  const onConfirmHandler = () => {
    onConfirm(notes);
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
    setNotes("");
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onCloseHandler}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <Conditional isTrue={!!title}>
              <AlertDialogHeader fontSize="md" fontWeight="bold">
                <Flex justifyContent={"center"}>{title}</Flex>
              </AlertDialogHeader>
            </Conditional>
            <AlertDialogBody>
              <Conditional isTrue={!!message}>
                <AlertDialogBody paddingBottom={5}>
                  <Flex justifyContent={"center"}>{message}</Flex>
                </AlertDialogBody>
              </Conditional>
              <Conditional isTrue={!!options}>
                <Text mb="8px">{TitleLabel}:</Text>
                <Input
                  mb={5}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setNotes(e.target.value);
                  }}
                />
              </Conditional>
            </AlertDialogBody>
            <Flex justifyContent={"center"}>
              <AlertDialogFooter>
                <ButtonGroup gap="3">
                  <Button
                    ref={cancelRef}
                    width="160px"
                    colorScheme="blue"
                    id="the-alert-dialog"
                    onClick={onCloseHandler}
                  >
                    {closeLabel ?? "Batal"}
                  </Button>
                  <Button
                    width="160px"
                    colorScheme="blue"
                    variant="outline"
                    _hover={{ bg: "blue.500", color: "white" }}
                    id="the-alert-dialog"
                    onClick={onConfirmHandler}
                  >
                    {confirmLabel}
                  </Button>
                </ButtonGroup>
              </AlertDialogFooter>
            </Flex>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {children({ openDialog })}
    </>
  );
};

export default ConfirmDialog;
