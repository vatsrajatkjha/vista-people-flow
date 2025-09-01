import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Users, 
  Briefcase, 
  Calendar,
  TrendingUp,
  Eye,
  UserCheck,
  Clock
} from 'lucide-react';

const jobStats = [
  { title: 'Open Positions', value: '12', icon: Briefcase, color: 'bg-gradient-primary' },
  { title: 'Total Applicants', value: '248', icon: Users, color: 'bg-gradient-success' },
  { title: 'Interviews Scheduled', value: '18', icon: Calendar, color: 'bg-gradient-warning' },
  { title: 'Hired This Month', value: '5', icon: UserCheck, color: 'bg-accent' },
];

const openJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    applicants: 45,
    status: 'Active',
    posted: '3 days ago',
    urgency: 'High'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'San Francisco',
    applicants: 32,
    status: 'Active',
    posted: '1 week ago',
    urgency: 'Medium'
  },
  {
    id: 3,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York',
    applicants: 28,
    status: 'Draft',
    posted: '2 weeks ago',
    urgency: 'Low'
  }
];

const recentActivity = [
  { action: 'New application received for Senior Frontend Developer', time: '5 minutes ago' },
  { action: 'Interview scheduled with John Doe for UX Designer position', time: '1 hour ago' },
  { action: 'Offer sent to Sarah Wilson for Marketing Manager role', time: '3 hours ago' },
  { action: 'Job posting published: Data Analyst', time: '1 day ago' },
];

export default function Recruitment() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Recruitment</h1>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2" size={16} />
            Create Job Posting
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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
          {/* Open Positions */}
          <Card>
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {openJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                      </div>
                      <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">{job.applicants} applicants</span>
                        <Badge variant={job.urgency === 'High' ? 'destructive' : job.urgency === 'Medium' ? 'default' : 'secondary'}>
                          {job.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={12} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{job.posted}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Application Progress</span>
                        <span>{Math.floor(Math.random() * 100)}%</span>
                      </div>
                      <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1" size={14} />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="mr-1" size={14} />
                        Applicants
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
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}