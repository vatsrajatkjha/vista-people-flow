import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const analyticsStats = [
  { title: 'Employee Satisfaction', value: '4.2/5', change: '+0.3', icon: TrendingUp, color: 'bg-gradient-primary' },
  { title: 'Turnover Rate', value: '8.5%', change: '-2.1%', icon: Users, color: 'bg-gradient-success' },
  { title: 'Avg Salary Cost', value: '$65K', change: '+5.2%', icon: DollarSign, color: 'bg-gradient-warning' },
  { title: 'Productivity Score', value: '87%', change: '+12%', icon: BarChart3, color: 'bg-accent' },
];

const monthlyData = [
  { month: 'Jan', employees: 145, hires: 8, departures: 3 },
  { month: 'Feb', employees: 150, hires: 10, departures: 5 },
  { month: 'Mar', employees: 155, hires: 12, departures: 7 },
  { month: 'Apr', employees: 160, hires: 9, departures: 4 },
  { month: 'May', employees: 165, hires: 11, departures: 6 },
  { month: 'Jun', employees: 168, hires: 7, departures: 4 },
];

const departmentData = [
  { name: 'Engineering', value: 45, color: '#0ea5e9' },
  { name: 'Sales', value: 25, color: '#10b981' },
  { name: 'Marketing', value: 15, color: '#f59e0b' },
  { name: 'HR', value: 8, color: '#ef4444' },
  { name: 'Finance', value: 7, color: '#8b5cf6' },
];

const performanceData = [
  { month: 'Jan', score: 82 },
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 83 },
  { month: 'Apr', score: 87 },
  { month: 'May', score: 89 },
  { month: 'Jun', score: 87 },
];

export default function Analytics() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Workforce Analytics</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2" size={16} />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2" size={16} />
              Date Range
            </Button>
            <Button className="bg-gradient-primary">
              <Download className="mr-2" size={16} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <stat.icon size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="employees" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hiring vs Departures */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring vs Departures</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hires" fill="#10b981" name="Hires" />
                  <Bar dataKey="departures" fill="#ef4444" name="Departures" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Average Performance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}