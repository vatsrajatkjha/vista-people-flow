import { Button } from '@/components/ui/button';
import { Bell, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SearchComponent } from '@/components/ui/search';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/employees': return 'Employees';
      case '/recruitment': return 'Recruitment';
      case '/payroll': return 'Payroll';
      case '/performance': return 'Performance';
      case '/engagement': return 'Engagement';
      case '/analytics': return 'Analytics';
      case '/compliance': return 'Compliance';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <SearchComponent />

        {/* Actions */}
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus size={16} className="mr-2" />
          Quick Add
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
          >
            3
          </Badge>
        </div>
      </div>
    </header>
  );
};