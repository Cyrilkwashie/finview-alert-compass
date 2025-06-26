
import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  AlertTriangle,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart as RechartsPieChart, Cell, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data for charts
const monthlyData = [
  { month: 'Jan', alerts: 156, transactions: 2340, falsePositives: 23 },
  { month: 'Feb', alerts: 142, transactions: 2180, falsePositives: 19 },
  { month: 'Mar', alerts: 178, transactions: 2890, falsePositives: 27 },
  { month: 'Apr', alerts: 134, transactions: 2456, falsePositives: 21 },
  { month: 'May', alerts: 167, transactions: 2670, falsePositives: 25 },
  { month: 'Jun', alerts: 189, transactions: 3120, falsePositives: 31 }
];

const riskScoreData = [
  { range: 'Low (0-40)', count: 1547, percentage: 62, color: '#10b981' },
  { range: 'Medium (41-70)', count: 649, percentage: 26, color: '#f59e0b' },
  { range: 'High (71-90)', count: 224, percentage: 9, color: '#f97316' },
  { range: 'Critical (91-100)', count: 75, percentage: 3, color: '#ef4444' }
];

const alertTypeData = [
  { type: 'AML', count: 156, trend: 12 },
  { type: 'Fraud', count: 89, trend: -8 },
  { type: 'Sanctions', count: 34, trend: 5 },
  { type: 'KYC', count: 23, trend: -3 }
];

const detectionAccuracyData = [
  { week: 'Week 1', accuracy: 94.2, falsePositives: 5.8 },
  { week: 'Week 2', accuracy: 95.1, falsePositives: 4.9 },
  { week: 'Week 3', accuracy: 96.7, falsePositives: 3.3 },
  { week: 'Week 4', accuracy: 94.8, falsePositives: 5.2 }
];

const chartConfig = {
  alerts: { label: 'Alerts', color: '#3b82f6' },
  transactions: { label: 'Transactions', color: '#10b981' },
  falsePositives: { label: 'False Positives', color: '#ef4444' },
  accuracy: { label: 'Accuracy %', color: '#8b5cf6' }
};

const Analytics = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
              <p className="text-slate-400 mt-1">Behavioral analysis and predictive insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Detection Rate</p>
                  <p className="text-3xl font-bold text-white mt-2">94.2%</p>
                  <p className="text-sm mt-2 text-green-400">+2.1% this month</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-green-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">False Positives</p>
                  <p className="text-3xl font-bold text-white mt-2">3.8%</p>
                  <p className="text-sm mt-2 text-green-400">-0.5% improvement</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-yellow-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Processing Time</p>
                  <p className="text-3xl font-bold text-white mt-2">1.2s</p>
                  <p className="text-sm mt-2 text-green-400">-0.3s faster</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-blue-500">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Model Accuracy</p>
                  <p className="text-3xl font-bold text-white mt-2">96.7%</p>
                  <p className="text-sm mt-2 text-green-400">+1.4% this week</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-purple-500">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Alerts Trend */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Monthly Alert Trends
              </h3>
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="alerts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>

            {/* Risk Score Distribution */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Risk Score Distribution
              </h3>
              <ChartContainer config={chartConfig} className="h-80">
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <RechartsPieChart data={riskScoreData}>
                    {riskScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {riskScoreData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-300">{item.range}: {item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detection Accuracy Over Time */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Detection Accuracy & False Positives Trend
            </h3>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={detectionAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Accuracy %"
                />
                <Line 
                  type="monotone" 
                  dataKey="falsePositives" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="False Positives %"
                />
              </LineChart>
            </ChartContainer>
          </div>

          {/* Transaction Volume Analysis */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Transaction Volume vs Alert Generation
            </h3>
            <ChartContainer config={chartConfig} className="h-80">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.3}
                  name="Transactions"
                />
                <Area 
                  type="monotone" 
                  dataKey="alerts" 
                  stackId="2"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Alerts"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Alert Types Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Alert Types Analysis</h3>
              <div className="space-y-4">
                {alertTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-white">{item.type} Alerts</h4>
                      <p className="text-2xl font-bold text-blue-400">{item.count}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${item.trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {item.trend > 0 ? '+' : ''}{item.trend}%
                      </p>
                      <p className="text-xs text-slate-400">vs last month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Behavioral Analysis Insights</h3>
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Transaction Velocity</h4>
                  <p className="text-2xl font-bold text-blue-400 mb-1">+23%</p>
                  <p className="text-xs text-slate-400">Above normal pattern detected in 12 customers</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Geographic Anomalies</h4>
                  <p className="text-2xl font-bold text-yellow-400 mb-1">8</p>
                  <p className="text-xs text-slate-400">Unusual location patterns this week</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Network Connections</h4>
                  <p className="text-2xl font-bold text-purple-400 mb-1">45</p>
                  <p className="text-xs text-slate-400">Potential connected accounts identified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">ML Model Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-white">AML Detection Model</h4>
                  <p className="text-xs text-slate-400">Last updated: 2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">96.2%</p>
                  <p className="text-xs text-slate-400">Accuracy</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-white">Fraud Detection Model</h4>
                  <p className="text-xs text-slate-400">Last updated: 4 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">94.8%</p>
                  <p className="text-xs text-slate-400">Accuracy</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-white">Risk Scoring Model</h4>
                  <p className="text-xs text-slate-400">Last updated: 6 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-400">91.5%</p>
                  <p className="text-xs text-slate-400">Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
