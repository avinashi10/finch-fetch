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
        setData(json.responses?.[0]?.body ?? null);
      }
    };
    loadEmployment();
  }, [employeeId]);

  // DATA HELPER FUNCTIONS
  const show = (v: any) => (v === null || v === undefined || v === "" ? "—" : String(v));
  const join = (arr?: any[], pick?: (x: any) => any) =>
    !arr || arr.length === 0 ? "—" : arr.map((x) => show(pick ? pick(x) : x)).join(", ");

  if (!data) return <Box>Loading employment...</Box>;

  if (data?.error === "not_implemented") {
    return (
      <Box borderWidth="1px" borderRadius="md" p={4} bg="yellow.50">
        <Text fontWeight="bold" color="yellow.800">
          This provider does not implement the Employment endpoint.
        </Text>
      </Box>
    );
  }
  
  return (
  <Box borderWidth="1px" borderRadius="md" p={4}>
    <Text fontWeight="bold" mb={2}>Employment Details</Text>
    <Text>ID: {show(data?.id)}</Text>
    <Text>First name: {show(data?.first_name)}</Text>
    <Text>Middle name: {show(data?.middle_name)}</Text>
    <Text>Last name: {show(data?.last_name)}</Text>
    <Text>Title: {show(data?.title)}</Text>
    <Text>Manager ID: {show(data?.manager?.id)}</Text>
    <Text>Department: {show(data?.department?.name)}</Text>
    <Text>Employment type: {show(data?.employment?.type)}</Text>
    <Text>Employment subtype: {show(data?.employment?.subtype)}</Text>
    <Text>Start date: {show(data?.start_date)}</Text>
    <Text>End date: {show(data?.end_date)}</Text>
    <Text>Latest rehire date: {show(data?.latest_rehire_date)}</Text>
    <Text>Is active: {show(data?.is_active)}</Text>
    <Text>Employment status: {show(data?.employment_status)}</Text>
    <Text>Class code: {show(data?.class_code)}</Text>
    <Text>Location line1: {show(data?.location?.line1)}</Text>
    <Text>Location line2: {show(data?.location?.line2)}</Text>
    <Text>City: {show(data?.location?.city)}</Text>
    <Text>State: {show(data?.location?.state)}</Text>
    <Text>Postal code: {show(data?.location?.postal_code)}</Text>
    <Text>Country: {show(data?.location?.country)}</Text>
    <Text>Income unit: {show(data?.income?.unit)}</Text>
    <Text>Income amount: {show(data?.income?.amount)}</Text>
    <Text>Income currency: {show(data?.income?.currency)}</Text>
    <Text>Income effective date: {show(data?.income?.effective_date)}</Text>
    <Text>Income history: {join(data?.income_history, (h) => `${h?.unit ?? "—"} ${h?.amount ?? "—"} ${h?.currency ?? "—"} @ ${h?.effective_date ?? "—"}`)}</Text>
    <Text>Custom fields: {join(data?.custom_fields, (c) => `${c?.name ?? "—"}: ${c?.value ?? "—"}`)}</Text>
  </Box>

  );
}
