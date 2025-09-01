import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Heart, 
  TrendingUp, 
  Users,
  Plus,
  Calendar,
  Send,
  Eye
} from 'lucide-react';

const engagementStats = [
  { title: 'Engagement Score', value: '78%', change: '+5%', icon: Heart, color: 'bg-gradient-primary' },
  { title: 'Survey Responses', value: '142/156', change: '91%', icon: MessageSquare, color: 'bg-gradient-success' },
  { title: 'Active Discussions', value: '24', change: '+12', icon: Users, color: 'bg-gradient-warning' },
  { title: 'Satisfaction Rate', value: '4.3/5', change: '+0.2', icon: TrendingUp, color: 'bg-accent' },
];

const activeSurveys = [
  {
    title: 'Q1 Employee Satisfaction Survey',
    responses: 89,
    totalEmployees: 156,
    endDate: '2024-02-28',
    status: 'Active',
    progress: 57
  },
  {
    title: 'Work-Life Balance Feedback',
    responses: 142,
    totalEmployees: 156,
    endDate: '2024-02-15',
    status: 'Completed',
    progress: 91
  },
  {
    title: 'Remote Work Experience',
    responses: 23,
    totalEmployees: 156,
    endDate: '2024-03-15',
    status: 'Draft',
    progress: 15
  }
];

const recentFeedback = [
  {
    employee: 'Sarah Johnson',
    department: 'Engineering',
    feedback: 'Great team collaboration and flexible working hours.',
    rating: 5,
    date: '2 hours ago',
    avatar: 'SJ'
  },
  {
    employee: 'Michael Chen',
    department: 'Design',
    feedback: 'Love the new office space and the coffee quality!',
    rating: 4,
    date: '4 hours ago',
    avatar: 'MC'
  },
  {
    employee: 'Emily Rodriguez',
    department: 'Marketing',
    feedback: 'Would like more professional development opportunities.',
    rating: 3,
    date: '1 day ago',
    avatar: 'ER'
  }
];

const announcements = [
  {
    title: 'New Health Benefits Package',
    content: 'We are excited to announce our enhanced health benefits starting March 1st.',
    author: 'HR Team',
    date: '2024-02-01',
    priority: 'High'
  },
  {
    title: 'Office Renovation Complete',
    content: 'The 3rd floor renovation is complete. New meeting rooms are now available.',
    author: 'Facilities',
    date: '2024-01-28',
    priority: 'Medium'
  },
  {
    title: 'Q1 All-Hands Meeting',
    content: 'Join us for the quarterly all-hands meeting on February 15th at 10 AM.',
    author: 'Leadership Team',
    date: '2024-01-25',
    priority: 'High'
  }
];

export default function Engagement() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Employee Engagement</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2" size={16} />
              Schedule Survey
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2" size={16} />
              Create Announcement
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {engagementStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last quarter</p>
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
          {/* Active Surveys */}
          <Card>
            <CardHeader>
              <CardTitle>Active Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSurveys.map((survey, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{survey.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {survey.responses}/{survey.totalEmployees} responses • Ends {survey.endDate}
                        </p>
                      </div>
                      <Badge variant={
                        survey.status === 'Active' ? 'default' : 
                        survey.status === 'Completed' ? 'secondary' : 
                        'outline'
                      }>
                        {survey.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Rate</span>
                        <span>{survey.progress}%</span>
                      </div>
                      <Progress value={survey.progress} className="h-2" />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1" size={14} />
                        View Results
                      </Button>
                      {survey.status === 'Active' && (
                        <Button size="sm" variant="outline">
                          <Send className="mr-1" size={14} />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback>{feedback.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground">{feedback.employee}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Heart 
                                key={i} 
                                size={14} 
                                className={i < feedback.rating ? 'text-red-500 fill-current' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{feedback.department}</p>
                        <p className="text-sm text-foreground mb-2">"{feedback.feedback}"</p>
                        <p className="text-xs text-muted-foreground">{feedback.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Company Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                    <Badge variant={announcement.priority === 'High' ? 'destructive' : 'secondary'}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-3">{announcement.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {announcement.author}</span>
                    <span>{announcement.date}</span>
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