-- Create workflow_rules table for workflow automation
CREATE TABLE public.workflow_rules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  trigger_condition text NOT NULL,
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  category text NOT NULL DEFAULT 'general',
  success_rate numeric DEFAULT 0,
  runs_today integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create workflow_executions table for tracking workflow runs
CREATE TABLE public.workflow_executions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id uuid NOT NULL REFERENCES public.workflow_rules(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  input_data jsonb DEFAULT '{}'::jsonb,
  output_data jsonb DEFAULT '{}'::jsonb,
  error_message text,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create candidates table for AI recruitment
CREATE TABLE public.candidates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  position text NOT NULL,
  location text,
  experience_years integer DEFAULT 0,
  education text,
  skills text[] DEFAULT '{}',
  match_score integer DEFAULT 0,
  ai_insights text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'new',
  salary_expectation text,
  availability text,
  resume_url text,
  cover_letter text,
  notes text,
  job_posting_id uuid REFERENCES public.job_postings(id),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create candidate_interviews table
CREATE TABLE public.candidate_interviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id uuid NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  interviewer_id uuid REFERENCES public.employees(id),
  scheduled_at timestamp with time zone,
  duration_minutes integer DEFAULT 60,
  interview_type text DEFAULT 'in-person',
  location text,
  notes text,
  rating integer,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.workflow_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_interviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for workflow_rules
CREATE POLICY "HR can manage workflow rules" 
ON public.workflow_rules 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'hr'])
));

CREATE POLICY "All authenticated users can view workflow rules" 
ON public.workflow_rules 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create RLS policies for workflow_executions
CREATE POLICY "HR can manage workflow executions" 
ON public.workflow_executions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'hr'])
));

-- Create RLS policies for candidates
CREATE POLICY "HR can manage candidates" 
ON public.candidates 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'hr'])
));

CREATE POLICY "Anyone can submit candidate applications" 
ON public.candidates 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for candidate_interviews
CREATE POLICY "HR can manage candidate interviews" 
ON public.candidate_interviews 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'hr'])
));

CREATE POLICY "Interviewers can view their interviews" 
ON public.candidate_interviews 
FOR SELECT 
USING (interviewer_id IN (
  SELECT id FROM employees 
  WHERE profile_id = auth.uid()
));

-- Create triggers for updated_at
CREATE TRIGGER update_workflow_rules_updated_at
  BEFORE UPDATE ON public.workflow_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workflow_executions_updated_at
  BEFORE UPDATE ON public.workflow_executions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_candidate_interviews_updated_at
  BEFORE UPDATE ON public.candidate_interviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample workflow rules
INSERT INTO public.workflow_rules (name, description, trigger_condition, actions, category, success_rate, runs_today) VALUES
('New Employee Onboarding', 'Automatically create accounts, send welcome emails, and schedule orientation', 'When new employee is added', '["Create system accounts", "Send welcome email package", "Schedule orientation meeting", "Assign buddy/mentor", "Create training checklist"]', 'onboarding', 98, 3),
('Performance Review Reminders', 'Send automated reminders for upcoming performance reviews', 'When review date approaches (7 days)', '["Send reminder to manager", "Send preparation email to employee", "Schedule review meeting", "Create review template"]', 'performance', 94, 12),
('Leave Request Processing', 'Auto-approve certain leave requests based on criteria', 'When leave request is submitted', '["Check leave balance", "Verify manager approval", "Update calendar", "Notify team members", "Generate coverage plan"]', 'leave', 91, 8),
('Interview Scheduling', 'Automatically schedule interviews and send invitations', 'When candidate passes initial screening', '["Find available interview slots", "Send calendar invites", "Prepare interview materials", "Send candidate confirmation", "Set up video call link"]', 'recruitment', 87, 0),
('Birthday & Anniversary Celebrations', 'Send congratulatory messages and celebration reminders', 'On employee birthday or work anniversary', '["Send birthday/anniversary email", "Notify team via Slack", "Add celebration to calendar", "Trigger gift/reward process"]', 'general', 100, 2);

-- Insert sample candidates
INSERT INTO public.candidates (name, email, phone, position, location, experience_years, education, skills, match_score, ai_insights, status, salary_expectation, availability) VALUES
('Alex Thompson', 'alex.thompson@email.com', '+1 (555) 123-4567', 'Senior React Developer', 'San Francisco, CA', 5, 'BS Computer Science - Stanford', '{"React", "TypeScript", "Node.js", "GraphQL", "AWS"}', 95, '{"Strong technical background with React ecosystem", "Previous experience with similar company size", "Cultural fit score: 92%"}', 'new', '$120k - $140k', 'Available in 2 weeks'),
('Maria Rodriguez', 'maria.rodriguez@email.com', '+1 (555) 234-5678', 'UX Designer', 'Austin, TX', 4, 'MFA Design - RISD', '{"Figma", "User Research", "Prototyping", "Design Systems"}', 88, '{"Excellent portfolio with B2B SaaS experience", "Strong user research methodology", "Remote work experience: 3+ years"}', 'screening', '$85k - $100k', 'Available immediately'),
('James Chen', 'james.chen@email.com', '+1 (555) 345-6789', 'DevOps Engineer', 'Seattle, WA', 6, 'MS Software Engineering - CMU', '{"Kubernetes", "Docker", "Terraform", "AWS", "CI/CD"}', 91, '{"Proven experience scaling infrastructure", "Strong automation and security practices", "Leadership potential identified"}', 'interview', '$130k - $150k', 'Available in 1 month');