import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Phone } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
  email: string;
  phone: string;
  status: 'active' | 'on-leave' | 'remote';
  startDate: string;
}

const employees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    email: 'alice.johnson@company.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    startDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    position: 'Product Manager',
    department: 'Product',
    email: 'bob.smith@company.com',
    phone: '+1 (555) 234-5678',
    status: 'remote',
    startDate: '2022-08-20',
  },
  {
    id: '3',
    name: 'Carol Martinez',
    position: 'UX Designer',
    department: 'Design',
    email: 'carol.martinez@company.com',
    phone: '+1 (555) 345-6789',
    status: 'on-leave',
    startDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'David Chen',
    position: 'DevOps Engineer',
    department: 'Engineering',
    email: 'david.chen@company.com',
    phone: '+1 (555) 456-7890',
    status: 'active',
    startDate: '2023-05-01',
  },
];

const getStatusColor = (status: Employee['status']) => {
  const colors = {
    active: 'bg-success text-success-foreground',
    'on-leave': 'bg-warning text-warning-foreground',
    remote: 'bg-primary text-primary-foreground',
  };
  return colors[status];
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const EmployeeOverview = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Employees</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {employees.map((employee) => (
          <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={employee.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{employee.name}</h4>
                  <Badge className={`${getStatusColor(employee.status)} text-xs capitalize`}>
                    {employee.status.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
                <p className="text-xs text-muted-foreground">{employee.department}</p>
                
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Mail size={12} />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Phone size={12} />
                    <span>{employee.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};