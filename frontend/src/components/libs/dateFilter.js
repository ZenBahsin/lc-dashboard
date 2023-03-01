import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
} from "@chakra-ui/react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { Periodic } from "./periodic";

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodic, setPeriodic] = useState("Month");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    onFilter({ startDate, endDate, periodic });
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const today = new Date();
    let newStartDate, newEndDate;
    switch (selectedValue) {
      case "today":
        newStartDate = format(today, "yyyy-MM-dd");
        newEndDate = format(today, "yyyy-MM-dd");
        break;
      case "thisWeek":
        newStartDate = format(startOfWeek(today), "yyyy-MM-dd");
        newEndDate = format(endOfWeek(today), "yyyy-MM-dd");
        break;
      case "thisMonth":
        newStartDate = format(startOfMonth(today), "yyyy-MM-dd");
        newEndDate = format(endOfMonth(today), "yyyy-MM-dd");
        break;
      default:
        newStartDate = "";
        newEndDate = "";
        break;
    }
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handlePeriodicChange = (value) => {
    setPeriodic(value);
  };

  return (
    <Box p={4} display="flex" alignItems="center">
      <FormControl id="date-range" mr={4} maxW="150px">
        <FormLabel>Date Range</FormLabel>
        <Select placeholder="Select date range" onChange={handleSelectChange}>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </Select>
      </FormControl>
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
      <Box ml="auto">
        <Periodic onPeriodic={handlePeriodicChange} />
      </Box>
    </Box>
  );
};

export default DateFilter;
