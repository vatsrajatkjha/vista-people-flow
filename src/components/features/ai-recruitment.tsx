import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
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
  Zap
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  matchScore: number;
  aiInsights: string[];
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired';
  avatar?: string;
  salary: string;
  availability: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    position: 'Senior React Developer',
    location: 'San Francisco, CA',
    experience: '5+ years',
    education: 'BS Computer Science - Stanford',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    matchScore: 95,
    aiInsights: [
      'Strong technical background with React ecosystem',
      'Previous experience with similar company size',
      'Cultural fit score: 92%'
    ],
    status: 'new',
    salary: '$120k - $140k',
    availability: 'Available in 2 weeks'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    position: 'UX Designer',
    location: 'Austin, TX',
    experience: '4 years',
    education: 'MFA Design - RISD',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    matchScore: 88,
    aiInsights: [
      'Excellent portfolio with B2B SaaS experience',
      'Strong user research methodology',
      'Remote work experience: 3+ years'
    ],
    status: 'screening',
    salary: '$85k - $100k',
    availability: 'Available immediately'
  },
  {
    id: '3',
    name: 'James Chen',
    position: 'DevOps Engineer',
    location: 'Seattle, WA',
    experience: '6 years',
    education: 'MS Software Engineering - CMU',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
    matchScore: 91,
    aiInsights: [
      'Proven experience scaling infrastructure',
      'Strong automation and security practices',
      'Leadership potential identified'
    ],
    status: 'interview',
    salary: '$130k - $150k',
    availability: 'Available in 1 month'
  }
];

const getStatusColor = (status: Candidate['status']) => {
  switch (status) {
    case 'new': return 'bg-blue-500';
    case 'screening': return 'bg-yellow-500';
    case 'interview': return 'bg-purple-500';
    case 'offer': return 'bg-green-500';
    case 'hired': return 'bg-emerald-500';
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
    default: return 'Unknown';
  }
};

export const AIRecruitment = () => {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
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
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Active Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-sm text-muted-foreground">High-Match Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12 days</div>
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

      {/* Candidates Grid */}
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
                <Badge variant="secondary" className={`${getStatusColor(candidate.status)} text-white`}>
                  {getStatusLabel(candidate.status)}
                </Badge>
              </div>

              {/* AI Match Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-primary" />
                    AI Match Score
                  </span>
                  <span className="text-sm font-bold text-primary">{candidate.matchScore}%</span>
                </div>
                <Progress value={candidate.matchScore} className="h-2" />
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {candidate.experience}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {candidate.education}
                </div>
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
              <div className="mb-4">
                <div className="text-sm font-medium mb-2 flex items-center">
                  <Brain className="w-4 h-4 mr-1 text-primary" />
                  AI Insights
                </div>
                <div className="text-xs text-muted-foreground">
                  {candidate.aiInsights[0]}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-gradient-primary">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                    <span className="font-bold text-primary">{selectedCandidate.matchScore}%</span>
                  </div>
                  <Progress value={selectedCandidate.matchScore} className="mb-3" />
                  <div className="space-y-1">
                    {selectedCandidate.aiInsights.map((insight, index) => (
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
                      {selectedCandidate.experience}
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
                    <div className="font-medium text-primary">{selectedCandidate.salary}</div>
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
                <Button className="flex-1 bg-gradient-primary">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};