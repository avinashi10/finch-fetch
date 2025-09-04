"use client";

// LIBRARY IMPORTS
import { Container, Heading, Stack } from "@chakra-ui/react";

// LOCAL IMPORTS
import CompanyCard from "../components/CompanyCard";
import DirectoryList from "../components/DirectoryList";
import EmployeeDetails from "../components/EmployeeDetails";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  return (
    <Container maxW="container.lg" py={8}>
      <Stack padding={8}>
        <Heading as="h1" size="lg">
          Finch Sandbox Demo
        </Heading>

        <CompanyCard />
        <DirectoryList />
        <EmployeeDetails />
        <ErrorMessage message="Example error message" />
      </Stack>
    </Container>
  );
}
