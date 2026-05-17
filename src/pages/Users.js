import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, FormControl, FormLabel, Heading, HStack,
  Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Table,
  Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, VStack,
} from "@chakra-ui/react";
import UserService from "../services/UserService";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", type: "user", password: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await UserService.getAll();
      setUsers(data);
    } catch {
      toast({ title: "Erro ao carregar usuários", status: "error", duration: 3000 });
    }
  }

  async function handleCreate() {
    try {
      await UserService.create(form);
      toast({ title: "Usuário criado!", status: "success", duration: 3000 });
      setForm({ name: "", email: "", type: "user", password: "" });
      onClose();
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao criar usuário";
      toast({ title: msg, status: "error", duration: 3000 });
    }
  }

  async function handleDelete(id) {
    try {
      await UserService.remove(id);
      toast({ title: "Usuário removido", status: "info", duration: 3000 });
      fetchUsers();
    } catch {
      toast({ title: "Erro ao remover usuário", status: "error", duration: 3000 });
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Usuários</Heading>
        <HStack>
          <Button colorScheme="blue" onClick={onOpen}>Novo Usuário</Button>
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        </HStack>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Tipo</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.type}</Td>
              <Td>
                <HStack>
                  <Button size="sm" onClick={() => navigate(`/users/${user.id}`)}>
                    Editar
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(user.id)}>
                    Excluir
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal de cadastro */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                <FormLabel>Senha</FormLabel>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
            <Button colorScheme="blue" onClick={handleCreate}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Users;