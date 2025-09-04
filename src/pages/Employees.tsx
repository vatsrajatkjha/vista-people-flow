import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin,
  MoreHorizontal,
  Edit2,
  Trash2
} from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { EmployeeForm } from '@/components/forms/EmployeeForm';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Employees() {
  const { employees, loading, createEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; employee: any }>({ open: false, employee: null });

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmployee = async (data: any) => {
    await createEmployee(data);
    setShowForm(false);
  };

  const handleUpdateEmployee = async (data: any) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
      setEditingEmployee(null);
      setShowForm(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (deleteConfirm.employee) {
      await deleteEmployee(deleteConfirm.employee.id);
      setDeleteConfirm({ open: false, employee: null });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'on_leave': return 'secondary';
      case 'terminated': return 'destructive';
      case 'pending': return 'outline';
      default: return 'default';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading employees...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <Button 
            className="bg-gradient-primary" 
            onClick={() => {
              setEditingEmployee(null);
              setShowForm(true);
            }}
          >
            <UserPlus className="mr-2" size={16} />
            Add Employee
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Employee Directory ({filteredEmployees.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2" size={16} />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2" size={16} />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{getInitials(employee.first_name, employee.last_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {employee.first_name} {employee.last_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {employee.position} • {employee.department?.name || 'No Department'}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail size={12} className="mr-1" />
                          {employee.email}
                        </div>
                        {employee.phone && (
                          <div className="flex items-center">
                            <Phone size={12} className="mr-1" />
                            {employee.phone}
                          </div>
                        )}
                        {employee.address && (
                          <div className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {employee.address}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusBadgeVariant(employee.status)}>
                      {employee.status.replace('_', ' ')}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingEmployee(employee);
                            setShowForm(true);
                          }}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteConfirm({ open: true, employee })}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredEmployees.length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No employees found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <EmployeeForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
          onSubmit={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
          employee={editingEmployee}
          title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        />

        <AlertDialog open={deleteConfirm.open} onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Employee</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {deleteConfirm.employee?.first_name} {deleteConfirm.employee?.last_name}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEmployee} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}