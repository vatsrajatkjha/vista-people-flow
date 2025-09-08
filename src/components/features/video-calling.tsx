import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Users, 
  Share,
  MessageSquare,
  Settings,
  Calendar,
  Clock
} from 'lucide-react';

interface VideoCallProps {
  participants?: Array<{
    id: string;
    name: string;
    avatar?: string;
    isMuted: boolean;
    isVideoOn: boolean;
    isHost: boolean;
  }>;
}

const mockParticipants = [
  { id: '1', name: 'Sarah Chen', avatar: '', isMuted: false, isVideoOn: true, isHost: true },
  { id: '2', name: 'Mike Rodriguez', avatar: '', isMuted: true, isVideoOn: true, isHost: false },
  { id: '3', name: 'Emily Johnson', avatar: '', isMuted: false, isVideoOn: false, isHost: false },
  { id: '4', name: 'David Park', avatar: '', isMuted: false, isVideoOn: true, isHost: false }
];

export const VideoCalling: React.FC<VideoCallProps> = ({ 
  participants = mockParticipants 
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  if (!isCallActive) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="w-5 h-5 mr-2" />
            Video Conferencing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Upcoming Meetings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Team Standup</h4>
                  <Badge variant="outline">15 min</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Starting in 5 minutes</span>
                </div>
                <div className="flex -space-x-2 mb-3">
                  {participants.slice(0, 3).map((participant) => (
                    <Avatar key={participant.id} className="w-8 h-8 border-2 border-background">
                      <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 bg-muted border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+2</span>
                  </div>
                </div>
                <Button onClick={startCall} className="w-full bg-gradient-primary">
                  <Video className="w-4 h-4 mr-2" />
                  Join Meeting
                </Button>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Performance Review</h4>
                  <Badge variant="secondary">45 min</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Today at 2:00 PM</span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">1-on-1 Meeting</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button onClick={startCall} className="flex-1 bg-gradient-primary">
                <Video className="w-4 h-4 mr-2" />
                Start Instant Meeting
              </Button>
              <Button variant="outline" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Team Standup</span>
            <Badge variant="outline">{formatDuration(callDuration)}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {participants.length}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-2 h-full mb-4">
          {participants.map((participant) => (
            <div key={participant.id} className="relative bg-muted rounded-lg overflow-hidden">
              {participant.isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarFallback>
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-muted-foreground">Camera off</p>
                  </div>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                  {participant.name}
                  {participant.isHost && (
                    <Badge variant="secondary" className="ml-1 text-xs">Host</Badge>
                  )}
                </span>
                <div className="flex items-center space-x-1">
                  {!participant.isMuted ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Mic className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <MicOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 pt-4 border-t">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 rounded-full"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Button
            variant={!isVideoOn ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="w-12 h-12 rounded-full"
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>
          
          <Button
            variant={isScreenSharing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="w-12 h-12 rounded-full"
          >
            <Share className="w-5 h-5" />
          </Button>
          
          <Button variant="outline" size="sm" className="w-12 h-12 rounded-full">
            <MessageSquare className="w-5 h-5" />
          </Button>
          
          <Button variant="outline" size="sm" className="w-12 h-12 rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={endCall}
            variant="destructive"
            size="sm"
            className="w-12 h-12 rounded-full"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};