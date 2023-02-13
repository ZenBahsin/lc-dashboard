import React from "react";
import { Box, Text, Progress, Flex, ProgressLabel } from "@chakra-ui/react";

const ProgressBar = ({ product, percentage }) => {
  return (
    <Flex alignItems="flex-start" mt={2}>
      <Text mr={5} flexBasis={150}>
        {product}:
      </Text>
      <Box width="1px" height="40px" bg="gray.300" mr={5} />
      <Box width="100%">
        <Progress
          value={percentage}
          height="30px"
          borderRadius="full"
          colorScheme={
            product === "LIGHTMEAL"
              ? "pink"
              : product === "LIGHTTOOLS"
              ? "green"
              : product === "PAKET"
              ? "red"
              : product === "WORKSHOP"
              ? "teal"
              : product === "APPS"
              ? "cyan"
              : "blue"
          }
        >
          <ProgressLabel color="black">{percentage}%</ProgressLabel>
        </Progress>
      </Box>
    </Flex>
  );
};

export default ProgressBar;
