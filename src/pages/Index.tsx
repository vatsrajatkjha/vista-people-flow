import { MainLayout } from '@/components/layout/MainLayout';
import { ModernDashboardStats } from '@/components/dashboard/ModernDashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { EmployeeOverview } from '@/components/dashboard/EmployeeOverview';
import { GamificationDashboard } from '@/components/ui/gamification';
import { AdvancedAnalytics } from '@/components/features/advanced-analytics';
import { TeamChat } from '@/components/features/team-chat';
import { DocumentManager } from '@/components/features/document-manager';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section with AI Insights */}
        <div className="bg-gradient-hero rounded-xl p-8 text-white relative overflow-hidden animate-fade-in shadow-glow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="max-w-4xl relative z-10">
            <h1 className="text-4xl font-bold mb-3 flex items-center">
              Welcome back, John! 
              <span className="ml-2 animate-float">👋</span>
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Your AI-powered HRMS is ready to help. Here's what's happening with your team today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  <div>
                    <div className="font-semibold">Team Productivity</div>
                    <div className="text-white/80">+23% this month</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  <div>
                    <div className="font-semibold">Goals Achieved</div>
                    <div className="text-white/80">89% on track</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">⚡</span>
                  <div>
                    <div className="font-semibold">AI Insights</div>
                    <div className="text-white/80">3 recommendations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <ModernDashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
            
            {/* Gamification Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <GamificationDashboard compact />
            </div>
          </div>
          
          {/* Right Column - Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Advanced Features Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Team Chat */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <TeamChat />
          </div>
          
          {/* Quick Analytics Preview */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <AdvancedAnalytics />
          </div>
        </div>

        {/* Employee Overview */}
        <EmployeeOverview />
      </div>
    </MainLayout>
  );
};

export default Index;
