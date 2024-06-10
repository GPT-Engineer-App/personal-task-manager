import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../integrations/supabase/index.js';
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Todos = () => {
  const { projectId } = useParams();
  const { data: todos, isLoading, error } = useTodos(projectId);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoState, setNewTodoState] = useState('pending');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreateTodo = () => {
    createTodo.mutate({ project_id: projectId, description: newTodoDescription, state: newTodoState });
    setNewTodoDescription('');
    setNewTodoState('pending');
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>State</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todos.map((todo) => (
            <Tr key={todo.id}>
              <Td>{todo.description}</Td>
              <Td>{todo.state}</Td>
              <Td>
                <Button onClick={() => updateTodo.mutate({ ...todo, state: todo.state === 'pending' ? 'completed' : 'pending' })}>
                  Toggle State
                </Button>
                <Button onClick={() => deleteTodo.mutate(todo.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Input
        placeholder="New Todo Description"
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
      />
      <Select value={newTodoState} onChange={(e) => setNewTodoState(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </Select>
      <Button onClick={handleCreateTodo}>Create Todo</Button>
    </Container>
  );
};

export default Todos;