import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

interface PeriodicProps {
  onPeriodic: (value: string) => void;
}

function RadioCard({ children, ...props }: any) {
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
        {children}
      </Box>
    </Box>
  );
}

function useRadioOptions(options: string[], defaultValue: string, onChange: (value: string) => void) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  const radios = options.map((value) => {
    const radio = getRadioProps({ value });
    return <RadioCard key={value} {...radio}>{value}</RadioCard>;
  });

  return { group, radios };
}

export const Periodic = ({ onPeriodic }: PeriodicProps) => {
  const options = ["Day", "Week", "Month"];
  const handleChange = (value: string) => {
    onPeriodic(value);
  };

  const { group, radios } = useRadioOptions(options, "Month", handleChange);

  return (
    <>
      <HStack {...group} spacing="0px">
        {radios}
      </HStack>
    </>
  );
};
