import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Project // table: projects
    id: number
    name: string
    description: string
    state: string

Todo // table: todos
    id: number
    project_id: number // foreign key to Project
    title: string
    state: string

*/

// Hooks for Project
export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('projects').select('*')),
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProject) => fromSupabase(supabase.from('projects').update(updatedProject).eq('id', updatedProject.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectId) => fromSupabase(supabase.from('projects').delete().eq('id', projectId)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

// Hooks for Todo
export const useTodos = (projectId) => useQuery({
    queryKey: ['todos', projectId],
    queryFn: () => fromSupabase(supabase.from('todos').select('*').eq('project_id', projectId)),
});

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTodo) => fromSupabase(supabase.from('todos').insert([newTodo])),
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTodo) => fromSupabase(supabase.from('todos').update(updatedTodo).eq('id', updatedTodo.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todoId) => fromSupabase(supabase.from('todos').delete().eq('id', todoId)),
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
};