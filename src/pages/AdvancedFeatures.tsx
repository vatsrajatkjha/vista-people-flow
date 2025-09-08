import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdvancedAnalytics } from '@/components/features/advanced-analytics';
import { TeamChat } from '@/components/features/team-chat';
import { DocumentManager } from '@/components/features/document-manager';
import { VideoCalling } from '@/components/features/video-calling';
import { AIRecruitment } from '@/components/features/ai-recruitment';
import { WorkflowAutomation } from '@/components/features/workflow-automation';
import { WellnessTracking } from '@/components/features/wellness-tracking';
import { 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Calendar,
  Users,
  Zap,
  Video,
  Brain,
  Heart
} from 'lucide-react';

const AdvancedFeatures = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero rounded-xl p-8 text-white relative overflow-hidden shadow-glow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="max-w-4xl relative z-10">
            <h1 className="text-4xl font-bold mb-3 flex items-center">
              Advanced Features
              <span className="ml-2">🚀</span>
            </h1>
            <p className="text-white/90 text-lg">
              Cutting-edge tools to transform your HR operations
            </p>
          </div>
        </div>

        {/* Feature Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 h-auto p-1">
            <TabsTrigger value="analytics" className="flex items-center space-x-2 px-4 py-3">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2 px-4 py-3">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2 px-4 py-3">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Docs</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center space-x-2 px-4 py-3">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="flex items-center space-x-2 px-4 py-3">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">AI Recruit</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center space-x-2 px-4 py-3">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Workflow</span>
            </TabsTrigger>
            <TabsTrigger value="wellness" className="flex items-center space-x-2 px-4 py-3">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wellness</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2 px-4 py-3">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center space-x-2 px-4 py-3">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Collab</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <TeamChat />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentManager />
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <VideoCalling />
          </TabsContent>

          <TabsContent value="recruitment" className="space-y-6">
            <AIRecruitment />
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <WorkflowAutomation />
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <WellnessTracking />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Calendar Integration</h3>
              <p className="text-muted-foreground">Coming soon - Integrated calendar and scheduling system</p>
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Advanced Collaboration</h3>
              <p className="text-muted-foreground">Coming soon - Enhanced team collaboration tools</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdvancedFeatures;