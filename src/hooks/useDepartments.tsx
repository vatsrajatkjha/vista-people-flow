import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Department {
  id: string;
  name: string;
  description?: string;
  budget?: number;
  head_id?: string;
  head?: {
    id: string;
    full_name: string;
  };
  employee_count?: number;
}

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select(`
          *,
          head:profiles(id, full_name)
        `)
        .order('name');

      if (error) throw error;

      // Get employee count for each department
      const departmentsWithCount = await Promise.all(
        (data || []).map(async (dept) => {
          const { count } = await supabase
            .from('employees')
            .select('*', { count: 'exact', head: true })
            .eq('department_id', dept.id);
          
          return {
            ...dept,
            employee_count: count || 0,
          };
        })
      );

      setDepartments(departmentsWithCount);
    } catch (error: any) {
      toast({
        title: "Error fetching departments",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async (departmentData: Omit<Department, 'id' | 'head' | 'employee_count'>) => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .insert([departmentData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Department created",
        description: "New department has been added successfully.",
      });

      fetchDepartments();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating department",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateDepartment = async (id: string, departmentData: Partial<Department>) => {
    try {
      const { error } = await supabase
        .from('departments')
        .update(departmentData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Department updated",
        description: "Department information has been updated successfully.",
      });

      fetchDepartments();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error updating department",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('departments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Department deleted",
        description: "Department has been removed successfully.",
      });

      fetchDepartments();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error deleting department",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    refetch: fetchDepartments,
  };
};