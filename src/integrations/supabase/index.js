import { createClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
  );

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
 * @property {string} description
 * @property {string} status
 * @property {string} created_at
 */

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} project_id
 * @property {string} title
 * @property {string} description
 * @property {string} status
 * @property {string} created_at
 */

// Hooks for Projects
export const useProjects = () => {
  const supabase = useSupabase();
  return useQuery(['projects'], async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw new Error(error.message);
    return data;
  });
};

export const useCreateProject = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation(
    async (newProject) => {
      const { data, error } = await supabase.from('projects').insert(newProject);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      },
    }
  );
};

export const useUpdateProject = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedProject) => {
      const { data, error } = await supabase.from('projects').update(updatedProject).eq('id', updatedProject.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      },
    }
  );
};

export const useDeleteProject = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation(
    async (projectId) => {
      const { data, error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      },
    }
  );
};

// Hooks for Todos
export const useTodos = (projectId) => {
  const supabase = useSupabase();
  return useQuery(['todos', projectId], async () => {
    const { data, error } = await supabase.from('todos').select('*').eq('project_id', projectId);
    if (error) throw new Error(error.message);
    return data;
  });
};

export const useCreateTodo = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation(
    async (newTodo) => {
      const { data, error } = await supabase.from('todos').insert(newTodo);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['todos', variables.project_id]);
      },
    }
  );
};

export const useUpdateTodo = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedTodo) => {
      const { data, error } = await supabase.from('todos').update(updatedTodo).eq('id', updatedTodo.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['todos', variables.project_id]);
      },
    }
  );
};

export const useDeleteTodo = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  return useMutation(
    async (todoId) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', todoId);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['todos', variables.project_id]);
      },
    }
  );
};