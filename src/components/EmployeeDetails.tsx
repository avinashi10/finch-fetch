"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import IndividualInfo from "./EmployeeDetails/IndividualInfo";
import EmploymentInfo from "./EmployeeDetails/EmploymentInfo";

export default function EmployeeDetails({ employeeId }: { employeeId?: string }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      {!employeeId ? (
        <Text color="gray.600">Select an employee to view details.</Text>
      ) : (
        <Stack padding={4}>
          <IndividualInfo employeeId={employeeId} />
          <EmploymentInfo employeeId={employeeId} />
        </Stack>
      )}
    </Box>
  );
}
