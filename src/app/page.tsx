"use client";

// LIBRARY IMPORTS
import {
  Button,
  Container,
  Heading,
  Stack,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

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
  
          {!isConnected ? (
            <Box>
              <Button onClick={handleConnect} loading={isLoading}>
                Connect to Finch
              </Button>
              {error && <ErrorMessage message={error} />}
            </Box>
          ) : (
            <>
              <CompanyCard />
  
              <Grid templateColumns={{ base: "1fr", md: "320px 1fr" }} gap={6}>
                <GridItem>
                  <DirectoryList
                    onSelect={(id) => setSelectedEmployeeId(id)}
                    selectedId={selectedEmployeeId ?? undefined}
                  />
                </GridItem>
                <GridItem>
                  <EmployeeDetails employeeId={selectedEmployeeId ?? undefined} />
                </GridItem>
              </Grid>
            </>
          )}
        </Stack>
      </Container>
    );
  }
