
-- Create ideas table with proper structure
CREATE TABLE public.ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  idea_text TEXT NOT NULL,
  model_output TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own ideas
CREATE POLICY "Users can view their own ideas" 
  ON public.ideas 
  FOR SELECT 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy for users to insert their own ideas
CREATE POLICY "Users can create their own ideas" 
  ON public.ideas 
  FOR INSERT 
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy for users to update their own ideas
CREATE POLICY "Users can update their own ideas" 
  ON public.ideas 
  FOR UPDATE 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy for users to delete their own ideas
CREATE POLICY "Users can delete their own ideas" 
  ON public.ideas 
  FOR DELETE 
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'email');

-- Migrate existing data from Idea table to ideas table (note the capital I)
INSERT INTO public.ideas (user_id, idea_text, model_output, created_at)
SELECT user_id, idea_text, model_output, created_at 
FROM public."Idea";

-- Drop the old Idea table
DROP TABLE public."Idea";
