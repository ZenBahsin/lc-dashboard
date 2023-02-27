import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    onFilter({ startDate, endDate });
  };

  return (
    <Box p={4} display="flex" alignItems="center">
      <FormControl id="start-date" mr={4} maxW="150px">
        <FormLabel>Start Date</FormLabel>
        <Input type="date" value={startDate} onChange={handleStartDateChange} />
      </FormControl>
      <FormControl id="end-date" mr={4} maxW="150px">
        <FormLabel>End Date</FormLabel>
        <Input type="date" value={endDate} onChange={handleEndDateChange} />
      </FormControl>
      <Flex alignSelf="center">
        <Button colorScheme="blue" onClick={handleFilterClick}>
          Filter
        </Button>
      </Flex>
    </Box>
  );
};

export default DateFilter;
