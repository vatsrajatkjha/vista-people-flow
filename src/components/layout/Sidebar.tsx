import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Employees', href: '/employees' },
  { icon: UserCheck, label: 'Recruitment', href: '/recruitment' },
  { icon: DollarSign, label: 'Payroll', href: '/payroll' },
  { icon: TrendingUp, label: 'Performance', href: '/performance' },
  { icon: MessageSquare, label: 'Engagement', href: '/engagement' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: FileText, label: 'Compliance', href: '/compliance' },
  { icon: Zap, label: 'Advanced', href: '/advanced' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HR</span>
            </div>
            <span className="text-sidebar-foreground font-semibold text-lg">HRConnect</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "w-full flex items-center px-3 py-3 rounded-lg text-left transition-all duration-200",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed ? "justify-center" : "space-x-3"
              )}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-sidebar-foreground/70">HR Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};