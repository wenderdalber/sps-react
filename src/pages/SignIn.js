import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, FormControl, FormLabel,
  Heading, Input, Text, VStack, useToast,
} from "@chakra-ui/react";
import api from "../services/api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  async function handleLogin() {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/users");
    } catch {
      toast({
        title: "Credenciais inválidas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} rounded="lg" shadow="md" w="full" maxW="400px">
        <VStack spacing={6}>
          <Heading size="lg">SPS Group</Heading>

          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleLogin}
            isLoading={loading}
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default SignIn;