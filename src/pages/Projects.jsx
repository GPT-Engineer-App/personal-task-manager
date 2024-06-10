import { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../integrations/supabase/index.js';

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [newProjectName, setNewProjectName] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  const handleCreateProject = () => {
    createProject.mutate({ name: newProjectName, state: 'active' });
    setNewProjectName('');
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="New Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <Button onClick={handleCreateProject}>Create Project</Button>
        </HStack>
        {projects.map((project) => (
          <HStack key={project.id} spacing={4}>
            <Text>{project.name}</Text>
            <Button onClick={() => updateProject.mutate({ ...project, state: project.state === 'active' ? 'completed' : 'active' })}>
              {project.state === 'active' ? 'Complete' : 'Activate'}
            </Button>
            <Button onClick={() => deleteProject.mutate(project.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Projects;