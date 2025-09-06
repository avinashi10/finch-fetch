"use client";

// LIBRARY IMPORTS
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function IndividualInfo({ employeeId }: { employeeId: string }) {
  // STATES
  const [data, setData] = useState<any | null>(null);

  // HOOKS
  useEffect(() => {
    const loadIndividual = async () => {
      setData(null);
      const res = await fetch(`/api/data/individual?employee_id=${encodeURIComponent(employeeId)}`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setData(json.responses?.[0]?.body ?? null);
      }
    };
    loadIndividual();
  }, [employeeId]);

  // DATA HELPER FUNCTIONS
  const show = (v: any) => (v === null || v === undefined || v === "" ? "—" : String(v));

  if (!data) return <Box>Loading individual...</Box>;

  if (data?.error === "not_implemented") {
    return (
      <Box borderWidth="1px" borderRadius="md" p={4} bg="yellow.50">
        <Text fontWeight="bold" color="yellow.800">
          This provider does not implement the Individual endpoint.
        </Text>
      </Box>
    );
  }  

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Individual Details</Text>
      <Text>ID: {show(data?.id)}</Text>
      <Text>First name: {show(data?.first_name)}</Text>
      <Text>Middle name: {show(data?.middle_name)}</Text>
      <Text>Last name: {show(data?.last_name)}</Text>
      <Text>Preferred name: {show(data?.preferred_name)}</Text>
      <Text>
        Emails:{" "}
        {data?.emails && data.emails.length > 0
          ? data.emails.map((e: any) => `${e.data} (${e.type})`).join(", ")
          : "—"}
      </Text>

      <Text>
        Phone numbers:{" "}
        {data?.phone_numbers && data.phone_numbers.length > 0
          ? data.phone_numbers.map((p: any) => `${p.data} (${p.type})`).join(", ")
          : "—"}
      </Text>
      <Text>Gender: {show(data?.gender)}</Text>
      <Text>Ethnicity: {show(data?.ethnicity)}</Text>
      <Text>Date of birth: {show(data?.dob)}</Text>
      <Text>Address line1: {show(data?.residence?.line1)}</Text>
      <Text>Address line2: {show(data?.residence?.line2)}</Text>
      <Text>City: {show(data?.residence?.city)}</Text>
      <Text>State: {show(data?.residence?.state)}</Text>
      <Text>Postal code: {show(data?.residence?.postal_code)}</Text>
      <Text>Country: {show(data?.residence?.country)}</Text>
    </Box>
  );
}
