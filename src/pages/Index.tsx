import React from 'react';
import { AlertTriangle, TrendingUp, Users, DollarSign, Globe, Shield, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const kpiData = [
    {
      title: 'High-Risk Transactions',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      description: 'Transactions flagged as high-risk',
      link: '/transactions'
    },
    {
      title: 'AML Deviation',
      value: '15',
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'orange',
      description: 'Anti-Money Laundering violations',
      link: '/transactions?rule=AML_DEVIATION'
    },
    {
      title: 'Deposit in Dormant',
      value: '8',
      change: '+2%',
      trend: 'up',
      icon: Clock,
      color: 'yellow',
      description: 'Deposits to dormant accounts',
      link: '/transactions?rule=DEPOSIT_IN_DORMANT'
    },
    {
      title: 'Large Amount',
      value: '12',
      change: '+3%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue',
      description: 'Transactions exceeding thresholds',
      link: '/transactions?rule=LARGE_AMOUNT'
    },
    {
      title: 'Cross Border',
      value: '18',
      change: '+7%',
      trend: 'up',
      icon: Globe,
      color: 'purple',
      description: 'International transactions',
      link: '/transactions?rule=CROSS_BORDER'
    },
    {
      title: 'Velocity Check',
      value: '9',
      change: '+1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      description: 'High-frequency transaction patterns',
      link: '/transactions?rule=VELOCITY_CHECK'
    },
    {
      title: 'Sanctioned Entity',
      value: '3',
      change: '0%',
      trend: 'neutral',
      icon: FileText,
      color: 'red',
      description: 'Transactions with sanctioned parties',
      link: '/transactions?rule=SANCTIONED_ENTITY'
    },
    {
      title: 'Unusual Pattern',
      value: '6',
      change: '+2%',
      trend: 'up',
      icon: Users,
      color: 'orange',
      description: 'Irregular transaction behaviors',
      link: '/transactions?rule=UNUSUAL_PATTERN'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'bg-red-900/20 border-red-800 text-red-300',
      orange: 'bg-orange-900/20 border-orange-800 text-orange-300',
      yellow: 'bg-yellow-900/20 border-yellow-800 text-yellow-300',
      blue: 'bg-blue-900/20 border-blue-800 text-blue-300',
      purple: 'bg-purple-900/20 border-purple-800 text-purple-300',
      green: 'bg-green-900/20 border-green-800 text-green-300'
    };
    return colorMap[color] || colorMap.red;
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Crime Detection Dashboard</h1>
              <p className="text-slate-400 mt-1">Real-time monitoring and risk assessment</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-400">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => {
              const IconComponent = kpi.icon;
              return (
                <Link
                  key={index}
                  to={kpi.link}
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className={`p-6 rounded-xl border ${getColorClasses(kpi.color)} hover:bg-opacity-30 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8" />
                      <div className="text-right">
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <div className={`text-sm ${kpi.trend === 'up' ? 'text-red-400' : kpi.trend === 'down' ? 'text-green-400' : 'text-slate-400'}`}>
                          {kpi.change}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{kpi.title}</h3>
                      <p className="text-sm opacity-80">{kpi.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/transactions" className="block p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span className="text-white">Review Flagged Transactions</span>
                  </div>
                </Link>
                <Link to="/alerts" className="block p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-orange-400" />
                    <span className="text-white">Manage Active Alerts</span>
                  </div>
                </Link>
                <Link to="/rules-engine" className="block p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <span className="text-white">Configure Detection Rules</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Transaction Processing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Risk Assessment Engine</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Compliance Monitoring</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Alert Processing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-yellow-400 text-sm">Processing</span>
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
