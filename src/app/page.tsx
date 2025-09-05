"use client";

// LIBRARY IMPORTS
import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// LOCAL IMPORTS
import CompanyCard from "../components/CompanyCard";
import DirectoryList from "../components/DirectoryList";
import EmployeeDetails from "../components/EmployeeDetails";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  // STATE
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // EFFECTS
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/auth/status");
        const data = await res.json();
        setIsConnected(data.isConnected);
      } catch {
        setIsConnected(false);
      }
    };
    checkStatus();
  }, []);

  // HANDLERS
  const handleConnect = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/auth/connect", { method: "POST" });
        if (!res.ok) throw new Error(`Connect failed: ${res.status}`);
        const data = await res.json();
        window.location.assign(data.url);
      } catch (e: any) {
        setError(e?.message ?? "Failed to start Finch Connect.");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Container maxW="container.lg" py={8}>
      <Stack padding={8}>
        <Heading as="h1" size="lg">
          Finch Sandbox Demo
        </Heading>

        <Button onClick={handleConnect} loading={isLoading} disabled={isLoading}>
          Connect to Finch
        </Button>
        {isConnected && (
          <>
            <CompanyCard />
            <DirectoryList />
            <EmployeeDetails />
          </>
        )}
        {error && <ErrorMessage message={error} />}
      </Stack>
    </Container>
  );
}
