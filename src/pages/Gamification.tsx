import { MainLayout } from '@/components/layout/MainLayout';
import { GamificationDashboard } from '@/components/ui/gamification';

export default function Gamification() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employee Gamification</h1>
            <p className="text-muted-foreground mt-1">Track progress, unlock achievements, and compete with colleagues</p>
          </div>
        </div>

        <GamificationDashboard />
      </div>
    </MainLayout>
  );
}