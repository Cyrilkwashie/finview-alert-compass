
import React from 'react';
import { 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  Users,
  Activity,
  DollarSign,
  Clock,
  Shield,
  CreditCard,
  Building2,
  UserCheck,
  Banknote
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import KPICard from '../components/KPICard';
import TransactionTable from '../components/TransactionTable';

const Index = () => {
  // Mock function to get transaction count for each rule
  const getTransactionCountForRule = (ruleName: string) => {
    const ruleCounts = {
      'HIGH VALUE TRANSACTION': 23,
      'AML DEVIATION': 15,
      'HIGH RISK CUSTOMER TRANSACTION': 31,
      'GL TO CUSTOMER': 8,
      'DEPOSIT IN DORMANT': 12,
      'MULTI BRANCH CUSTOMER TRANSACTION': 19
    };
    return ruleCounts[ruleName as keyof typeof ruleCounts] || 0;
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Transaction Monitoring Dashboard</h1>
              <p className="text-slate-400 mt-1 text-sm md:text-base">Real-time compliance monitoring and risk analysis</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 bg-slate-800 px-3 py-2 rounded-lg">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">Live Monitoring</span>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-white font-medium">January 15, 2024</p>
                <p className="text-xs text-slate-400">Last updated: 2 min ago</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <KPICard
              title="Flagged Transactions"
              value="47"
              change="+12% from yesterday"
              changeType="negative"
              icon={AlertTriangle}
              iconColor="text-red-400"
              bgColor="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-800/50"
            />
            <KPICard
              title="Active Cases"
              value="23"
              change="+3 new cases"
              changeType="neutral"
              icon={FileText}
              iconColor="text-orange-400"
              bgColor="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-800/50"
            />
            <KPICard
              title="High Value Transaction"
              value={getTransactionCountForRule('HIGH VALUE TRANSACTION')}
              change="Latest flagged transactions"
              changeType="neutral"
              icon={TrendingUp}
              iconColor="text-emerald-400"
              bgColor="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-800/50"
            />
            <KPICard
              title="AML Deviation"
              value={getTransactionCountForRule('AML DEVIATION')}
              change="Compliance violations"
              changeType="negative"
              icon={Shield}
              iconColor="text-purple-400"
              bgColor="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-800/50"
            />
          </div>

          {/* Rule-based KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <KPICard
              title="High Risk Customer Transaction"
              value={getTransactionCountForRule('HIGH RISK CUSTOMER TRANSACTION')}
              change="Risk-flagged customers"
              changeType="negative"
              icon={UserCheck}
              iconColor="text-red-400"
              bgColor="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-800/50"
            />
            <KPICard
              title="GL to Customer"
              value={getTransactionCountForRule('GL TO CUSTOMER')}
              change="General Ledger transfers"
              changeType="neutral"
              icon={CreditCard}
              iconColor="text-blue-400"
              bgColor="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-800/50"
            />
            <KPICard
              title="Deposit in Dormant"
              value={getTransactionCountForRule('DEPOSIT IN DORMANT')}
              change="Inactive account activity"
              changeType="negative"
              icon={Banknote}
              iconColor="text-yellow-400"
              bgColor="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-800/50"
            />
            <KPICard
              title="Multi Branch Customer Transaction"
              value={getTransactionCountForRule('MULTI BRANCH CUSTOMER TRANSACTION')}
              change="Cross-branch activities"
              changeType="neutral"
              icon={Building2}
              iconColor="text-cyan-400"
              bgColor="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-800/50"
            />
          </div>

          {/* Transaction Table - Show only last 5 flagged transactions */}
          <TransactionTable showOnlyFlagged={true} limit={5} />

          {/* Quick Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">Suspicious Pattern Detected</p>
                      <p className="text-xs text-slate-400 truncate">Customer: Ahmed Hassan</p>
                    </div>
                  </div>
                  <span className="text-xs text-red-300 flex-shrink-0">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">Large Transaction Review</p>
                      <p className="text-xs text-slate-400 truncate">Amount: $125k</p>
                    </div>
                  </div>
                  <span className="text-xs text-yellow-300 flex-shrink-0">5 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">PEP Match Found</p>
                      <p className="text-xs text-slate-400 truncate">Requires immediate review</p>
                    </div>
                  </div>
                  <span className="text-xs text-orange-300 flex-shrink-0">12 min ago</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-700">
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
