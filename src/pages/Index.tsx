import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { EmployeeOverview } from '@/components/dashboard/EmployeeOverview';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-xl p-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-white/90 text-lg">
              Here's what's happening with your team today. You have 3 pending reviews and 2 new applications to review.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
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
