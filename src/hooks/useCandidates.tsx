import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  location?: string;
  experience_years: number;
  education?: string;
  skills: string[];
  match_score: number;
  ai_insights: string[];
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  salary_expectation?: string;
  availability?: string;
  resume_url?: string;
  cover_letter?: string;
  notes?: string;
  job_posting_id?: string;
  created_at: string;
  updated_at: string;
}

interface DatabaseCandidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  location?: string;
  experience_years: number;
  education?: string;
  skills: string[];
  match_score: number;
  ai_insights: string[];
  status: string;
  salary_expectation?: string;
  availability?: string;
  resume_url?: string;
  cover_letter?: string;
  notes?: string;
  job_posting_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateInterview {
  id: string;
  candidate_id: string;
  interviewer_id?: string;
  scheduled_at?: string;
  duration_minutes: number;
  interview_type: string;
  location?: string;
  notes?: string;
  rating?: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const transformCandidate = (dbCandidate: DatabaseCandidate): Candidate => ({
    ...dbCandidate,
    status: dbCandidate.status as Candidate['status']
  });

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const transformedData = (data as DatabaseCandidate[])?.map(transformCandidate) || [];
      setCandidates(transformedData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: "Failed to load candidates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCandidate = async (candidate: Omit<Candidate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .insert([candidate])
        .select()
        .single();

      if (error) throw error;

      setCandidates(prev => [transformCandidate(data as DatabaseCandidate), ...prev]);
      toast({
        title: "Success",
        description: "Candidate added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating candidate:', error);
      toast({
        title: "Error",
        description: "Failed to add candidate",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCandidates(prev => prev.map(c => c.id === id ? transformCandidate(data as DatabaseCandidate) : c));
      toast({
        title: "Success",
        description: "Candidate updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating candidate:', error);
      toast({
        title: "Error",
        description: "Failed to update candidate",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCandidates(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Candidate deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting candidate:', error);
      toast({
        title: "Error",
        description: "Failed to delete candidate",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCandidateStatus = async (id: string, status: Candidate['status']) => {
    await updateCandidate(id, { status });
  };

  const scheduleInterview = async (candidateId: string, interviewData: Omit<CandidateInterview, 'id' | 'candidate_id'>) => {
    try {
      const { data, error } = await supabase
        .from('candidate_interviews')
        .insert([{ ...interviewData, candidate_id: candidateId }])
        .select()
        .single();

      if (error) throw error;

      // Update candidate status to interview
      await updateCandidateStatus(candidateId, 'interview');

      toast({
        title: "Success",
        description: "Interview scheduled successfully",
      });
      return data;
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to schedule interview",
        variant: "destructive",
      });
      throw error;
    }
  };

  const generateAIInsights = async (candidateId: string) => {
    try {
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate) return;

      // Simulate AI analysis
      const insights = [
        `${candidate.experience_years}+ years experience in ${candidate.position}`,
        `Strong skill match: ${candidate.skills.slice(0, 3).join(', ')}`,
        `Location advantage: ${candidate.location}`,
        `Education background: ${candidate.education}`,
        `Availability: ${candidate.availability}`
      ].filter(insight => !insight.includes('undefined'));

      await updateCandidate(candidateId, { 
        ai_insights: insights,
        match_score: Math.min(candidate.match_score + 5, 100)
      });

      toast({
        title: "Success",
        description: "AI insights generated",
      });
    } catch (error) {
      console.error('Error generating AI insights:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI insights",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return {
    candidates,
    loading,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    updateCandidateStatus,
    scheduleInterview,
    generateAIInsights,
    refetch: fetchCandidates
  };
};