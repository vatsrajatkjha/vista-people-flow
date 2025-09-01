import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Calculator, 
  Download, 
  Send,
  TrendingUp,
  Users,
  Calendar,
  AlertCircle
} from 'lucide-react';

const payrollStats = [
  { title: 'Monthly Payroll', value: '$245,680', icon: DollarSign, color: 'bg-gradient-primary' },
  { title: 'Employees Paid', value: '156', icon: Users, color: 'bg-gradient-success' },
  { title: 'Pending Approvals', value: '8', icon: AlertCircle, color: 'bg-gradient-warning' },
  { title: 'Tax Processed', value: '$52,140', icon: Calculator, color: 'bg-accent' },
];

const payrollCycles = [
  {
    id: 1,
    period: 'January 2024',
    status: 'Completed',
    totalAmount: '$245,680',
    employees: 156,
    processedDate: '2024-01-31',
    progress: 100
  },
  {
    id: 2,
    period: 'February 2024',
    status: 'Processing',
    totalAmount: '$248,320',
    employees: 158,
    processedDate: 'In Progress',
    progress: 75
  },
  {
    id: 3,
    period: 'March 2024',
    status: 'Draft',
    totalAmount: '$251,450',
    employees: 160,
    processedDate: 'Not Started',
    progress: 0
  }
];

const recentPayments = [
  { employee: 'Sarah Johnson', amount: '$4,500', status: 'Paid', date: '2024-01-31' },
  { employee: 'Michael Chen', amount: '$3,800', status: 'Paid', date: '2024-01-31' },
  { employee: 'Emily Rodriguez', amount: '$4,200', status: 'Pending', date: '2024-02-01' },
  { employee: 'David Wilson', amount: '$5,100', status: 'Paid', date: '2024-01-31' },
];

export default function Payroll() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2" size={16} />
              Export Report
            </Button>
            <Button className="bg-gradient-primary">
              <Calculator className="mr-2" size={16} />
              Run Payroll
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {payrollStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <stat.icon size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payroll Cycles */}
          <Card>
            <CardHeader>
              <CardTitle>Payroll Cycles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payrollCycles.map((cycle) => (
                  <div key={cycle.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{cycle.period}</h3>
                        <p className="text-sm text-muted-foreground">{cycle.employees} employees • {cycle.totalAmount}</p>
                      </div>
                      <Badge variant={
                        cycle.status === 'Completed' ? 'default' : 
                        cycle.status === 'Processing' ? 'secondary' : 
                        'outline'
                      }>
                        {cycle.status}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{cycle.progress}%</span>
                      </div>
                      <Progress value={cycle.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        <Calendar size={12} className="inline mr-1" />
                        {cycle.processedDate}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {cycle.status === 'Completed' && (
                          <Button size="sm" variant="outline">
                            <Send className="mr-1" size={14} />
                            Send Slips
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div>
                      <h4 className="font-medium text-foreground">{payment.employee}</h4>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{payment.amount}</p>
                      <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}