import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  Activity, 
  Moon, 
  Brain, 
  Smile, 
  Frown,
  Meh,
  Target,
  Calendar,
  Trophy,
  TrendingUp,
  Users,
  Clock,
  Zap,
  Shield,
  Leaf
} from 'lucide-react';

interface WellnessMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

interface EmployeeWellness {
  id: string;
  name: string;
  department: string;
  avatar?: string;
  wellnessScore: number;
  metrics: {
    stress: number;
    engagement: number;
    workLifeBalance: number;
    satisfaction: number;
  };
  lastCheckIn: Date;
  streak: number;
}

const wellnessMetrics: WellnessMetric[] = [
  {
    id: 'stress',
    name: 'Stress Level',
    value: 3.2,
    target: 3.0,
    unit: '/10',
    trend: 'down',
    icon: Brain,
    color: 'text-red-500'
  },
  {
    id: 'engagement',
    name: 'Engagement',
    value: 8.1,
    target: 8.0,
    unit: '/10',
    trend: 'up',
    icon: Zap,
    color: 'text-blue-500'
  },
  {
    id: 'balance',
    name: 'Work-Life Balance',
    value: 7.8,
    target: 8.0,
    unit: '/10',
    trend: 'up',
    icon: Leaf,
    color: 'text-green-500'
  },
  {
    id: 'satisfaction',
    name: 'Job Satisfaction',
    value: 8.5,
    target: 8.0,
    unit: '/10',
    trend: 'up',
    icon: Heart,
    color: 'text-pink-500'
  }
];

const mockEmployees: EmployeeWellness[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    department: 'Engineering',
    wellnessScore: 85,
    metrics: {
      stress: 3.0,
      engagement: 8.5,
      workLifeBalance: 8.0,
      satisfaction: 9.0
    },
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    streak: 12
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    department: 'Sales',
    wellnessScore: 72,
    metrics: {
      stress: 4.5,
      engagement: 7.0,
      workLifeBalance: 6.5,
      satisfaction: 7.5
    },
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    streak: 5
  },
  {
    id: '3',
    name: 'Emily Johnson',
    department: 'Design',
    wellnessScore: 91,
    metrics: {
      stress: 2.5,
      engagement: 9.0,
      workLifeBalance: 8.5,
      satisfaction: 9.2
    },
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    streak: 25
  }
];

const getWellnessColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

const getWellnessBadge = (score: number) => {
  if (score >= 80) return { label: 'Excellent', variant: 'default' as const };
  if (score >= 60) return { label: 'Good', variant: 'secondary' as const };
  return { label: 'Needs Attention', variant: 'destructive' as const };
};

const getMoodIcon = (score: number) => {
  if (score >= 80) return Smile;
  if (score >= 60) return Meh;
  return Frown;
};

export const WellnessTracking = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWellness | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'individuals' | 'programs'>('overview');

  const averageWellnessScore = mockEmployees.reduce((sum, emp) => sum + emp.wellnessScore, 0) / mockEmployees.length;
  const employeesNeedingAttention = mockEmployees.filter(emp => emp.wellnessScore < 70).length;
  const activeCheckIns = mockEmployees.filter(emp => 
    Date.now() - emp.lastCheckIn.getTime() < 24 * 60 * 60 * 1000
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Employee Wellness
          </h2>
          <p className="text-muted-foreground mt-2">
            Monitor and improve team wellbeing and mental health
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Check-in
          </Button>
          <Button className="bg-gradient-primary">
            <Target className="w-4 h-4 mr-2" />
            Wellness Program
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'individuals', label: 'Team Members', icon: Users },
          { id: 'programs', label: 'Programs', icon: Trophy }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold">{averageWellnessScore.toFixed(0)}</div>
                    <div className="text-sm text-muted-foreground">Avg. Wellness Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold">{activeCheckIns}</div>
                    <div className="text-sm text-muted-foreground">Active Check-ins</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold">{employeesNeedingAttention}</div>
                    <div className="text-sm text-muted-foreground">Need Attention</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-sm text-muted-foreground">Active Programs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wellness Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Company Wellness Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wellnessMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <Badge variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'secondary' : 'outline'}>
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{metric.value}{metric.unit}</span>
                        <span className="text-sm text-muted-foreground">Target: {metric.target}{metric.unit}</span>
                      </div>
                      <Progress value={(metric.value / 10) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Individuals Tab */}
      {activeTab === 'individuals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockEmployees.map((employee) => {
              const MoodIcon = getMoodIcon(employee.wellnessScore);
              const badge = getWellnessBadge(employee.wellnessScore);
              
              return (
                <Card 
                  key={employee.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {employee.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <MoodIcon className={`w-6 h-6 ${getWellnessColor(employee.wellnessScore)}`} />
                    </div>

                    {/* Wellness Score */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Wellness Score</span>
                        <span className={`text-sm font-bold ${getWellnessColor(employee.wellnessScore)}`}>
                          {employee.wellnessScore}/100
                        </span>
                      </div>
                      <Progress value={employee.wellnessScore} className="h-2" />
                      <Badge variant={badge.variant} className="mt-2">
                        {badge.label}
                      </Badge>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Stress Level</span>
                        <span>{employee.metrics.stress}/10</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Engagement</span>
                        <span>{employee.metrics.engagement}/10</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Work-Life Balance</span>
                        <span>{employee.metrics.workLifeBalance}/10</span>
                      </div>
                    </div>

                    {/* Last Check-in */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        Last check-in: {new Date(employee.lastCheckIn).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1 text-primary" />
                        <span className="font-medium">{employee.streak} day streak</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Programs Tab */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Mindfulness Mondays',
                description: 'Weekly guided meditation sessions',
                participants: 24,
                status: 'active',
                icon: Brain,
                color: 'bg-purple-500'
              },
              {
                name: 'Fitness Challenge',
                description: 'Monthly step counting competition',
                participants: 38,
                status: 'active',
                icon: Activity,
                color: 'bg-green-500'
              },
              {
                name: 'Mental Health Support',
                description: 'Counseling and therapy sessions',
                participants: 12,
                status: 'active',
                icon: Heart,
                color: 'bg-red-500'
              },
              {
                name: 'Work-Life Balance Workshop',
                description: 'Time management and boundary setting',
                participants: 19,
                status: 'upcoming',
                icon: Leaf,
                color: 'bg-blue-500'
              },
              {
                name: 'Sleep Better Program',
                description: 'Improving sleep quality and habits',
                participants: 15,
                status: 'active',
                icon: Moon,
                color: 'bg-indigo-500'
              },
              {
                name: 'Stress Management',
                description: 'Techniques for handling workplace stress',
                participants: 28,
                status: 'active',
                icon: Shield,
                color: 'bg-orange-500'
              }
            ].map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 ${program.color} rounded-lg`}>
                      <program.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Participants</span>
                      <span className="font-medium">{program.participants}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                        {program.status === 'active' ? 'Active' : 'Upcoming'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                    <p className="text-muted-foreground">{selectedEmployee.department}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedEmployee(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Wellness Score */}
              <div>
                <h3 className="font-semibold mb-3">Overall Wellness Score</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Current Score</span>
                    <span className={`font-bold text-xl ${getWellnessColor(selectedEmployee.wellnessScore)}`}>
                      {selectedEmployee.wellnessScore}/100
                    </span>
                  </div>
                  <Progress value={selectedEmployee.wellnessScore} className="mb-2" />
                  <Badge variant={getWellnessBadge(selectedEmployee.wellnessScore).variant}>
                    {getWellnessBadge(selectedEmployee.wellnessScore).label}
                  </Badge>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div>
                <h3 className="font-semibold mb-3">Detailed Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedEmployee.metrics).map(([key, value]) => (
                    <div key={key} className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm font-medium capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-2xl font-bold text-primary">{value}/10</div>
                      <Progress value={value * 10} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div>
                <h3 className="font-semibold mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Check-in</span>
                    <span>{selectedEmployee.lastCheckIn.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Streak</span>
                    <span className="font-medium">{selectedEmployee.streak} days</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button className="flex-1 bg-gradient-primary">
                  <Heart className="w-4 h-4 mr-2" />
                  Send Check-in
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule 1-on-1
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};