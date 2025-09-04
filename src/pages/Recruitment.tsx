import { useState } from 'react';
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
  Clock,
  Edit2,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { useJobPostings } from '@/hooks/useJobPostings';
import { JobPostingForm } from '@/components/forms/JobPostingForm';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Recruitment() {
  const { jobPostings, loading, createJobPosting, updateJobPosting, deleteJobPosting } = useJobPostings();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const jobStats = [
    { title: 'Open Positions', value: jobPostings.filter(j => j.status === 'active').length.toString(), icon: Briefcase, color: 'bg-gradient-primary' },
    { title: 'Total Applicants', value: jobPostings.reduce((sum, job) => sum + (job.application_count || 0), 0).toString(), icon: Users, color: 'bg-gradient-success' },
    { title: 'Draft Jobs', value: jobPostings.filter(j => j.status === 'draft').length.toString(), icon: Calendar, color: 'bg-gradient-warning' },
    { title: 'Filled Positions', value: jobPostings.filter(j => j.status === 'filled').length.toString(), icon: UserCheck, color: 'bg-accent' },
  ];

  const handleCreateJob = async (data: any) => {
    await createJobPosting(data);
    setShowForm(false);
  };

  const handleUpdateJob = async (data: any) => {
    if (editingJob) {
      await updateJobPosting(editingJob.id, data);
      setEditingJob(null);
      setShowForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'draft': return 'secondary';
      case 'paused': return 'outline';
      case 'closed': return 'destructive';
      case 'filled': return 'default';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading job postings...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Recruitment</h1>
          <Button 
            className="bg-gradient-primary"
            onClick={() => {
              setEditingJob(null);
              setShowForm(true);
            }}
          >
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

        {/* Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle>Job Postings ({jobPostings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobPostings.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.department?.name || 'No Department'} • {job.location} • {job.employment_type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingJob(job);
                              setShowForm(true);
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteJobPosting(job.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground">{job.application_count || 0} applicants</span>
                      <Badge variant={getPriorityColor(job.priority)}>
                        {job.priority}
                      </Badge>
                      {job.salary_min && job.salary_max && (
                        <span className="text-muted-foreground">
                          ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Posted {new Date(job.posted_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-1" size={14} />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="mr-1" size={14} />
                      View Applications ({job.application_count || 0})
                    </Button>
                  </div>
                </div>
              ))}

              {jobPostings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No job postings found. Create your first job posting to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <JobPostingForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
          jobPosting={editingJob}
          title={editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
        />
      </div>
    </MainLayout>
  );
}