import { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Select } from '@chakra-ui/react';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, useProjects } from '../integrations/supabase/index.js';

const Todos = () => {
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();
  const [selectedProject, setSelectedProject] = useState('');
  const { data: todos, isLoading: todosLoading, error: todosError } = useTodos(selectedProject);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [newTodoName, setNewTodoName] = useState('');

  if (projectsLoading || todosLoading) return <div>Loading...</div>;
  if (projectsError || todosError) return <div>Error loading data</div>;

  const handleCreateTodo = () => {
    createTodo.mutate({ name: newTodoName, state: 'active', project_id: selectedProject });
    setNewTodoName('');
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Select placeholder="Select Project" onChange={(e) => setSelectedProject(e.target.value)}>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </Select>
        <HStack>
          <Input
            placeholder="New Todo Name"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
          />
          <Button onClick={handleCreateTodo}>Create Todo</Button>
        </HStack>
        {todos && todos.map((todo) => (
          <HStack key={todo.id} spacing={4}>
            <Text>{todo.name}</Text>
            <Button onClick={() => updateTodo.mutate({ ...todo, state: todo.state === 'active' ? 'completed' : 'active' })}>
              {todo.state === 'active' ? 'Complete' : 'Activate'}
            </Button>
            <Button onClick={() => deleteTodo.mutate(todo.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Todos;