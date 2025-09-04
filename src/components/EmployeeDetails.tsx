"use client";

// LIBRARY IMPORTS
import { Box, Stack } from "@chakra-ui/react";

// LOCAL IMPORTS
import IndividualInfo from "./EmployeeDetails/IndividualInfo";
import EmploymentInfo from "./EmployeeDetails/EmploymentInfo";

export default function EmployeeDetails() {
  return (
    <Box>
      <Stack padding={4}>
        <IndividualInfo />
        <EmploymentInfo />
      </Stack>
    </Box>
  );
}
