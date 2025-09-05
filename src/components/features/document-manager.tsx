import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  MoreHorizontal,
  Calendar,
  User,
  Eye,
  Star,
  FolderOpen
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'policy' | 'report' | 'form' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  isStarred: boolean;
  isConfidential: boolean;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Employee Handbook 2024.pdf',
    type: 'policy',
    size: '2.4 MB',
    uploadedBy: 'Sarah Chen',
    uploadedAt: new Date('2024-01-15'),
    tags: ['handbook', 'policies', 'onboarding'],
    isStarred: true,
    isConfidential: false
  },
  {
    id: '2',
    name: 'Q4 Performance Report.xlsx',
    type: 'report',
    size: '856 KB',
    uploadedBy: 'Mike Rodriguez',
    uploadedAt: new Date('2024-01-10'),
    tags: ['performance', 'quarterly', 'analytics'],
    isStarred: false,
    isConfidential: true
  },
  {
    id: '3',
    name: 'Remote Work Policy.docx',
    type: 'policy',
    size: '124 KB',
    uploadedBy: 'Emily Johnson',
    uploadedAt: new Date('2024-01-08'),
    tags: ['remote work', 'policy', 'covid'],
    isStarred: true,
    isConfidential: false
  },
  {
    id: '4',
    name: 'Employment Contract Template.pdf',
    type: 'contract',
    size: '445 KB',
    uploadedBy: 'Lisa Wong',
    uploadedAt: new Date('2024-01-05'),
    tags: ['contract', 'template', 'legal'],
    isStarred: false,
    isConfidential: true
  },
  {
    id: '5',
    name: 'Training Feedback Form.pdf',
    type: 'form',
    size: '89 KB',
    uploadedBy: 'David Park',
    uploadedAt: new Date('2024-01-03'),
    tags: ['training', 'feedback', 'form'],
    isStarred: false,
    isConfidential: false
  }
];

const getTypeColor = (type: Document['type']) => {
  switch (type) {
    case 'contract': return 'bg-destructive/10 text-destructive';
    case 'policy': return 'bg-primary/10 text-primary';
    case 'report': return 'bg-success/10 text-success';
    case 'form': return 'bg-warning/10 text-warning';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getTypeIcon = (type: Document['type']) => {
  switch (type) {
    case 'contract': return '📋';
    case 'policy': return '📘';
    case 'report': return '📊';
    case 'form': return '📝';
    default: return '📄';
  }
};

export const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [documents, setDocuments] = useState(mockDocuments);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleStar = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Document Manager
          </h2>
          <p className="text-muted-foreground mt-2">
            Centralized document storage and management system
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedType === 'all' ? 'All Types' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedType('all')}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType('contract')}>Contracts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType('policy')}>Policies</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType('report')}>Reports</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType('form')}>Forms</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocuments.map((document, index) => (
          <Card key={document.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              {/* Document Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(document.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold truncate">{document.name}</h3>
                    <p className="text-sm text-muted-foreground">{document.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStar(document.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star className={`w-4 h-4 ${document.isStarred ? 'fill-warning text-warning' : ''}`} />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Document Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getTypeColor(document.type)} variant="secondary">
                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                  </Badge>
                  {document.isConfidential && (
                    <Badge variant="destructive" className="text-xs">
                      Confidential
                    </Badge>
                  )}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-1" />
                  {document.uploadedBy}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {document.uploadedAt.toLocaleDateString()}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {document.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {document.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{document.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card className="p-12 text-center">
          <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or upload your first document.
          </p>
        </Card>
      )}
    </div>
  );
};