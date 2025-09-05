"use client";

// LIBRARY IMPORTS
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function EmploymentInfo({ employeeId }: { employeeId: string }) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const loadEmployment = async () => {
      setData(null);
      const res = await fetch(`/api/data/employment?employee_id=${encodeURIComponent(employeeId)}`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    };
    loadEmployment();
  }, [employeeId]);

  if (!data) return <Box>Loading employment...</Box>;

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Employment Details</Text>
      <Text>Title: {data.title || "—"}</Text>
      <Text>Department: {data.department || "—"}</Text>
      <Text>Status: {data.employment?.status || "—"}</Text>
    </Box>
  );
}
