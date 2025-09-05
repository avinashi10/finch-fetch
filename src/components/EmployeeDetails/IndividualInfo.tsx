"use client";

// LIBRARY IMPORTS
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function IndividualInfo({ employeeId }: { employeeId: string }) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const loadIndividual = async () => {
      setData(null);
      const res = await fetch(`/api/data/individual?employee_id=${encodeURIComponent(employeeId)}`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    };
    loadIndividual();
  }, [employeeId]);

  if (!data) return <Box>Loading individual...</Box>;

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Individual Details</Text>
      <Text>Name: {data.first_name} {data.last_name}</Text>
      <Text>Email: {data.emails?.[0]?.data || "—"}</Text>
      <Text>Phone: {data.phone_numbers?.[0]?.data || "—"}</Text>
    </Box>
  );
}
