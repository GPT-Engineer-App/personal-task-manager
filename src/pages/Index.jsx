import { Container, Text, VStack, Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useProjects, useAddProject, useUpdateProject, useDeleteProject, useTodos, useAddTodo, useUpdateTodo, useDeleteTodo } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { data: todos, isLoading: todosLoading } = useTodos(selectedProjectId);
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleAddProject = () => {
    const name = prompt("Enter project name:");
    const description = prompt("Enter project description:");
    const state = prompt("Enter project state:");
    if (name && description && state) {
      addProject.mutate({ name, description, state });
    }
  };

  const handleAddTodo = () => {
    const title = prompt("Enter todo title:");
    const state = prompt("Enter todo state:");
    if (title && state && selectedProjectId) {
      addTodo.mutate({ title, state, project_id: selectedProjectId });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Project List</Heading>
        <Button onClick={handleAddProject}>Add Project</Button>
        {projectsLoading ? (
          <Text>Loading projects...</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>State</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr key={project.id}>
                  <Td>{project.name}</Td>
                  <Td>{project.description}</Td>
                  <Td>{project.state}</Td>
                  <Td>
                    <Button onClick={() => setSelectedProjectId(project.id)}>View Todos</Button>
                    <Button onClick={() => updateProject.mutate({ ...project, state: prompt("Enter new state:", project.state) })}>Update</Button>
                    <Button onClick={() => deleteProject.mutate(project.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {selectedProjectId && (
          <>
            <Heading as="h2" size="lg">Todos</Heading>
            <Button onClick={handleAddTodo}>Add Todo</Button>
            {todosLoading ? (
              <Text>Loading todos...</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>State</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todos.map((todo) => (
                    <Tr key={todo.id}>
                      <Td>{todo.title}</Td>
                      <Td>{todo.state}</Td>
                      <Td>
                        <Button onClick={() => updateTodo.mutate({ ...todo, state: prompt("Enter new state:", todo.state) })}>Update</Button>
                        <Button onClick={() => deleteTodo.mutate(todo.id)}>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;