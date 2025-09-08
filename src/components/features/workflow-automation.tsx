import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  Clock,
  Users,
  Mail,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Bot,
  ArrowRight
} from 'lucide-react';

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  runsToday: number;
  successRate: number;
  category: 'onboarding' | 'performance' | 'leave' | 'recruitment' | 'general';
}

const mockWorkflows: WorkflowRule[] = [
  {
    id: '1',
    name: 'New Employee Onboarding',
    description: 'Automatically create accounts, send welcome emails, and schedule orientation',
    trigger: 'When new employee is added',
    actions: [
      'Create system accounts',
      'Send welcome email package',
      'Schedule orientation meeting',
      'Assign buddy/mentor',
      'Create training checklist'
    ],
    isActive: true,
    runsToday: 3,
    successRate: 98,
    category: 'onboarding'
  },
  {
    id: '2',
    name: 'Performance Review Reminders',
    description: 'Send automated reminders for upcoming performance reviews',
    trigger: 'When review date approaches (7 days)',
    actions: [
      'Send reminder to manager',
      'Send preparation email to employee',
      'Schedule review meeting',
      'Create review template'
    ],
    isActive: true,
    runsToday: 12,
    successRate: 94,
    category: 'performance'
  },
  {
    id: '3',
    name: 'Leave Request Processing',
    description: 'Auto-approve certain leave requests based on criteria',
    trigger: 'When leave request is submitted',
    actions: [
      'Check leave balance',
      'Verify manager approval',
      'Update calendar',
      'Notify team members',
      'Generate coverage plan'
    ],
    isActive: true,
    runsToday: 8,
    successRate: 91,
    category: 'leave'
  },
  {
    id: '4',
    name: 'Interview Scheduling',
    description: 'Automatically schedule interviews and send invitations',
    trigger: 'When candidate passes initial screening',
    actions: [
      'Find available interview slots',
      'Send calendar invites',
      'Prepare interview materials',
      'Send candidate confirmation',
      'Set up video call link'
    ],
    isActive: false,
    runsToday: 0,
    successRate: 87,
    category: 'recruitment'
  },
  {
    id: '5',
    name: 'Birthday & Anniversary Celebrations',
    description: 'Send congratulatory messages and celebration reminders',
    trigger: 'On employee birthday or work anniversary',
    actions: [
      'Send birthday/anniversary email',
      'Notify team via Slack',
      'Add celebration to calendar',
      'Trigger gift/reward process'
    ],
    isActive: true,
    runsToday: 2,
    successRate: 100,
    category: 'general'
  }
];

const getCategoryColor = (category: WorkflowRule['category']) => {
  switch (category) {
    case 'onboarding': return 'bg-green-500';
    case 'performance': return 'bg-blue-500';
    case 'leave': return 'bg-yellow-500';
    case 'recruitment': return 'bg-purple-500';
    case 'general': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

const getIcon = (category: WorkflowRule['category']) => {
  switch (category) {
    case 'onboarding': return Users;
    case 'performance': return TrendingUp;
    case 'leave': return Calendar;
    case 'recruitment': return FileText;
    case 'general': return Settings;
    default: return Settings;
  }
};

export const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRule | null>(null);

  const toggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, isActive: !workflow.isActive }
        : workflow
    ));
  };

  const totalActiveWorkflows = workflows.filter(w => w.isActive).length;
  const totalRunsToday = workflows.reduce((sum, w) => sum + w.runsToday, 0);
  const averageSuccessRate = workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Workflow Automation
          </h2>
          <p className="text-muted-foreground mt-2">
            Intelligent automation for seamless HR operations
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-primary rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold">{totalActiveWorkflows}</div>
                <div className="text-sm text-muted-foreground">Active Workflows</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold">{totalRunsToday}</div>
                <div className="text-sm text-muted-foreground">Runs Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold">{averageSuccessRate.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold">45h</div>
                <div className="text-sm text-muted-foreground">Time Saved/Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => {
          const IconComponent = getIcon(workflow.category);
          return (
            <Card 
              key={workflow.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${getCategoryColor(workflow.category)} rounded-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={workflow.isActive}
                    onCheckedChange={() => toggleWorkflow(workflow.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Trigger */}
                <div className="mb-4">
                  <div className="flex items-center text-sm font-medium mb-2">
                    <Bot className="w-4 h-4 mr-2 text-primary" />
                    Trigger
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    {workflow.trigger}
                  </div>
                </div>

                {/* Actions Preview */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Actions ({workflow.actions.length})</div>
                  <div className="space-y-1">
                    {workflow.actions.slice(0, 2).map((action, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center">
                        <ArrowRight className="w-3 h-3 mr-2 text-primary" />
                        {action}
                      </div>
                    ))}
                    {workflow.actions.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{workflow.actions.length - 2} more actions
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm font-medium">Runs Today</div>
                    <div className="text-lg font-bold text-primary">{workflow.runsToday}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Success Rate</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-lg font-bold text-primary">{workflow.successRate}%</div>
                      <Progress value={workflow.successRate} className="flex-1 h-2" />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mt-4">
                  <Badge variant={workflow.isActive ? "default" : "secondary"}>
                    {workflow.isActive ? (
                      <>
                        <Play className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 mr-1" />
                        Paused
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {workflow.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 ${getCategoryColor(selectedWorkflow.category)} rounded-lg`}>
                    {React.createElement(getIcon(selectedWorkflow.category), { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedWorkflow.name}</h2>
                    <p className="text-muted-foreground">{selectedWorkflow.description}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedWorkflow(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status and Controls */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant={selectedWorkflow.isActive ? "default" : "secondary"} className="px-3 py-1">
                    {selectedWorkflow.isActive ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Active
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Paused
                      </>
                    )}
                  </Badge>
                  <div className="text-sm">
                    <span className="font-medium">{selectedWorkflow.runsToday}</span> runs today
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{selectedWorkflow.successRate}%</span> success rate
                  </div>
                </div>
                <Switch 
                  checked={selectedWorkflow.isActive}
                  onCheckedChange={() => toggleWorkflow(selectedWorkflow.id)}
                />
              </div>

              {/* Trigger */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-primary" />
                  Trigger Condition
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">{selectedWorkflow.trigger}</p>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Automated Actions
                </h3>
                <div className="space-y-2">
                  {selectedWorkflow.actions.map((action, index) => (
                    <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {index + 1}
                      </div>
                      <span className="text-sm flex-1">{action}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorkflow.runsToday}</div>
                    <div className="text-sm text-muted-foreground">Executions Today</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorkflow.successRate}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button className="flex-1 bg-gradient-primary">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Workflow
                </Button>
                <Button variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Test Run
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};