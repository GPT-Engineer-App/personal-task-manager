import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Types
 * 
 * Projects Table:
 * - id: integer
 * - name: text
 * - description: text
 * - created_at: timestamp
 * 
 * Todos Table:
 * - id: integer
 * - project_id: integer (references Projects.id)
 * - title: text
 * - is_complete: boolean
 * - created_at: timestamp
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Fetch all projects from the database
 * 
 * @returns {Array} List of projects
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Fetch all todos for a project
export const useTodos = (projectId) => {
  return useQuery({
    queryKey: ['todos', projectId],
    queryFn: async () => {
      const { data, error } = await supabase.from('todos').select('*').eq('project_id', projectId);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!projectId,
  });
};

// Create a new project
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProject) => {
      const { data, error } = await supabase.from('projects').insert(newProject);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTodo) => {
      const { data, error } = await supabase.from('todos').insert(newTodo);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['todos', variables.project_id]);
    },
  });
};

// Update a project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedProject) => {
      const { data, error } = await supabase.from('projects').update(updatedProject).eq('id', updatedProject.id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

// Update a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTodo) => {
      const { data, error } = await supabase.from('todos').update(updatedTodo).eq('id', updatedTodo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['todos', variables.project_id]);
    },
  });
};

// Delete a project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId) => {
      const { data, error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todoId) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', todoId);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['todos', variables.project_id]);
    },
  });
};