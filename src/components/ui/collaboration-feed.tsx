import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Clock,
  Users,
  Target,
  TrendingUp,
  FileText,
  Camera,
  Smile
} from 'lucide-react';

interface CollaborationPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    department: string;
  };
  content: string;
  type: 'update' | 'achievement' | 'question' | 'announcement' | 'celebration';
  timestamp: Date;
  likes: number;
  comments: number;
  liked: boolean;
  tags?: string[];
  attachments?: string[];
}

const FEED_DATA: CollaborationPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Senior Developer',
      department: 'Engineering'
    },
    content: 'Just completed the new authentication system! 🎉 Big thanks to the security team for their guidance. This will improve our user onboarding by 40%.',
    type: 'achievement',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 12,
    comments: 5,
    liked: true,
    tags: ['Security', 'Frontend', 'Achievement'],
    attachments: ['screenshot.png']
  },
  {
    id: '2',
    author: {
      name: 'Mike Chen',
      avatar: 'MC',
      role: 'Product Manager',
      department: 'Product'
    },
    content: 'Looking for feedback on the new user dashboard design. Anyone from UX team available for a quick review this afternoon?',
    type: 'question',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 8,
    comments: 3,
    liked: false,
    tags: ['Design', 'UX', 'Feedback']
  },
  {
    id: '3',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'ER',
      role: 'HR Manager',
      department: 'Human Resources'
    },
    content: '🎂 Happy work anniversary to Alex Thompson! 3 amazing years with us. Thank you for your dedication and innovation!',
    type: 'celebration',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    likes: 25,
    comments: 8,
    liked: true,
    tags: ['Anniversary', 'Recognition']
  },
  {
    id: '4',
    author: {
      name: 'David Kim',
      avatar: 'DK',
      role: 'Team Lead',
      department: 'Engineering'
    },
    content: 'Sprint retrospective insights: Our velocity improved by 23% this sprint! Key factors were better story estimation and reduced context switching.',
    type: 'update',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    likes: 15,
    comments: 4,
    liked: false,
    tags: ['Agile', 'Performance', 'Insights']
  }
];

const getPostTypeColor = (type: CollaborationPost['type']) => {
  switch (type) {
    case 'achievement': return 'bg-success/10 text-success border-success/20';
    case 'question': return 'bg-primary/10 text-primary border-primary/20';
    case 'celebration': return 'bg-warning/10 text-warning border-warning/20';
    case 'announcement': return 'bg-destructive/10 text-destructive border-destructive/20';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getPostTypeIcon = (type: CollaborationPost['type']) => {
  switch (type) {
    case 'achievement': return Target;
    case 'question': return MessageCircle;
    case 'celebration': return Heart;
    case 'announcement': return TrendingUp;
    default: return FileText;
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

export const CollaborationFeed = () => {
  const [posts, setPosts] = useState<CollaborationPost[]>(FEED_DATA);
  const [newPost, setNewPost] = useState('');
  const [showComposer, setShowComposer] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              liked: !post.liked, 
              likes: post.liked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: CollaborationPost = {
      id: Date.now().toString(),
      author: {
        name: 'John Doe',
        avatar: 'JD',
        role: 'HR Director',
        department: 'Human Resources'
      },
      content: newPost,
      type: 'update',
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setShowComposer(false);
  };

  return (
    <div className="space-y-6">
      {/* Post Composer */}
      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground"
                onClick={() => setShowComposer(!showComposer)}
              >
                <Plus size={16} className="mr-2" />
                Share an update with your team...
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {showComposer && (
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening with your work? Share achievements, ask questions, or celebrate wins!"
                className="min-h-[100px]"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Camera size={16} className="mr-1" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText size={16} className="mr-1" />
                    Document
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile size={16} className="mr-1" />
                    Emoji
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowComposer(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary"
                    onClick={handleCreatePost}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          const PostTypeIcon = getPostTypeIcon(post.type);
          
          return (
            <Card 
              key={post.id} 
              className="animate-fade-in hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPostTypeColor(post.type)}`}
                      >
                        <PostTypeIcon size={10} className="mr-1" />
                        {post.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {post.author.role} • {post.author.department}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={12} className="mr-1" />
                    {formatTimeAgo(post.timestamp)}
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-foreground leading-relaxed">{post.content}</p>
                  
                  {/* Tags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Attachments */}
                  {post.attachments && (
                    <div className="mt-3 p-2 bg-muted rounded-lg">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText size={14} className="mr-1" />
                        {post.attachments[0]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`${post.liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                    >
                      <Heart 
                        size={16} 
                        className={`mr-1 ${post.liked ? 'fill-current' : ''}`} 
                      />
                      {post.likes}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageCircle size={16} className="mr-1" />
                      {post.comments}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share2 size={16} className="mr-1" />
                      Share
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {post.likes} likes • {post.comments} comments
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};