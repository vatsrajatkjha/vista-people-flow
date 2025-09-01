import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Upload,
  Download,
  Calendar,
  Eye,
  Clock
} from 'lucide-react';

const complianceStats = [
  { title: 'Compliance Score', value: '92%', change: '+3%', icon: Shield, color: 'bg-gradient-primary' },
  { title: 'Active Policies', value: '24', change: '+2', icon: FileText, color: 'bg-gradient-success' },
  { title: 'Pending Reviews', value: '8', change: '-5', icon: Clock, color: 'bg-gradient-warning' },
  { title: 'Risk Level', value: 'Low', change: 'Stable', icon: CheckCircle, color: 'bg-accent' },
];

const policies = [
  {
    name: 'Data Privacy Policy',
    version: '2.1',
    lastUpdated: '2024-01-15',
    nextReview: '2024-07-15',
    status: 'Active',
    compliance: 98
  },
  {
    name: 'Code of Conduct',
    version: '1.5',
    lastUpdated: '2023-12-01',
    nextReview: '2024-06-01',
    status: 'Under Review',
    compliance: 95
  },
  {
    name: 'Safety Guidelines',
    version: '3.0',
    lastUpdated: '2024-02-01',
    nextReview: '2024-08-01',
    status: 'Active',
    compliance: 100
  },
  {
    name: 'Anti-Harassment Policy',
    version: '2.0',
    lastUpdated: '2023-11-15',
    nextReview: '2024-05-15',
    status: 'Needs Update',
    compliance: 88
  }
];

const documents = [
  {
    name: 'Employee Handbook 2024',
    type: 'Policy Document',
    size: '2.4 MB',
    uploadDate: '2024-01-10',
    status: 'Published'
  },
  {
    name: 'GDPR Compliance Report',
    type: 'Compliance Report',
    size: '1.8 MB',
    uploadDate: '2024-01-28',
    status: 'Under Review'
  },
  {
    name: 'Security Training Materials',
    type: 'Training Document',
    size: '5.2 MB',
    uploadDate: '2024-02-05',
    status: 'Published'
  },
  {
    name: 'Audit Report Q4 2023',
    type: 'Audit Report',
    size: '3.1 MB',
    uploadDate: '2024-01-20',
    status: 'Approved'
  }
];

const upcomingDeadlines = [
  {
    task: 'Annual Security Training Completion',
    dueDate: '2024-02-28',
    progress: 78,
    priority: 'High'
  },
  {
    task: 'Policy Review: Code of Conduct',
    dueDate: '2024-03-15',
    progress: 45,
    priority: 'Medium'
  },
  {
    task: 'GDPR Compliance Audit',
    dueDate: '2024-03-30',
    progress: 20,
    priority: 'High'
  },
  {
    task: 'Emergency Procedures Update',
    dueDate: '2024-04-10',
    progress: 0,
    priority: 'Low'
  }
];

const recentActivity = [
  { action: 'Data Privacy Policy updated to version 2.1', time: '2 days ago', type: 'Update' },
  { action: 'Annual compliance report generated and submitted', time: '5 days ago', type: 'Report' },
  { action: 'Security training completed by 15 employees', time: '1 week ago', type: 'Training' },
  { action: 'New OSHA guidelines integrated into safety policy', time: '2 weeks ago', type: 'Integration' },
];

export default function Compliance() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Compliance Management</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="mr-2" size={16} />
              Upload Document
            </Button>
            <Button className="bg-gradient-primary">
              <FileText className="mr-2" size={16} />
              Create Policy
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <stat.icon size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Active Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">Version {policy.version}</p>
                      </div>
                      <Badge variant={
                        policy.status === 'Active' ? 'default' : 
                        policy.status === 'Under Review' ? 'secondary' : 
                        'destructive'
                      }>
                        {policy.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compliance Rate</span>
                        <span>{policy.compliance}%</span>
                      </div>
                      <Progress value={policy.compliance} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Updated: {policy.lastUpdated}</span>
                      <span>Review: {policy.nextReview}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1" size={14} />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1" size={14} />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-sm">{deadline.task}</h3>
                      <Badge variant={
                        deadline.priority === 'High' ? 'destructive' : 
                        deadline.priority === 'Medium' ? 'default' : 
                        'secondary'
                      }>
                        {deadline.priority}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{deadline.progress}%</span>
                      </div>
                      <Progress value={deadline.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        <Calendar size={12} className="inline mr-1" />
                        Due: {deadline.dueDate}
                      </span>
                      <Button size="sm" variant="outline">
                        View Task
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Management */}
        <Card>
          <CardHeader>
            <CardTitle>Document Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText size={24} className="text-muted-foreground" />
                    <div>
                      <h3 className="font-medium text-foreground">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} • {doc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={doc.status === 'Published' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-1" size={14} />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="mr-1" size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Compliance Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}