import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  location?: string;
  employment_type: string;
  salary_min?: number;
  salary_max?: number;
  requirements?: string[];
  benefits?: string[];
  status: 'draft' | 'active' | 'paused' | 'closed' | 'filled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  posted_date: string;
  closing_date?: string;
  department?: {
    id: string;
    name: string;
  };
  application_count?: number;
}

export const useJobPostings = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobPostings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select(`
          *,
          department:departments(id, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get application count for each job posting
      const jobsWithCount = await Promise.all(
        (data || []).map(async (job) => {
          const { count } = await supabase
            .from('job_applications')
            .select('*', { count: 'exact', head: true })
            .eq('job_id', job.id);
          
          return {
            ...job,
            application_count: count || 0,
          };
        })
      );

      setJobPostings(jobsWithCount);
    } catch (error: any) {
      toast({
        title: "Error fetching job postings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createJobPosting = async (jobData: Omit<JobPosting, 'id' | 'department' | 'application_count'> & { department_id?: string; posted_by?: string }) => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .insert([jobData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Job posting created",
        description: "New job posting has been added successfully.",
      });

      fetchJobPostings();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating job posting",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateJobPosting = async (id: string, jobData: Partial<JobPosting>) => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .update(jobData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Job posting updated",
        description: "Job posting has been updated successfully.",
      });

      fetchJobPostings();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error updating job posting",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const deleteJobPosting = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Job posting deleted",
        description: "Job posting has been removed successfully.",
      });

      fetchJobPostings();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error deleting job posting",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  return {
    jobPostings,
    loading,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting,
    refetch: fetchJobPostings,
  };
};