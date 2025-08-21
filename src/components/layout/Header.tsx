import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search employees, jobs..." 
            className="pl-10 w-80"
          />
        </div>

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