import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  action: string;
  target: string;
  time: string;
  type: 'hire' | 'promotion' | 'leave' | 'performance' | 'payroll';
}

const activityItems: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'Sarah Johnson', role: 'HR Manager' },
    action: 'hired',
    target: 'Michael Chen as Senior Developer',
    time: '2 hours ago',
    type: 'hire',
  },
  {
    id: '2',
    user: { name: 'David Wilson', role: 'Team Lead' },
    action: 'promoted',
    target: 'Jessica Martinez to Senior Designer',
    time: '4 hours ago',
    type: 'promotion',
  },
  {
    id: '3',
    user: { name: 'Emily Davis', role: 'Employee' },
    action: 'submitted leave request',
    target: 'for vacation (Jul 15-22)',
    time: '6 hours ago',
    type: 'leave',
  },
  {
    id: '4',
    user: { name: 'Robert Brown', role: 'HR Assistant' },
    action: 'processed payroll',
    target: 'for Engineering Department',
    time: '1 day ago',
    type: 'payroll',
  },
  {
    id: '5',
    user: { name: 'Lisa Anderson', role: 'Manager' },
    action: 'completed performance review',
    target: 'for Alex Thompson',
    time: '1 day ago',
    type: 'performance',
  },
];

const getTypeColor = (type: ActivityItem['type']) => {
  const colors = {
    hire: 'bg-success text-success-foreground',
    promotion: 'bg-primary text-primary-foreground',
    leave: 'bg-warning text-warning-foreground',
    performance: 'bg-accent text-accent-foreground',
    payroll: 'bg-muted text-muted-foreground',
  };
  return colors[type];
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock size={20} />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src={item.user.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(item.user.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-foreground">{item.user.name}</span>
                <Badge variant="outline" className="text-xs">
                  {item.user.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{item.action}</span> {item.target}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
            </div>
            
            <Badge className={`${getTypeColor(item.type)} capitalize text-xs`}>
              {item.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};