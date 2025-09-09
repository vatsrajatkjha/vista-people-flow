import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger_condition: string;
  actions: string[];
  is_active: boolean;
  category: 'onboarding' | 'performance' | 'leave' | 'recruitment' | 'general';
  success_rate: number;
  runs_today: number;
  created_at: string;
  updated_at: string;
}

interface DatabaseWorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger_condition: string;
  actions: any;
  is_active: boolean;
  category: string;
  success_rate: number;
  runs_today: number;
  created_at: string;
  updated_at: string;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  input_data: any;
  output_data: any;
  error_message?: string;
  started_at: string;
  completed_at?: string;
}

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const transformWorkflow = (dbWorkflow: DatabaseWorkflowRule): WorkflowRule => ({
    ...dbWorkflow,
    actions: Array.isArray(dbWorkflow.actions) ? dbWorkflow.actions : JSON.parse(dbWorkflow.actions || '[]'),
    category: dbWorkflow.category as WorkflowRule['category']
  });

  const fetchWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from('workflow_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const transformedData = (data as DatabaseWorkflowRule[])?.map(transformWorkflow) || [];
      setWorkflows(transformedData);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      toast({
        title: "Error",
        description: "Failed to load workflows",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createWorkflow = async (workflow: Omit<WorkflowRule, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('workflow_rules')
        .insert([workflow])
        .select()
        .single();

      if (error) throw error;

      setWorkflows(prev => [transformWorkflow(data as DatabaseWorkflowRule), ...prev]);
      toast({
        title: "Success",
        description: "Workflow created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating workflow:', error);
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateWorkflow = async (id: string, updates: Partial<WorkflowRule>) => {
    try {
      const { data, error } = await supabase
        .from('workflow_rules')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setWorkflows(prev => prev.map(w => w.id === id ? transformWorkflow(data as DatabaseWorkflowRule) : w));
      toast({
        title: "Success",
        description: "Workflow updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating workflow:', error);
      toast({
        title: "Error",
        description: "Failed to update workflow",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteWorkflow = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workflow_rules')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWorkflows(prev => prev.filter(w => w.id !== id));
      toast({
        title: "Success",
        description: "Workflow deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting workflow:', error);
      toast({
        title: "Error",
        description: "Failed to delete workflow",
        variant: "destructive",
      });
      throw error;
    }
  };

  const toggleWorkflow = async (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;

    await updateWorkflow(id, { is_active: !workflow.is_active });
  };

  const executeWorkflow = async (id: string, inputData: any = {}) => {
    try {
      const { data, error } = await supabase
        .from('workflow_executions')
        .insert([{
          workflow_id: id,
          status: 'running',
          input_data: inputData
        }])
        .select()
        .single();

      if (error) throw error;

      // Simulate workflow execution
      setTimeout(async () => {
        await supabase
          .from('workflow_executions')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            output_data: { message: 'Workflow executed successfully' }
          })
          .eq('id', data.id);

        // Update runs_today counter
        const workflow = workflows.find(w => w.id === id);
        if (workflow) {
          await updateWorkflow(id, { runs_today: workflow.runs_today + 1 });
        }
      }, 2000);

      toast({
        title: "Success",
        description: "Workflow execution started",
      });
      return data;
    } catch (error) {
      console.error('Error executing workflow:', error);
      toast({
        title: "Error",
        description: "Failed to execute workflow",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return {
    workflows,
    loading,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    toggleWorkflow,
    executeWorkflow,
    refetch: fetchWorkflows
  };
};