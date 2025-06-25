
import React from 'react';
import { 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  Users,
  Activity,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import KPICard from '../components/KPICard';
import TransactionTable from '../components/TransactionTable';

const Index = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Transaction Monitoring Dashboard</h1>
              <p className="text-slate-400 mt-1">Real-time compliance monitoring and risk analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-800 px-3 py-2 rounded-lg">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">Live Monitoring</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-white font-medium">January 15, 2024</p>
                <p className="text-xs text-slate-400">Last updated: 2 min ago</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Flagged Transactions"
              value="47"
              change="+12% from yesterday"
              changeType="negative"
              icon={AlertTriangle}
              iconColor="text-red-500"
            />
            <KPICard
              title="Active Cases"
              value="23"
              change="+3 new cases"
              changeType="neutral"
              icon={FileText}
              iconColor="text-orange-500"
            />
            <KPICard
              title="Risk Score Avg"
              value="68"
              change="-5% improvement"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-green-500"
            />
            <KPICard
              title="High-Risk Customers"
              value="156"
              change="Stable"
              changeType="neutral"
              icon={Users}
              iconColor="text-purple-500"
            />
          </div>

          {/* Secondary KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Transactions"
              value="2,847"
              change="+18% volume"
              changeType="positive"
              icon={Activity}
              iconColor="text-blue-500"
            />
            <KPICard
              title="Transaction Value"
              value="$24.8M"
              change="+25% from last week"
              changeType="positive"
              icon={DollarSign}
              iconColor="text-green-500"
            />
            <KPICard
              title="Avg Processing Time"
              value="2.3 hrs"
              change="-15 min faster"
              changeType="positive"
              icon={Clock}
              iconColor="text-cyan-500"
            />
            <KPICard
              title="Compliance Score"
              value="94.2%"
              change="+1.2% this month"
              changeType="positive"
              icon={Shield}
              iconColor="text-emerald-500"
            />
          </div>

          {/* Transaction Table */}
          <TransactionTable />

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Suspicious Pattern Detected</p>
                      <p className="text-xs text-slate-400">Customer: Ahmed Hassan</p>
                    </div>
                  </div>
                  <span className="text-xs text-red-300">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Large Transaction Review</p>
                      <p className="text-xs text-slate-400">Amount: $125k</p>
                    </div>
                  </div>
                  <span className="text-xs text-yellow-300">5 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="text-sm font-medium text-white">PEP Match Found</p>
                      <p className="text-xs text-slate-400">Requires immediate review</p>
                    </div>
                  </div>
                  <span className="text-xs text-orange-300">12 min ago</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">High Risk (80-100)</span>
                    <span className="text-sm font-medium text-red-400">15%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Medium Risk (60-79)</span>
                    <span className="text-sm font-medium text-yellow-400">35%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Low Risk (0-59)</span>
                    <span className="text-sm font-medium text-green-400">50%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
