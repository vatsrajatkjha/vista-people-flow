-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE employment_status AS ENUM ('active', 'on_leave', 'terminated', 'pending');
CREATE TYPE job_status AS ENUM ('draft', 'active', 'paused', 'closed', 'filled');
CREATE TYPE application_status AS ENUM ('submitted', 'screening', 'interview', 'assessment', 'offer', 'hired', 'rejected');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE performance_rating AS ENUM ('outstanding', 'exceeds', 'meets', 'below', 'unsatisfactory');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
CREATE TYPE leave_type AS ENUM ('annual', 'sick', 'maternity', 'paternity', 'emergency', 'unpaid');

-- Create profiles table for user authentication
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'employee',
    department TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create departments table
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    head_id UUID REFERENCES public.profiles(id),
    budget DECIMAL(12,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create employees table
CREATE TABLE public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT UNIQUE NOT NULL,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    department_id UUID REFERENCES public.departments(id),
    position TEXT NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    status employment_status DEFAULT 'active',
    manager_id UUID REFERENCES public.employees(id),
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    skills TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create job_postings table
CREATE TABLE public.job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id),
    location TEXT,
    employment_type TEXT DEFAULT 'full-time',
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    requirements TEXT[],
    benefits TEXT[],
    status job_status DEFAULT 'draft',
    priority priority_level DEFAULT 'medium',
    posted_by UUID REFERENCES public.profiles(id),
    posted_date DATE DEFAULT CURRENT_DATE,
    closing_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.job_postings(id) ON DELETE CASCADE,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    status application_status DEFAULT 'submitted',
    experience_years INTEGER DEFAULT 0,
    skills TEXT[],
    notes TEXT,
    applied_date DATE DEFAULT CURRENT_DATE,
    interviewed_by UUID REFERENCES public.profiles(id),
    interview_date TIMESTAMPTZ,
    interview_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create performance_reviews table
CREATE TABLE public.performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.employees(id),
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating performance_rating,
    goals_achieved INTEGER DEFAULT 0,
    goals_total INTEGER DEFAULT 0,
    strengths TEXT[],
    areas_for_improvement TEXT[],
    development_plan TEXT,
    comments TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    leave_type leave_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_requested INTEGER NOT NULL,
    reason TEXT,
    status leave_status DEFAULT 'pending',
    approved_by UUID REFERENCES public.employees(id),
    approved_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payroll table
CREATE TABLE public.payroll (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    base_salary DECIMAL(10,2) NOT NULL,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    overtime_rate DECIMAL(5,2) DEFAULT 1.5,
    bonuses DECIMAL(10,2) DEFAULT 0,
    deductions DECIMAL(10,2) DEFAULT 0,
    gross_pay DECIMAL(10,2) NOT NULL,
    tax_deductions DECIMAL(10,2) DEFAULT 0,
    net_pay DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    processed_by UUID REFERENCES public.profiles(id),
    processed_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create training_programs table
CREATE TABLE public.training_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    duration_hours INTEGER,
    max_participants INTEGER,
    instructor TEXT,
    start_date DATE,
    end_date DATE,
    location TEXT,
    cost DECIMAL(8,2),
    status TEXT DEFAULT 'planned',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create training_enrollments table
CREATE TABLE public.training_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    training_id UUID REFERENCES public.training_programs(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    enrolled_date DATE DEFAULT CURRENT_DATE,
    completion_date DATE,
    grade TEXT,
    feedback TEXT,
    status TEXT DEFAULT 'enrolled',
    UNIQUE(training_id, employee_id)
);

-- Create announcements table
CREATE TABLE public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id),
    priority priority_level DEFAULT 'medium',
    target_departments UUID[],
    is_published BOOLEAN DEFAULT false,
    publish_date TIMESTAMPTZ,
    expire_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create employee_documents table
CREATE TABLE public.employee_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id),
    is_confidential BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "HR can view all profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Employees policies
CREATE POLICY "All authenticated users can view employees" ON public.employees
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "HR can manage employees" ON public.employees
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Departments policies
CREATE POLICY "All authenticated users can view departments" ON public.departments
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "HR can manage departments" ON public.departments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Job postings policies
CREATE POLICY "All users can view active job postings" ON public.job_postings
    FOR SELECT USING (status = 'active' OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role IN ('admin', 'hr')
    ));

CREATE POLICY "HR can manage job postings" ON public.job_postings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Job applications policies
CREATE POLICY "HR can view all applications" ON public.job_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Anyone can submit applications" ON public.job_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "HR can manage applications" ON public.job_applications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Performance reviews policies
CREATE POLICY "Employees can view their own reviews" ON public.performance_reviews
    FOR SELECT USING (
        employee_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        ) OR 
        reviewer_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Managers and HR can manage reviews" ON public.performance_reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
        )
    );

-- Leave requests policies
CREATE POLICY "Employees can view their own leave requests" ON public.leave_requests
    FOR SELECT USING (
        employee_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
        )
    );

CREATE POLICY "Employees can create leave requests" ON public.leave_requests
    FOR INSERT WITH CHECK (
        employee_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        )
    );

CREATE POLICY "Managers and HR can manage leave requests" ON public.leave_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
        )
    );

-- Payroll policies (restricted to HR and admin)
CREATE POLICY "HR can manage payroll" ON public.payroll
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Training programs policies
CREATE POLICY "All authenticated users can view training programs" ON public.training_programs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "HR can manage training programs" ON public.training_programs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Training enrollments policies
CREATE POLICY "Employees can view their enrollments" ON public.training_enrollments
    FOR SELECT USING (
        employee_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

CREATE POLICY "Employees can enroll in training" ON public.training_enrollments
    FOR INSERT WITH CHECK (
        employee_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        )
    );

CREATE POLICY "HR can manage enrollments" ON public.training_enrollments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Announcements policies
CREATE POLICY "All authenticated users can view published announcements" ON public.announcements
    FOR SELECT TO authenticated USING (is_published = true);

CREATE POLICY "HR can manage announcements" ON public.announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Employee documents policies
CREATE POLICY "Employees can view their own documents" ON public.employee_documents
    FOR SELECT USING (
        employee_id IN (
            SELECT id FROM public.employees WHERE profile_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

CREATE POLICY "HR can manage employee documents" ON public.employee_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'hr')
        )
    );

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON public.job_postings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_performance_reviews_updated_at BEFORE UPDATE ON public.performance_reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payroll_updated_at BEFORE UPDATE ON public.payroll
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_programs_updated_at BEFORE UPDATE ON public.training_programs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employee_documents_updated_at BEFORE UPDATE ON public.employee_documents
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for departments
INSERT INTO public.departments (name, description, budget) VALUES
('Engineering', 'Software development and technical operations', 500000.00),
('Human Resources', 'People management and organizational development', 200000.00),
('Marketing', 'Brand management and customer acquisition', 300000.00),
('Sales', 'Revenue generation and client relationships', 400000.00),
('Finance', 'Financial planning and accounting', 250000.00),
('Operations', 'Business operations and logistics', 350000.00);

-- Insert sample job postings
INSERT INTO public.job_postings (title, description, department_id, location, employment_type, salary_min, salary_max, requirements, benefits, status, priority) VALUES
('Senior Frontend Developer', 'Looking for an experienced frontend developer to join our engineering team', 
 (SELECT id FROM public.departments WHERE name = 'Engineering'), 
 'Remote', 'full-time', 80000, 120000, 
 ARRAY['React', 'TypeScript', '5+ years experience', 'Team leadership'], 
 ARRAY['Health insurance', 'Remote work', 'Stock options', 'Professional development'], 
 'active', 'high'),
('UX/UI Designer', 'Creative designer to enhance user experience across our products',
 (SELECT id FROM public.departments WHERE name = 'Engineering'),
 'San Francisco', 'full-time', 70000, 100000,
 ARRAY['Figma', 'Adobe Creative Suite', '3+ years experience', 'Portfolio required'],
 ARRAY['Health insurance', 'Design tools budget', 'Flexible hours'],
 'active', 'medium'),
('Marketing Manager', 'Strategic marketing professional to lead our growth initiatives',
 (SELECT id FROM public.departments WHERE name = 'Marketing'),
 'New York', 'full-time', 75000, 110000,
 ARRAY['Digital marketing', 'Analytics', 'Team management', '5+ years experience'],
 ARRAY['Health insurance', 'Marketing conference budget', 'Bonus potential'],
 'active', 'medium');