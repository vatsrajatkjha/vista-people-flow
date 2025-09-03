import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award, 
  TrendingUp,
  Users,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'bronze' | 'silver' | 'gold' | 'diamond';
  xp: number;
}

interface UserStats {
  level: number;
  xp: number;
  nextLevelXP: number;
  streak: number;
  completedTasks: number;
  rank: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Team Player',
    description: 'Complete 10 team collaborations',
    icon: Users,
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    rarity: 'bronze',
    xp: 50
  },
  {
    id: '2',
    title: 'Perfect Attendance',
    description: 'Maintain 30-day attendance streak',
    icon: Calendar,
    progress: 30,
    maxProgress: 30,
    unlocked: true,
    rarity: 'gold',
    xp: 200
  },
  {
    id: '3',
    title: 'Goal Crusher',
    description: 'Complete all quarterly objectives',
    icon: Target,
    progress: 8,
    maxProgress: 10,
    unlocked: false,
    rarity: 'silver',
    xp: 150
  },
  {
    id: '4',
    title: 'Innovation Master',
    description: 'Submit 5 process improvements',
    icon: Zap,
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    rarity: 'diamond',
    xp: 300
  }
];

const USER_STATS: UserStats = {
  level: 12,
  xp: 2450,
  nextLevelXP: 2800,
  streak: 15,
  completedTasks: 47,
  rank: 'Senior Contributor'
};

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'silver': return 'bg-slate-100 text-slate-800 border-slate-300';
    case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'diamond': return 'bg-blue-100 text-blue-800 border-blue-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getRarityGradient = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'bronze': return 'from-amber-400 to-orange-500';
    case 'silver': return 'from-slate-400 to-slate-600';
    case 'gold': return 'from-yellow-400 to-amber-500';
    case 'diamond': return 'from-blue-400 to-indigo-600';
    default: return 'from-gray-400 to-gray-600';
  }
};

interface GamificationDashboardProps {
  compact?: boolean;
}

export const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Trophy size={20} className="mr-2 text-primary" />
              Your Progress
            </span>
            <Badge className="bg-gradient-primary">Level {USER_STATS.level}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>XP Progress</span>
                <span>{USER_STATS.xp}/{USER_STATS.nextLevelXP}</span>
              </div>
              <Progress value={(USER_STATS.xp / USER_STATS.nextLevelXP) * 100} className="h-2" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{USER_STATS.streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{USER_STATS.completedTasks}</div>
                <div className="text-xs text-muted-foreground">Tasks Done</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Stats */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="p-2 bg-gradient-primary rounded-lg text-white mr-3">
              <Trophy size={24} />
            </div>
            <div>
              <h2 className="text-xl">Player Profile</h2>
              <p className="text-sm text-muted-foreground">{USER_STATS.rank}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">{USER_STATS.level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-success mb-1">{USER_STATS.xp}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-warning mb-1">{USER_STATS.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-accent mb-1">{USER_STATS.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Level {USER_STATS.level} Progress</span>
              <span>{USER_STATS.xp}/{USER_STATS.nextLevelXP} XP</span>
            </div>
            <Progress 
              value={(USER_STATS.xp / USER_STATS.nextLevelXP) * 100} 
              className="h-3 bg-muted"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {USER_STATS.nextLevelXP - USER_STATS.xp} XP to next level
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Award size={20} className="mr-2" />
              Achievements
            </span>
            <Button variant="outline" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {ACHIEVEMENTS.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    achievement.unlocked ? 'bg-success/5 border-success/20' : 'bg-muted/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getRarityGradient(achievement.rarity)} text-white`}>
                        <IconComponent size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                          </Badge>
                          {achievement.unlocked && (
                            <CheckCircle2 size={16} className="text-success" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        
                        {!achievement.unlocked && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100}
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">+{achievement.xp} XP</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};