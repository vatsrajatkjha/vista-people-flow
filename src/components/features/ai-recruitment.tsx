import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCandidates, type Candidate } from '@/hooks/useCandidates';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Brain, 
  Users, 
  Star, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  MessageSquare,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone
} from 'lucide-react';

const candidateFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  experience_years: z.number().min(0).max(50),
  education: z.string().optional(),
  skills: z.string().min(1, 'Skills are required'),
  salary_expectation: z.string().optional(),
  availability: z.string().optional(),
  cover_letter: z.string().optional(),
});

type CandidateFormData = z.infer<typeof candidateFormSchema>;

const getStatusColor = (status: Candidate['status']) => {
  switch (status) {
    case 'new': return 'bg-blue-500';
    case 'screening': return 'bg-yellow-500';
    case 'interview': return 'bg-purple-500';
    case 'offer': return 'bg-green-500';
    case 'hired': return 'bg-emerald-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusLabel = (status: Candidate['status']) => {
  switch (status) {
    case 'new': return 'New Application';
    case 'screening': return 'In Screening';
    case 'interview': return 'Interview Stage';
    case 'offer': return 'Offer Extended';
    case 'hired': return 'Hired';
    case 'rejected': return 'Rejected';
    default: return 'Unknown';
  }
};

export const AIRecruitment = () => {
  const { candidates, loading, createCandidate, updateCandidate, deleteCandidate, updateCandidateStatus, generateAIInsights } = useCandidates();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      location: '',
      experience_years: 0,
      education: '',
      skills: '',
      salary_expectation: '',
      availability: '',
      cover_letter: '',
    },
  });

  const handleAddCandidate = async (data: CandidateFormData) => {
    try {
      await createCandidate({
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        location: data.location,
        experience_years: data.experience_years,
        education: data.education,
        skills: data.skills.split(',').map(s => s.trim()),
        salary_expectation: data.salary_expectation,
        availability: data.availability,
        cover_letter: data.cover_letter,
        match_score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
        ai_insights: [],
        status: 'new',
      });
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleEditCandidate = async (data: CandidateFormData) => {
    if (!editingCandidate) return;
    try {
      await updateCandidate(editingCandidate.id, {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
      });
      setIsEditDialogOpen(false);
      setEditingCandidate(null);
      form.reset();
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const openEditDialog = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    form.reset({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone || '',
      position: candidate.position,
      location: candidate.location || '',
      experience_years: candidate.experience_years,
      education: candidate.education || '',
      skills: candidate.skills.join(', '),
      salary_expectation: candidate.salary_expectation || '',
      availability: candidate.availability || '',
      cover_letter: candidate.cover_letter || '',
    });
    setIsEditDialogOpen(true);
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalCandidates = candidates.length;
  const averageMatchScore = candidates.length > 0 
    ? candidates.reduce((sum, c) => sum + c.match_score, 0) / candidates.length 
    : 0;
  const highMatchCandidates = candidates.filter(c => c.match_score >= 85).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI-Powered Recruitment
          </h2>
          <p className="text-muted-foreground mt-2">
            Smart candidate matching and automated screening
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        <Button className="bg-gradient-primary" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Brain className="w-5 h-5 mr-2" />
            AI Recruitment Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalCandidates}</div>
                <div className="text-sm text-muted-foreground">Total Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{averageMatchScore.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Average Match Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{highMatchCandidates}</div>
                <div className="text-sm text-muted-foreground">High-Match Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8 days</div>
                <div className="text-sm text-muted-foreground">Avg. Hire Time</div>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name, position, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading candidates...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCandidate(candidate)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={`${getStatusColor(candidate.status)} text-white`}>
                      {getStatusLabel(candidate.status)}
                    </Badge>
                  </div>
                </div>

                {/* AI Match Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-1 text-primary" />
                      AI Match Score
                    </span>
                    <span className="text-sm font-bold text-primary">{candidate.match_score}%</span>
                  </div>
                  <Progress value={candidate.match_score} className="h-2" />
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  {candidate.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {candidate.location}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {candidate.experience_years} years experience
                  </div>
                  {candidate.education && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {candidate.education}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* AI Insights */}
                {candidate.ai_insights.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2 flex items-center">
                      <Brain className="w-4 h-4 mr-1 text-primary" />
                      AI Insights
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {candidate.ai_insights[0]}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`mailto:${candidate.email}`, '_blank');
                    }}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(candidate);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this candidate?')) {
                        deleteCandidate(candidate.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                    <p className="text-muted-foreground">{selectedCandidate.position}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedCandidate(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Match Score */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-primary" />
                  AI Match Analysis
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Overall Match Score</span>
                    <span className="font-bold text-primary">{selectedCandidate.match_score}%</span>
                  </div>
                  <Progress value={selectedCandidate.match_score} className="mb-3" />
                  <div className="space-y-1">
                    {selectedCandidate.ai_insights.map((insight, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      {selectedCandidate.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                      {selectedCandidate.experience_years} years experience
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
                      {selectedCandidate.education}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Availability & Salary</h4>
                  <div className="space-y-2 text-sm">
                    <div>{selectedCandidate.availability}</div>
                    <div className="font-medium text-primary">{selectedCandidate.salary_expectation}</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold mb-2">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Select value={selectedCandidate.status} onValueChange={(value) => updateCandidateStatus(selectedCandidate.id, value as Candidate['status'])}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-gradient-primary"
                  onClick={() => generateAIInsights(selectedCandidate.id)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Insights
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedCandidate.email}`, '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (selectedCandidate.phone) {
                      window.open(`tel:${selectedCandidate.phone}`, '_blank');
                    }
                  }}
                  disabled={!selectedCandidate.phone}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Candidate Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddCandidate)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience_years"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input placeholder="BS Computer Science - MIT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="React, TypeScript, Node.js, Python" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salary_expectation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Expectation</FormLabel>
                      <FormControl>
                        <Input placeholder="$100k - $120k" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl>
                        <Input placeholder="Available immediately" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="cover_letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief cover letter..." {...field} />
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
                  Add Candidate
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Candidate Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditCandidate)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience_years"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salary_expectation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Expectation</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="cover_letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
                  Update Candidate
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};