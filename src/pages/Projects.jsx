import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../integrations/supabase/index.js';
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectState, setNewProjectState] = useState('active');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreateProject = () => {
    createProject.mutate({ name: newProjectName, state: newProjectState });
    setNewProjectName('');
    setNewProjectState('active');
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>State</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <Tr key={project.id}>
              <Td>{project.name}</Td>
              <Td>{project.state}</Td>
              <Td>
                <Button onClick={() => updateProject.mutate({ ...project, state: project.state === 'active' ? 'completed' : 'active' })}>
                  Toggle State
                </Button>
                <Button onClick={() => deleteProject.mutate(project.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Input
        placeholder="New Project Name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <Select value={newProjectState} onChange={(e) => setNewProjectState(e.target.value)}>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </Select>
      <Button onClick={handleCreateProject}>Create Project</Button>
    </Container>
  );
};

export default Projects;