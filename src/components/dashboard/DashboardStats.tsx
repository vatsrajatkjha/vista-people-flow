import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
}

const StatCard = ({ title, value, change, changeType, icon: Icon }: StatCardProps) => (
  <Card className="relative overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon size={16} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className={`flex items-center text-xs font-medium mt-1 ${
        changeType === 'positive' ? 'text-success' : 'text-destructive'
      }`}>
        {changeType === 'positive' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        <span className="ml-1">{change}</span>
      </div>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '1,247',
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Open Positions',
      value: '23',
      change: '+3 new this week',
      changeType: 'positive' as const,
      icon: UserCheck,
    },
    {
      title: 'Monthly Payroll',
      value: '$2.4M',
      change: '+8% from last month',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Employee Satisfaction',
      value: '94%',
      change: '-2% from last quarter',
      changeType: 'negative' as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};