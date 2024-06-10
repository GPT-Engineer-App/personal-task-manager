import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../integrations/supabase/index.js';
import { Container, Heading, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Todos = ({ projectId }) => {
  const { data: todos, isLoading, error } = useTodos(projectId);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [newTodo, setNewTodo] = useState({ title: '', description: '', status: '', project_id: projectId });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate = () => {
    createTodo.mutate(newTodo);
    setNewTodo({ title: '', description: '', status: '', project_id: projectId });
  };

  return (
    <Container>
      <Heading>Todos</Heading>
      <VStack spacing={4}>
        {todos.map((todo) => (
          <HStack key={todo.id} spacing={4}>
            <Text>{todo.title}</Text>
            <Text>{todo.description}</Text>
            <Text>{todo.status}</Text>
            <Button onClick={() => updateTodo.mutate({ ...todo, status: 'Updated' })}>Update</Button>
            <Button onClick={() => deleteTodo.mutate(todo.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
      <VStack spacing={4} mt={8}>
        <Input
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <Input
          placeholder="Status"
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
        />
        <Button onClick={handleCreate}>Create Todo</Button>
      </VStack>
    </Container>
  );
};

export default Todos;