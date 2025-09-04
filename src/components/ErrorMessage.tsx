"use client";

// LIBRARY IMPORTS
import { Box, Text } from "@chakra-ui/react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <Box bg="red.100" p={2} borderRadius="md">
      <Text color="red.700">{message}</Text>
    </Box>
  );
}
