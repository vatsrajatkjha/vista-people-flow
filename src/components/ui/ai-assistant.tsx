import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Calendar,
  MessageSquare,
  X
} from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AI_SUGGESTIONS = [
  "Show me employee performance insights",
  "What's our current turnover trend?",
  "Generate this month's payroll report",
  "Schedule team performance reviews",
  "Analyze recruitment pipeline"
];

const AI_RESPONSES = [
  "Based on current data, I notice 3 employees might benefit from skill development programs. Would you like me to create personalized learning paths?",
  "Your turnover rate has decreased by 15% this quarter. The main retention factors are flexible work and career growth opportunities.",
  "I've identified potential budget savings of $12K in your Q4 hiring plan. Should I prepare the optimization report?",
  "Your team productivity increased 23% after implementing the new feedback system. Consider expanding it company-wide.",
  "I recommend scheduling 1-on-1s with Sarah and Mike - their engagement scores suggest they might be at risk."
];

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hi! I'm your HR Assistant. I can help you with insights, reports, and smart recommendations. How can I assist you today?",
      timestamp: new Date(),
      suggestions: AI_SUGGESTIONS.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date(),
        suggestions: AI_SUGGESTIONS.slice(Math.floor(Math.random() * 2), Math.floor(Math.random() * 2) + 3)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50 animate-scale-in">
      <Card className="h-full flex flex-col backdrop-blur-lg bg-card/95 border shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold">HR AI Assistant</h3>
              <p className="text-xs text-white/80">Smart insights & automation</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X size={16} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.type === 'ai' ? 'bg-primary text-white' : 'bg-accent'}>
                    {message.type === 'ai' ? <Bot size={14} /> : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-primary text-white' : 'bg-muted'}`}>
                  <p className="text-sm">{message.content}</p>
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-2"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Sparkles size={12} className="mr-1 flex-shrink-0" />
                          <span className="text-xs">{suggestion}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white">
                  <Bot size={14} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about HR..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage(inputValue)} className="bg-gradient-primary">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};