"use client";

// LIBRARY IMPORTS
import { Box, Text, DataList } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function DirectoryList() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const loadDirectory = async () => {
      const res = await fetch("/api/data/directory");
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.individuals || []); // Finch returns `individuals`
      }
    };
    loadDirectory();
  }, []);

  if (!employees.length) return <Box>Loading directory...</Box>;

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>
        Employee Directory
      </Text>
      <DataList.Root>
        {employees.map((emp: any) => (
          <DataList.Item key={emp.id}>
            <DataList.ItemLabel>{emp.id}</DataList.ItemLabel>
            <DataList.ItemValue>
              {emp.first_name} {emp.last_name}
            </DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Box>
  );
}
