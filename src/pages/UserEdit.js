import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, FormControl, FormLabel,
  Heading, HStack, Input, Select, useToast, VStack,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import UserService from "../services/UserService";

// Loader busca o usuário real da API pelo ID da URL
export async function userLoader({ params }) {
  const { data } = await UserService.getById(params.userId);
  return { user: data };
}

function UserEdit() {
  const { user } = useLoaderData();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    type: user.type,
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSave() {
    try {
      await UserService.update(user.id, form);
      toast({ title: "Usuário atualizado!", status: "success", duration: 3000 });
      navigate("/users");
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao atualizar";
      toast({ title: msg, status: "error", duration: 3000 });
    }
  }

  return (
    <Box p={8} maxW="500px">
      <Heading size="lg" mb={6}>Editar Usuário</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Nova senha (opcional)</FormLabel>
          <Input
            type="password"
            placeholder="Deixe em branco para manter"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </FormControl>
        <HStack w="full" justify="flex-end">
          <Button variant="outline" onClick={() => navigate("/users")}>Cancelar</Button>
          <Button colorScheme="blue" onClick={handleSave}>Salvar</Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default UserEdit;