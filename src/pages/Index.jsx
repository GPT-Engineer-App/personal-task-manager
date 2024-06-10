import { Container, Text, VStack, Box, Heading, Button, List, ListItem, Checkbox, Spinner } from "@chakra-ui/react";
import { useProjects, useTodos, useCreateProject, useCreateTodo, useUpdateProject, useUpdateTodo, useDeleteProject, useDeleteTodo } from '../integrations/supabase/index.js';
import { useState } from 'react';

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { data: todos, isLoading: todosLoading } = useTodos(selectedProjectId);

  const createProjectMutation = useCreateProject();
  const createTodoMutation = useCreateTodo();
  const updateProjectMutation = useUpdateProject();
  const updateTodoMutation = useUpdateTodo();
  const deleteProjectMutation = useDeleteProject();
  const deleteTodoMutation = useDeleteTodo();

  // Function to handle the creation of a new project
  const handleCreateProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
      createProjectMutation.mutate({ name: projectName, description: '' });
    }
  };

  const handleCreateTodo = () => {
    const todoTitle = prompt('Enter todo title:');
    if (todoTitle && selectedProjectId) {
      createTodoMutation.mutate({ title: todoTitle, project_id: selectedProjectId, is_complete: false });
    }
  };

  const handleToggleTodo = (todo) => {
    updateTodoMutation.mutate({ ...todo, is_complete: !todo.is_complete });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  const handleDeleteTodo = (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodoMutation.mutate(todoId);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading>Projects</Heading>
        {projectsLoading ? <Spinner /> : (
          <List spacing={3} width="100%">
            {projects?.map(project => (
              <ListItem key={project.id} p={2} borderWidth={1} borderRadius="md">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontSize="xl" onClick={() => setSelectedProjectId(project.id)} cursor="pointer">{project.name}</Text>
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <Button colorScheme="teal" onClick={handleCreateProject}>Create Project</Button>

        {selectedProjectId && (
          <>
            <Heading size="md" mt={8}>Todos</Heading>
            {todosLoading ? <Spinner /> : (
              <List spacing={3} width="100%">
                {todos?.map(todo => (
                  <ListItem key={todo.id} p={2} borderWidth={1} borderRadius="md">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Checkbox isChecked={todo.is_complete} onChange={() => handleToggleTodo(todo)}>{todo.title}</Checkbox>
                      <Button colorScheme="red" size="sm" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
            <Button colorScheme="teal" onClick={handleCreateTodo}>Create Todo</Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;