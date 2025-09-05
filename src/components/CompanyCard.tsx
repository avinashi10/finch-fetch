"use client";

// LIBRARY IMPORTS
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CompanyCard() {
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const loadCompany = async () => {
      const res = await fetch("/api/data/company");
      if (res.ok) {
        setCompany(await res.json());
      }
    };
    loadCompany();
  }, []);

  if (!company) return <Box>Loading company info...</Box>;

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold">{company.legal_name}</Text>
      <Text>{company.entity?.type}</Text>
      <Text>{company.primary_address?.city}, {company.primary_address?.state}</Text>
    </Box>
  );
}
