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
    state: string

Todo // table: todos
    id: number
    project_id: number // foreign key to Project
    description: string
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
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([{ name: newProject.name, state: newProject.state }])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProject) => fromSupabase(supabase.from('projects').update({ name: updatedProject.name, state: updatedProject.state }).eq('id', updatedProject.id)),
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
export const useTodos = () => useQuery({
    queryKey: ['todos'],
    queryFn: () => fromSupabase(supabase.from('todos').select('*')),
});

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTodo) => fromSupabase(supabase.from('todos').insert([{ project_id: newTodo.project_id, description: newTodo.description, state: newTodo.state }])),
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTodo) => fromSupabase(supabase.from('todos').update({ project_id: updatedTodo.project_id, description: updatedTodo.description, state: updatedTodo.state }).eq('id', updatedTodo.id)),
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