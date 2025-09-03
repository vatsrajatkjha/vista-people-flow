import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchComponent } from '@/components/ui/search';
import { AIAssistant } from '@/components/ui/ai-assistant';
import { SmartNotificationsPanel, NotificationBell } from '@/components/ui/smart-notifications';
import { Bell, Settings, User, Bot, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const [showAI, setShowAI] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
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
        <SearchComponent />
        
        {/* AI Assistant Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowAI(!showAI)}
          className="relative group"
        >
          <Bot size={20} className="text-primary group-hover:text-primary-hover" />
          <Sparkles size={12} className="absolute -top-1 -right-1 text-warning animate-float" />
        </Button>
        
        {/* Smart Notifications */}
        <NotificationBell onClick={() => setShowNotifications(!showNotifications)} />
        
        <Button variant="ghost" size="sm">
          <Settings size={20} />
        </Button>
        <Button variant="ghost" size="sm">
          <User size={20} />
        </Button>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant isOpen={showAI} onClose={() => setShowAI(false)} />
      
      {/* Smart Notifications Panel */}
      <SmartNotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </header>
  );
};