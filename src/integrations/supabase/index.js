import { createClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <SupabaseContext.Provider value={supabase}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SupabaseContext.Provider>
  );
};

SupabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};

/**
 * Types for Supabase Tables
 * 
 * Projects:
 * - id: integer
 * - name: string
 * - state: string
 * 
 * Todos:
 * - id: integer
 * - project_id: integer
 * - name: string
 * - state: string
 */