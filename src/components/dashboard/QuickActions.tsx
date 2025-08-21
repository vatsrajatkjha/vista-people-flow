import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  FileText, 
  Calendar, 
  DollarSign, 
  MessageCircle, 
  BarChart3 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    title: 'Add Employee',
    description: 'Onboard new team member',
    icon: UserPlus,
    color: 'bg-gradient-primary',
    action: () => console.log('Add employee'),
  },
  {
    title: 'Post Job',
    description: 'Create new job posting',
    icon: FileText,
    color: 'bg-gradient-success',
    action: () => console.log('Post job'),
  },
  {
    title: 'Schedule Interview',
    description: 'Book candidate meeting',
    icon: Calendar,
    color: 'bg-gradient-warning',
    action: () => console.log('Schedule interview'),
  },
  {
    title: 'Process Payroll',
    description: 'Run monthly payroll',
    icon: DollarSign,
    color: 'bg-primary',
    action: () => console.log('Process payroll'),
  },
  {
    title: 'Send Announcement',
    description: 'Company-wide message',
    icon: MessageCircle,
    color: 'bg-accent',
    action: () => console.log('Send announcement'),
  },
  {
    title: 'Generate Report',
    description: 'Create analytics report',
    icon: BarChart3,
    color: 'bg-muted text-muted-foreground',
    action: () => console.log('Generate report'),
  },
];

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all duration-200"
              onClick={action.action}
            >
              <div className={`p-2 rounded-lg ${action.color} text-white`}>
                <action.icon size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};