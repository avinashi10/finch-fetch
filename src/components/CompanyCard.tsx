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

  // DATA HELPER FUNCTION
  const show = (v: any) => (v === null || v === undefined || v === "" ? "—" : String(v));
  const join = (arr?: any[], map?: (x: any) => string) =>
    !arr || arr.length === 0 ? "—" : arr.map((x) => (map ? map(x) : String(x))).join(", ");

  if (!company) return <Box>Loading company info...</Box>;

  if (company?.error === "not_implemented") {
    return (
      <Box borderWidth="1px" borderRadius="md" p={4} bg="yellow.50">
        <Text fontWeight="bold" color="yellow.800">
          This provider does not implement the Company endpoint.
        </Text>
      </Box>
    );
  }


  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Company</Text>
      <Text>ID: {show(company?.id)}</Text>
      <Text>Legal name: {show(company?.legal_name)}</Text>
      <Text>Entity type: {show(company?.entity?.type)}</Text>
      <Text>Entity subtype: {show(company?.entity?.subtype)}</Text>
      <Text>EIN: {show(company?.ein)}</Text>
      <Text>Primary email: {show(company?.primary_email)}</Text>
      <Text>Primary phone: {show(company?.primary_phone_number)}</Text>
  
      <Text mt={2} fontWeight="semibold">Departments</Text>
      <Text>
        {join(company?.departments, (d) =>
          `${d?.name ?? "—"}${d?.parent?.name ? ` (parent: ${d.parent.name})` : ""}`
        )}
      </Text>
  
      <Text mt={2} fontWeight="semibold">Locations</Text>
      <Text>
        {join(company?.locations, (l) =>
          [l?.line1, l?.line2, l?.city, l?.state, l?.postal_code, l?.country]
            .filter(Boolean)
            .join(", ")
        )}
      </Text>
  
      <Text mt={2} fontWeight="semibold">Accounts</Text>
      <Text>
        {join(company?.accounts, (a) =>
          `${a?.institution_name ?? "—"} • ${a?.account_name ?? "—"} • ${a?.account_type ?? "—"} • ****${(a?.account_number ?? "").slice(-4)}`
        )}
      </Text>
    </Box>
  );
  
}
