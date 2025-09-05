import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Users, 
  Search,
  Plus,
  Paperclip,
  Smile
} from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  role: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
}

const mockUsers: ChatUser[] = [
  { id: '1', name: 'Sarah Chen', status: 'online', role: 'Engineering Manager' },
  { id: '2', name: 'Mike Rodriguez', status: 'away', role: 'Senior Developer' },
  { id: '3', name: 'Emily Johnson', status: 'online', role: 'UI/UX Designer' },
  { id: '4', name: 'David Park', status: 'busy', role: 'Product Manager' },
  { id: '5', name: 'Lisa Wong', status: 'online', role: 'HR Specialist' }
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '1',
    content: 'Hey team! Just finished the quarterly review analysis. Looking great overall! 📊',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: 'text'
  },
  {
    id: '2',
    userId: '2',
    content: 'Awesome work Sarah! The new performance tracking system is really paying off.',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    type: 'text'
  },
  {
    id: '3',
    userId: '3',
    content: 'I\'ve updated the employee dashboard designs. Can someone review them?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'text'
  },
  {
    id: '4',
    userId: '4',
    content: 'Will do Emily! Also, we should discuss the Q4 hiring plans in tomorrow\'s meeting.',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    type: 'text'
  }
];

const getStatusColor = (status: ChatUser['status']) => {
  switch (status) {
    case 'online': return 'bg-success';
    case 'away': return 'bg-warning';
    case 'busy': return 'bg-destructive';
    default: return 'bg-muted-foreground';
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const TeamChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };

  return (
    <div className="h-[600px] flex bg-card rounded-lg border overflow-hidden">
      {/* Sidebar - Users List */}
      <div className="w-80 border-r bg-muted/30">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Team Chat
            </h3>
            <Button size="sm" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-9" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                  selectedUser?.id === user.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`}></div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{user.role}</div>
                </div>
                {user.status === 'online' && (
                  <Badge variant="secondary" className="text-xs">Online</Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {selectedUser && (
          <div className="p-4 border-b bg-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedUser.status)}`}></div>
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const user = getUserById(message.userId);
              const isCurrentUser = message.userId === 'current-user';

              return (
                <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!isCurrentUser && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 ${
                      isCurrentUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="sm">
              <Smile className="w-4 h-4" />
            </Button>
            <Button onClick={handleSendMessage} className="bg-gradient-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};