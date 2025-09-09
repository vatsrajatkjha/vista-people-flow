import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkflows, type WorkflowRule } from '@/hooks/useWorkflows';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
  ArrowRight,
  Edit,
  Trash2
} from 'lucide-react';

const workflowFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  trigger_condition: z.string().min(1, 'Trigger condition is required'),
  actions: z.string().min(1, 'Actions are required'),
  category: z.enum(['onboarding', 'performance', 'leave', 'recruitment', 'general']),
});

type WorkflowFormData = z.infer<typeof workflowFormSchema>;

export const WorkflowAutomation = () => {
  const { workflows, loading, createWorkflow, updateWorkflow, deleteWorkflow, toggleWorkflow, executeWorkflow } = useWorkflows();
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRule | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowRule | null>(null);

  const form = useForm<WorkflowFormData>({
    resolver: zodResolver(workflowFormSchema),
    defaultValues: {
      name: '',
      description: '',
      trigger_condition: '',
      actions: '',
      category: 'general',
    },
  });

  const handleAddWorkflow = async (data: WorkflowFormData) => {
    try {
      await createWorkflow({
        ...data,
        actions: data.actions.split('\n').filter(a => a.trim()),
        is_active: true,
        success_rate: 95,
        runs_today: 0,
      });
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding workflow:', error);
    }
  };

  const handleEditWorkflow = async (data: WorkflowFormData) => {
    if (!editingWorkflow) return;
    try {
      await updateWorkflow(editingWorkflow.id, {
        ...data,
        actions: data.actions.split('\n').filter(a => a.trim()),
      });
      setIsEditDialogOpen(false);
      setEditingWorkflow(null);
      form.reset();
    } catch (error) {
      console.error('Error updating workflow:', error);
    }
  };

  const openEditDialog = (workflow: WorkflowRule) => {
    setEditingWorkflow(workflow);
    form.reset({
      name: workflow.name,
      description: workflow.description || '',
      trigger_condition: workflow.trigger_condition,
      actions: workflow.actions.join('\n'),
      category: workflow.category,
    });
    setIsEditDialogOpen(true);
  };

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

  const totalActiveWorkflows = workflows.filter(w => w.is_active).length;
  const totalRunsToday = workflows.reduce((sum, w) => sum + w.runs_today, 0);
  const averageSuccessRate = workflows.length > 0 
    ? workflows.reduce((sum, w) => sum + w.success_rate, 0) / workflows.length 
    : 0;

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
        <Button className="bg-gradient-primary" onClick={() => setIsAddDialogOpen(true)}>
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
      {loading ? (
        <div className="text-center py-8">Loading workflows...</div>
      ) : (
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
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={workflow.is_active}
                        onCheckedChange={() => toggleWorkflow(workflow.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Trigger */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm font-medium mb-2">
                      <Bot className="w-4 h-4 mr-2 text-primary" />
                      Trigger
                    </div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                      {workflow.trigger_condition}
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
                      <div className="text-lg font-bold text-primary">{workflow.runs_today}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Success Rate</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-bold text-primary">{workflow.success_rate}%</div>
                        <Progress value={workflow.success_rate} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant={workflow.is_active ? "default" : "secondary"}>
                      {workflow.is_active ? (
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
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="capitalize">
                        {workflow.category}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDialog(workflow);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this workflow?')) {
                            deleteWorkflow(workflow.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

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
              {/* Status and Controls */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant={selectedWorkflow.is_active ? "default" : "secondary"} className="px-3 py-1">
                    {selectedWorkflow.is_active ? (
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
                    <span className="font-medium">{selectedWorkflow.runs_today}</span> runs today
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{selectedWorkflow.success_rate}%</span> success rate
                  </div>
                </div>
                <Switch 
                  checked={selectedWorkflow.is_active}
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
                  <p className="text-sm">{selectedWorkflow.trigger_condition}</p>
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
                    <div className="text-2xl font-bold text-primary">{selectedWorkflow.runs_today}</div>
                    <div className="text-sm text-muted-foreground">Executions Today</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorkflow.success_rate}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button 
                  className="flex-1 bg-gradient-primary"
                  onClick={() => openEditDialog(selectedWorkflow)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Workflow
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => executeWorkflow(selectedWorkflow.id)}
                >
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
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddWorkflow)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Name</FormLabel>
                    <FormControl>
                      <Input placeholder="New Employee Onboarding" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe what this workflow does..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="leave">Leave Management</SelectItem>
                        <SelectItem value="recruitment">Recruitment</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="trigger_condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Condition</FormLabel>
                    <FormControl>
                      <Input placeholder="When new employee is added" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="actions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actions (one per line)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Create system accounts&#10;Send welcome email&#10;Schedule orientation"
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">
                  Create Workflow
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Workflow Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditWorkflow)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="leave">Leave Management</SelectItem>
                        <SelectItem value="recruitment">Recruitment</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="trigger_condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Condition</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="actions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actions (one per line)</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">
                  Update Workflow
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};