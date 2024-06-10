import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '../integrations/supabase/index.js';
import { Container, Heading, VStack, Text, Button, Input, HStack } from '@chakra-ui/react';
import { useState } from 'react';

const fetchProjects = async (supabase) => {
  const { data, error } = await supabase.from('Projects').select('*');
  if (error) throw new Error(error.message);
  return data;
};

const createProject = async ({ supabase, name }) => {
  const { data, error } = await supabase.from('Projects').insert([{ name, state: 'active' }]);
  if (error) throw new Error(error.message);
  return data;
};

const Projects = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const [newProjectName, setNewProjectName] = useState('');

  const { data: projects, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(supabase),
  });

  const mutation = useMutation({
    mutationFn: (name) => createProject({ supabase, name }),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });

  const handleCreateProject = () => {
    mutation.mutate(newProjectName);
    setNewProjectName('');
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Container>
      <Heading>Projects</Heading>
      <VStack spacing={4} align="stretch">
        {projects.map((project) => (
          <HStack key={project.id} justify="space-between">
            <Text>{project.name}</Text>
            <Text>{project.state}</Text>
          </HStack>
        ))}
      </VStack>
      <HStack mt={4}>
        <Input
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <Button onClick={handleCreateProject}>Add Project</Button>
      </HStack>
    </Container>
  );
};

export default Projects;