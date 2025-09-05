import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Clock,
  BarChart3,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

interface AnalyticsMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  target?: string;
  progress?: number;
}

const analyticsData: AnalyticsMetric[] = [
  {
    title: 'Employee Retention Rate',
    value: '94.2%',
    change: 2.3,
    trend: 'up',
    target: '95%',
    progress: 94.2
  },
  {
    title: 'Average Time to Hire',
    value: '18 days',
    change: -3.2,
    trend: 'up',
    target: '15 days',
    progress: 83
  },
  {
    title: 'Training Completion',
    value: '87%',
    change: 5.1,
    trend: 'up',
    progress: 87
  },
  {
    title: 'Employee Satisfaction',
    value: '4.7/5',
    change: 0.3,
    trend: 'up',
    progress: 94
  }
];

const departmentPerformance = [
  { name: 'Engineering', score: 92, employees: 45, trend: 'up' },
  { name: 'Sales', score: 88, employees: 32, trend: 'up' },
  { name: 'Marketing', score: 85, employees: 18, trend: 'down' },
  { name: 'HR', score: 91, employees: 12, trend: 'up' },
  { name: 'Finance', score: 89, employees: 15, trend: 'up' }
];

export const AdvancedAnalytics = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Advanced Analytics
          </h2>
          <p className="text-muted-foreground mt-2">
            AI-powered insights and predictive analytics for your workforce
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((metric, index) => (
          <Card key={metric.title} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">{metric.title}</h3>
                <div className="text-2xl font-bold">{metric.value}</div>
                
                {metric.progress && (
                  <div className="space-y-2">
                    <Progress value={metric.progress} className="h-2" />
                    {metric.target && (
                      <div className="text-xs text-muted-foreground">
                        Target: {metric.target}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Performance */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Department Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <div key={dept.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${dept.trend === 'up' ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
                  <div>
                    <h4 className="font-semibold">{dept.name}</h4>
                    <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">{dept.score}%</div>
                    <div className="text-xs text-muted-foreground">Performance Score</div>
                  </div>
                  <Progress value={dept.score} className="w-20 h-2" />
                  {dept.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-warning" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Target className="w-5 h-5 mr-2" />
            AI-Powered Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                <h4 className="font-semibold text-sm">High Retention Opportunity</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Engineering team showing 12% higher satisfaction. Consider expanding similar practices company-wide.
              </p>
            </div>
            
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-warning rounded-full mr-2 animate-pulse"></div>
                <h4 className="font-semibold text-sm">Training Gap Identified</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Marketing team could benefit from additional digital skills training to improve performance scores.
              </p>
            </div>
            
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                <h4 className="font-semibold text-sm">Recruitment Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Current hiring velocity is 23% faster than industry average. Consider increasing team capacity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};