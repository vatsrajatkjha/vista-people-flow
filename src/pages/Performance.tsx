import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Target, 
  TrendingUp, 
  Star, 
  Calendar,
  Users,
  Award,
  Plus,
  Eye
} from 'lucide-react';

const performanceStats = [
  { title: 'Active Reviews', value: '24', icon: Target, color: 'bg-gradient-primary' },
  { title: 'Avg Performance Score', value: '4.2', icon: Star, color: 'bg-gradient-success' },
  { title: 'Goals Completed', value: '78%', icon: Award, color: 'bg-gradient-warning' },
  { title: 'Team Members', value: '156', icon: Users, color: 'bg-accent' },
];

const activeReviews = [
  {
    employee: 'Sarah Johnson',
    position: 'Senior Developer',
    reviewer: 'Mike Wilson',
    dueDate: '2024-02-15',
    progress: 85,
    status: 'In Progress',
    avatar: 'SJ'
  },
  {
    employee: 'Michael Chen',
    position: 'UX Designer',
    reviewer: 'Lisa Park',
    dueDate: '2024-02-18',
    progress: 60,
    status: 'Pending',
    avatar: 'MC'
  },
  {
    employee: 'Emily Rodriguez',
    position: 'Marketing Manager',
    reviewer: 'John Doe',
    dueDate: '2024-02-20',
    progress: 100,
    status: 'Completed',
    avatar: 'ER'
  }
];

const topPerformers = [
  { name: 'Sarah Johnson', score: 4.8, department: 'Engineering', avatar: 'SJ' },
  { name: 'Michael Chen', score: 4.7, department: 'Design', avatar: 'MC' },
  { name: 'Emily Rodriguez', score: 4.6, department: 'Marketing', avatar: 'ER' },
  { name: 'David Wilson', score: 4.5, department: 'Sales', avatar: 'DW' },
];

const goalTracking = [
  { goal: 'Complete React Training', progress: 90, dueDate: '2024-02-28' },
  { goal: 'Increase Team Productivity by 15%', progress: 75, dueDate: '2024-03-15' },
  { goal: 'Launch New Product Feature', progress: 60, dueDate: '2024-04-01' },
  { goal: 'Improve Customer Satisfaction Score', progress: 85, dueDate: '2024-03-30' },
];

export default function Performance() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Performance Management</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2" size={16} />
              Schedule Review
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2" size={16} />
              Create Goal
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceStats.map((stat) => (
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
          {/* Active Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Active Performance Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeReviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{review.employee}</h3>
                          <p className="text-sm text-muted-foreground">{review.position}</p>
                        </div>
                      </div>
                      <Badge variant={
                        review.status === 'Completed' ? 'default' : 
                        review.status === 'In Progress' ? 'secondary' : 
                        'outline'
                      }>
                        {review.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Review Progress</span>
                        <span>{review.progress}%</span>
                      </div>
                      <Progress value={review.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due: {review.dueDate}</span>
                      <span className="text-muted-foreground">Reviewer: {review.reviewer}</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3">
                      <Eye className="mr-1" size={14} />
                      View Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{performer.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-foreground">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        <span className="font-semibold text-foreground">{performer.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goal Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalTracking.map((goal, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <h3 className="font-semibold text-foreground mb-2">{goal.goal}</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">Due: {goal.dueDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}