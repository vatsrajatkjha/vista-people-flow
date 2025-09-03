import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock,
  UserCheck,
  UserX,
  Target,
  Zap
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  color: string;
  progress?: number;
  target?: string;
  trend: 'up' | 'down' | 'stable';
  insights?: string[];
}

const dashboardStats: StatCard[] = [
  {
    title: 'Total Employees',
    value: 168,
    change: '+12 this month',
    icon: Users,
    color: 'bg-gradient-primary',
    progress: 84,
    target: '200 by Q4',
    trend: 'up',
    insights: ['5 new hires in Engineering', '2 promotions this week']
  },
  {
    title: 'Employee Satisfaction',
    value: '92%',
    change: '+5% vs last quarter',
    icon: TrendingUp,
    color: 'bg-gradient-success',
    progress: 92,
    target: '95% target',
    trend: 'up',
    insights: ['Highest score in 2 years', 'Work-life balance improved']
  },
  {
    title: 'Monthly Payroll',
    value: '$847K',
    change: '+8.2% YoY',
    icon: DollarSign,
    color: 'bg-gradient-warning',
    progress: 78,
    target: '$950K budget',
    trend: 'up',
    insights: ['Within budget limits', '3% efficiency gain']
  },
  {
    title: 'Avg Response Time',
    value: '2.1h',
    change: '-15min improvement',
    icon: Clock,
    color: 'bg-accent',
    progress: 85,
    target: '<2h target',
    trend: 'up',
    insights: ['AI assistance helping', 'Process automation working']
  }
];

const quickMetrics = [
  { label: 'Active Today', value: 142, icon: UserCheck, color: 'text-success' },
  { label: 'On Leave', value: 8, icon: UserX, color: 'text-warning' },
  { label: 'Goals Met', value: '89%', icon: Target, color: 'text-primary' },
  { label: 'Productivity', value: '+12%', icon: Zap, color: 'text-accent' }
];

export const ModernDashboardStats = () => {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} />
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-success/10 text-success' :
                    stat.trend === 'down' ? 'bg-destructive/10 text-destructive' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'} 
                    {stat.change}
                  </div>
                </div>

                {/* Main Value */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>

                {/* Progress Bar */}
                {stat.progress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span>Progress</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                    {stat.target && (
                      <div className="text-xs text-muted-foreground mt-1">{stat.target}</div>
                    )}
                  </div>
                )}

                {/* AI Insights */}
                {stat.insights && (
                  <div className="space-y-1">
                    {stat.insights.map((insight, i) => (
                      <div key={i} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse"></div>
                        {insight}
                      </div>
                    ))}
                  </div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Metrics Bar */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={metric.label} className="flex items-center space-x-3 group cursor-pointer">
                  <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-200`}>
                    <IconComponent size={20} className={metric.color} />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};