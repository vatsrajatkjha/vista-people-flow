import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bell, 
  X, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Calendar,
  DollarSign,
  MessageSquare,
  FileText,
  Zap
} from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'urgent' | 'info' | 'success' | 'warning' | 'ai-insight';
  title: string;
  message: string;
  timestamp: Date;
  actionLabel?: string;
  onAction?: () => void;
  icon: any;
  priority: 'high' | 'medium' | 'low';
  category: 'hr' | 'payroll' | 'performance' | 'recruitment' | 'system';
  read: boolean;
}

const MOCK_NOTIFICATIONS: SmartNotification[] = [
  {
    id: '1',
    type: 'ai-insight',
    title: 'AI Insight: Performance Trend',
    message: 'Sarah Johnson\'s performance metrics show 25% improvement. Consider her for the senior role.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    icon: Zap,
    priority: 'high',
    category: 'performance',
    read: false,
    actionLabel: 'Review Profile',
    onAction: () => console.log('Navigate to Sarah\'s profile')
  },
  {
    id: '2',
    type: 'urgent',
    title: 'Payroll Review Required',
    message: 'Monthly payroll for Engineering team needs final approval. Deadline: Today 5 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    icon: DollarSign,
    priority: 'high',
    category: 'payroll',
    read: false,
    actionLabel: 'Approve Now',
    onAction: () => console.log('Navigate to payroll approval')
  },
  {
    id: '3',
    type: 'success',
    title: 'Interview Completed',
    message: 'John Smith completed his final interview. Feedback scores: 4.5/5 average.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    icon: CheckCircle2,
    priority: 'medium',
    category: 'recruitment',
    read: false,
    actionLabel: 'View Feedback',
    onAction: () => console.log('Navigate to interview feedback')
  },
  {
    id: '4',
    type: 'info',
    title: 'Weekly Team Sync',
    message: 'Reminder: Engineering team sync scheduled for tomorrow at 10 AM.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: Calendar,
    priority: 'low',
    category: 'hr',
    read: true,
    actionLabel: 'Add to Calendar'
  },
  {
    id: '5',
    type: 'warning',
    title: 'Low Engagement Alert',
    message: 'Marketing team engagement dropped by 12%. Suggested action: Schedule 1-on-1s.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    icon: AlertTriangle,
    priority: 'medium',
    category: 'performance',
    read: false,
    actionLabel: 'Schedule Meetings'
  }
];

const getNotificationColor = (type: SmartNotification['type']) => {
  switch (type) {
    case 'urgent': return 'border-l-destructive bg-destructive/5';
    case 'success': return 'border-l-success bg-success/5';
    case 'warning': return 'border-l-warning bg-warning/5';
    case 'ai-insight': return 'border-l-primary bg-primary/5';
    default: return 'border-l-muted-foreground bg-muted/5';
  }
};

const getPriorityBadge = (priority: SmartNotification['priority']) => {
  switch (priority) {
    case 'high': return 'bg-destructive text-destructive-foreground';
    case 'medium': return 'bg-warning text-warning-foreground';
    case 'low': return 'bg-muted text-muted-foreground';
  }
};

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

interface SmartNotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartNotificationsPanel: React.FC<SmartNotificationsPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<SmartNotification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read;
      case 'urgent': return notification.priority === 'high';
      default: return true;
    }
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 w-96 max-h-[calc(100vh-5rem)] z-50 animate-slide-in">
      <Card className="backdrop-blur-lg bg-card/95 border shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bell size={20} className="text-primary" />
            <h3 className="font-semibold">Smart Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex p-2 border-b bg-muted/50">
          {(['all', 'unread', 'urgent'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'ghost'}
              size="sm"
              className="flex-1 capitalize"
              onClick={() => setFilter(filterType)}
            >
              {filterType}
              {filterType === 'unread' && unreadCount > 0 && (
                <Badge className="ml-1 bg-background text-foreground">{unreadCount}</Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell size={32} className="mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 transition-all duration-200 hover:bg-accent/50 ${getNotificationColor(notification.type)} ${!notification.read ? 'bg-opacity-100' : 'opacity-70'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-2">
                        <div className="p-1 bg-background rounded">
                          <IconComponent size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <Badge className={`text-xs ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock size={10} className="mr-1" />
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                      
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs h-6 px-2"
                          >
                            Mark Read
                          </Button>
                        )}
                        {notification.actionLabel && (
                          <Button
                            size="sm"
                            onClick={() => {
                              notification.onAction?.();
                              markAsRead(notification.id);
                            }}
                            className="text-xs h-6 px-2 bg-gradient-primary"
                          >
                            {notification.actionLabel}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredNotifications.length > 0 && (
          <div className="p-3 border-t bg-muted/50">
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>
                Mark All Read
              </Button>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export const NotificationBell: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  
  return (
    <Button variant="ghost" size="sm" className="relative" onClick={onClick}>
      <Bell size={20} />
      {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-destructive text-destructive-foreground p-0 flex items-center justify-center animate-pulse-success">
          {unreadCount}
        </Badge>
      )}
    </Button>
  );
};