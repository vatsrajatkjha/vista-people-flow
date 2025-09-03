import { MainLayout } from '@/components/layout/MainLayout';
import { ModernDashboardStats } from '@/components/dashboard/ModernDashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { EmployeeOverview } from '@/components/dashboard/EmployeeOverview';
import { GamificationDashboard } from '@/components/ui/gamification';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section with AI Insights */}
        <div className="bg-gradient-primary rounded-xl p-8 text-white relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="max-w-4xl relative z-10">
            <h1 className="text-3xl font-bold mb-3 flex items-center">
              Welcome back, John! 
              <span className="ml-2 animate-float">👋</span>
            </h1>
            <p className="text-white/90 text-lg mb-4">
              Here's what's happening with your team today. AI suggests focusing on 3 pending reviews and 2 high-potential candidates.
            </p>
            <div className="flex space-x-4 text-sm">
              <div className="bg-white/20 px-3 py-1 rounded-full">📊 Team productivity: +23%</div>
              <div className="bg-white/20 px-3 py-1 rounded-full">🎯 Goals on track: 89%</div>
              <div className="bg-white/20 px-3 py-1 rounded-full">⚡ Quick wins available: 3</div>
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

        {/* Employee Overview */}
        <EmployeeOverview />
      </div>
    </MainLayout>
  );
};

export default Index;
