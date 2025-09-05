"use client";

// LIBRARY IMPORTS
import { Box, Text, DataList } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  onSelect: (id: string) => void;
  selectedId?: string;
};

export default function DirectoryList({ onSelect, selectedId }: Props) {
  // STATES
  const [employees, setEmployees] = useState<any[]>([]);

  // HOOKS
  useEffect(() => {
    const loadDirectory = async () => {
      const res = await fetch("/api/data/directory");
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.individuals || []);
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
        {employees.map((emp: any) => {
          const isSelected = selectedId === emp.id;
          return (
            <DataList.Item
              key={emp.id}
              onClick={() => onSelect(emp.id)}
              cursor="pointer"
              bg={isSelected ? "gray.50" : undefined}
              _hover={{ bg: "gray.50" }}
              borderRadius="md"
              px={2}
            >
              <DataList.ItemLabel>Employee</DataList.ItemLabel>
              <DataList.ItemValue>
                {emp.first_name} {emp.last_name}
              </DataList.ItemValue>
            </DataList.Item>
          );
        })}
      </DataList.Root>
    </Box>
  );
}
