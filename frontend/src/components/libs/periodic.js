import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        _checked={{
          bg: "#C6D050",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export const Periodic = ({ onPeriodic }) => {
  const options = ["Day", "Week", "Month"];

  const handleChange = (value) => {
    onPeriodic(value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "Month",
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <>
      <HStack {...group} spacing="0px">
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </>
  );
};
