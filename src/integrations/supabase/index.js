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

// EXAMPLE TYPES SECTION
// DO NOT USE TYPESCRIPT

Foo // table: foos
    id: number
    title: string

Bar // table: bars
    id: number
    foo_id: number // foreign key to Foo

Task // table: tasks
    id: number
    title: string
    description: string
    status: string
    created_at: string

User // table: users
    id: number
    email: string
    password: string
    created_at: string

*/

// Hooks for Foo
export const useFoo = () => useQuery({
    queryKey: ['foo'],
    queryFn: () => fromSupabase(supabase.from('foo').select('*')),
});

export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo) => fromSupabase(supabase.from('foo').insert([{ title: newFoo.title }])),
        onSuccess: () => {
            queryClient.invalidateQueries('foo');
        },
    });
};

// Hooks for Bar
export const useBar = () => useQuery({
    queryKey: ['bar'],
    queryFn: () => fromSupabase(supabase.from('bar').select('*')),
});

export const useAddBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBar) => fromSupabase(supabase.from('bar').insert([{ foo_id: newBar.foo_id }])),
        onSuccess: () => {
            queryClient.invalidateQueries('bar');
        },
    });
};

// Hooks for Task
export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([{ title: newTask.title, description: newTask.description, status: newTask.status }])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTask) => fromSupabase(supabase.from('tasks').update({ title: updatedTask.title, description: updatedTask.description, status: updatedTask.status }).eq('id', updatedTask.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId) => fromSupabase(supabase.from('tasks').delete().eq('id', taskId)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

// Hooks for User
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([{ email: newUser.email, password: newUser.password }])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('users').update({ email: updatedUser.email, password: updatedUser.password }).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('users').delete().eq('id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};