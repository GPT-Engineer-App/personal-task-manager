import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '../integrations/supabase/index.js';
import { Container, Heading, VStack, Text, Button, Input, HStack, Select } from '@chakra-ui/react';
import { useState } from 'react';

const fetchTodos = async (supabase) => {
  const { data, error } = await supabase.from('Todos').select('*');
  if (error) throw new Error(error.message);
  return data;
};

const createTodo = async ({ supabase, projectId, name }) => {
  const { data, error } = await supabase.from('Todos').insert([{ project_id: projectId, name, state: 'active' }]);
  if (error) throw new Error(error.message);
  return data;
};

const Todos = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const [newTodoName, setNewTodoName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const { data: todos, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(supabase),
  });

  const mutation = useMutation({
    mutationFn: ({ projectId, name }) => createTodo({ supabase, projectId, name }),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleCreateTodo = () => {
    mutation.mutate({ projectId: selectedProject, name: newTodoName });
    setNewTodoName('');
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Container>
      <Heading>Todos</Heading>
      <VStack spacing={4} align="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id} justify="space-between">
            <Text>{todo.name}</Text>
            <Text>{todo.state}</Text>
          </HStack>
        ))}
      </VStack>
      <HStack mt={4}>
        <Select placeholder="Select Project" onChange={(e) => setSelectedProject(e.target.value)}>
          {/* Assuming projects are fetched and stored in state */}
          {/* Replace with actual project options */}
          <option value="1">Project 1</option>
          <option value="2">Project 2</option>
        </Select>
        <Input
          placeholder="New Todo Name"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <Button onClick={handleCreateTodo}>Add Todo</Button>
      </HStack>
    </Container>
  );
};

export default Todos;