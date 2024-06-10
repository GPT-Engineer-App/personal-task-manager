import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../integrations/supabase/index.js';
import { Container, Heading, Button, VStack, HStack, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [newProject, setNewProject] = useState({ name: '', description: '', status: '' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate = () => {
    createProject.mutate(newProject);
    setNewProject({ name: '', description: '', status: '' });
  };

  return (
    <Container>
      <Heading>Projects</Heading>
      <VStack spacing={4}>
        {projects.map((project) => (
          <HStack key={project.id} spacing={4}>
            <Text>{project.name}</Text>
            <Text>{project.description}</Text>
            <Text>{project.status}</Text>
            <Button onClick={() => updateProject.mutate({ ...project, status: 'Updated' })}>Update</Button>
            <Button onClick={() => deleteProject.mutate(project.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
      <VStack spacing={4} mt={8}>
        <Input
          placeholder="Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <Input
          placeholder="Status"
          value={newProject.status}
          onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
        />
        <Button onClick={handleCreate}>Create Project</Button>
      </VStack>
    </Container>
  );
};

export default Projects;