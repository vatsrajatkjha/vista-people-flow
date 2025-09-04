import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  position: string;
  hire_date: string;
  salary?: number;
  status: 'active' | 'on_leave' | 'terminated' | 'pending';
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  skills?: string[];
  notes?: string;
  department?: {
    id: string;
    name: string;
  };
  manager?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          department:departments(id, name),
          manager:employees!manager_id(id, first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching employees",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'department' | 'manager'> & { department_id?: string; manager_id?: string }) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([employeeData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Employee created",
        description: "New employee has been added successfully.",
      });

      fetchEmployees();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating employee",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update(employeeData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Employee updated",
        description: "Employee information has been updated successfully.",
      });

      fetchEmployees();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error updating employee",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Employee deleted",
        description: "Employee has been removed successfully.",
      });

      fetchEmployees();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error deleting employee",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    refetch: fetchEmployees,
  };
};