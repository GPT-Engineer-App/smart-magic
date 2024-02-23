import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Button, Input, FormControl, FormLabel, useToast, Text, Heading, Container } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [healthCheck, setHealthCheck] = useState("Checking...");
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-staging-u0hj.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 204) {
        toast({ title: "Signup successful.", status: "success" });
      } else {
        const errorData = await response.json();
        toast({ title: "Signup failed.", description: errorData.error, status: "error" });
      }
    } catch (error) {
      toast({ title: "Signup failed.", description: error.message, status: "error" });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-staging-u0hj.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        toast({ title: "Login successful.", status: "success" });
      } else {
        const errorData = await response.json();
        toast({ title: "Login failed.", description: errorData.error, status: "error" });
      }
    } catch (error) {
      toast({ title: "Login failed.", description: error.message, status: "error" });
    }
  };

  const handleRandomNumber = async () => {
    try {
      const response = await fetch("https://backengine-staging-u0hj.fly.dev/randomNumber");
      if (response.ok) {
        const number = await response.text();
        setRandomNumber(number);
      } else {
        toast({ title: "Failed to fetch random number.", status: "error" });
      }
    } catch (error) {
      toast({ title: "Failed to fetch random number.", description: error.message, status: "error" });
    }
  };

  const handleHealthCheck = async () => {
    try {
      const response = await fetch("https://backengine-staging-u0hj.fly.dev/healthcheck");
      if (response.ok) {
        setHealthCheck("Healthy");
      } else {
        setHealthCheck("Unhealthy");
      }
    } catch (error) {
      setHealthCheck("Unhealthy");
    }
  };

  return (
    <ChakraProvider>
      <Container>
        <VStack spacing={4} align="stretch" mt={10}>
          <Heading>Interactive API Application</Heading>

          <Button colorScheme="blue" onClick={handleRandomNumber}>
            Fetch Random Number
          </Button>
          {randomNumber && <Text>Random Number: {randomNumber}</Text>}

          <Button colorScheme="green" onClick={handleHealthCheck}>
            Check Health
          </Button>
          <Text>Health Check: {healthCheck}</Text>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <Button colorScheme="teal" onClick={handleSignup}>
            Sign Up
          </Button>

          <Button colorScheme="purple" onClick={handleLogin}>
            Log In
          </Button>
          {accessToken && <Text>Access Token: {accessToken}</Text>}
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
