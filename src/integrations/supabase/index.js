import { createClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};

// Types based on openapi.json
/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} state
 */

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} project_id
 * @property {string} name
 * @property {string} state
 */

// Hooks for Projects
export const useProjects = () => {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateProject = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProject) => {
      const { data, error } = await supabase.from('projects').insert(newProject);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

export const useUpdateProject = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedProject) => {
      const { data, error } = await supabase.from('projects').update(updatedProject).eq('id', updatedProject.id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

export const useDeleteProject = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId) => {
      const { data, error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });
};

// Hooks for Todos
export const useTodos = (projectId) => {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ['todos', projectId],
    queryFn: async () => {
      const { data, error } = await supabase.from('todos').select('*').eq('project_id', projectId);
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateTodo = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTodo) => {
      const { data, error } = await supabase.from('todos').insert(newTodo);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useUpdateTodo = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTodo) => {
      const { data, error } = await supabase.from('todos').update(updatedTodo).eq('id', updatedTodo.id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useDeleteTodo = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todoId) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', todoId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};