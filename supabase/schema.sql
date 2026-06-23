-- Database SQL Schema for LeetCode Journey Tracker
-- Run this in the Supabase SQL Editor to set up your tables and policies.

-- Create table for storing solved problems
CREATE TABLE IF NOT EXISTS public.solved_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_name TEXT NOT NULL,
    problem_url TEXT,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    notes TEXT DEFAULT '',
    solved_at DATE DEFAULT CURRENT_DATE NOT NULL,
    topic TEXT NOT NULL,
    last_revised_at DATE,
    revision_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS) to protect user data
ALTER TABLE public.solved_logs ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view only their own records
CREATE POLICY "Users can view their own logs" 
    ON public.solved_logs 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy to allow users to insert their own records
CREATE POLICY "Users can create their own logs" 
    ON public.solved_logs 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own records
CREATE POLICY "Users can update their own logs" 
    ON public.solved_logs 
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own records
CREATE POLICY "Users can delete their own logs" 
    ON public.solved_logs 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS solved_logs_user_id_idx ON public.solved_logs(user_id);
CREATE INDEX IF NOT EXISTS solved_logs_solved_at_idx ON public.solved_logs(solved_at);
CREATE INDEX IF NOT EXISTS solved_logs_topic_idx ON public.solved_logs(topic);
