import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, User, Briefcase, Calendar, DollarSign } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'employee' | 'job' | 'task' | 'document';
  description: string;
  url?: string;
}

interface SearchProps {
  onSelect?: (result: SearchResult) => void;
}

const mockResults: SearchResult[] = [
  { id: '1', title: 'Sarah Johnson', type: 'employee', description: 'Senior Developer - Engineering', url: '/employees' },
  { id: '2', title: 'Frontend Developer Position', type: 'job', description: 'Open position in Engineering', url: '/recruitment' },
  { id: '3', title: 'Q1 Performance Reviews', type: 'task', description: 'Due February 28, 2024', url: '/performance' },
  { id: '4', title: 'Employee Handbook', type: 'document', description: 'Company policies and procedures', url: '/compliance' },
  { id: '5', title: 'Michael Chen', type: 'employee', description: 'UX Designer - Design Team', url: '/employees' },
  { id: '6', title: 'Payroll Processing', type: 'task', description: 'Monthly payroll for January', url: '/payroll' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'employee': return User;
    case 'job': return Briefcase;
    case 'task': return Calendar;
    case 'document': return DollarSign;
    default: return Search;
  }
};

export const SearchComponent: React.FC<SearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    if (onSelect) {
      onSelect(result);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search employees, jobs, tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 w-80"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X size={14} />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {results.slice(0, 5).map((result) => {
                const Icon = getIcon(result.type);
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <Icon size={16} className="text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};