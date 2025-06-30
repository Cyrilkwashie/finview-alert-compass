
import React from 'react';
import { AlertTriangle, TrendingUp, Users, DollarSign, Globe, Shield, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TransactionTable from '../components/TransactionTable';

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
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'orange',
      description: 'Anti-Money Laundering violations',
      link: '/transactions?rule=AML_DEVIATION'
    },
    {
      title: 'Deposit in Dormant',
      value: '18',
      change: '+2%',
      trend: 'up',
      icon: Clock,
      color: 'yellow',
      description: 'Deposits to dormant accounts',
      link: '/transactions?rule=DEPOSIT_IN_DORMANT'
    },
    {
      title: 'Large Amount',
      value: '31',
      change: '+3%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue',
      description: 'Transactions exceeding thresholds',
      link: '/transactions?rule=LARGE_AMOUNT'
    },
    {
      title: 'Cross Border',
      value: '28',
      change: '+7%',
      trend: 'up',
      icon: Globe,
      color: 'purple',
      description: 'International transactions',
      link: '/transactions?rule=CROSS_BORDER'
    },
    {
      title: 'Velocity Check',
      value: '15',
      change: '+1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      description: 'High-frequency transaction patterns',
      link: '/transactions?rule=VELOCITY_CHECK'
    },
    {
      title: 'Sanctioned Entity',
      value: '7',
      change: '0%',
      trend: 'neutral',
      icon: FileText,
      color: 'red',
      description: 'Transactions with sanctioned parties',
      link: '/transactions?rule=SANCTIONED_ENTITY'
    },
    {
      title: 'Unusual Pattern',
      value: '12',
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
      red: 'bg-red-50 border border-red-200 hover:bg-red-100',
      orange: 'bg-orange-50 border border-orange-200 hover:bg-orange-100',
      yellow: 'bg-yellow-50 border border-yellow-200 hover:bg-yellow-100',
      blue: 'bg-blue-50 border border-blue-200 hover:bg-blue-100',
      purple: 'bg-purple-50 border border-purple-200 hover:bg-purple-100',
      green: 'bg-green-50 border border-green-200 hover:bg-green-100'
    };
    return colorMap[color] || colorMap.red;
  };

  const getIconColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600'
    };
    return colorMap[color] || colorMap.red;
  };

  const getTextColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'text-red-900',
      orange: 'text-orange-900',
      yellow: 'text-yellow-900',
      blue: 'text-blue-900',
      purple: 'text-purple-900',
      green: 'text-green-900'
    };
    return colorMap[color] || colorMap.red;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Crime Detection Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time monitoring and risk assessment</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
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
                  <div className={`p-6 rounded-lg ${getColorClasses(kpi.color)} transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className={`h-8 w-8 ${getIconColorClasses(kpi.color)}`} />
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getTextColorClasses(kpi.color)}`}>{kpi.value}</div>
                        <div className={`text-sm ${kpi.trend === 'up' ? 'text-red-600' : kpi.trend === 'down' ? 'text-green-600' : 'text-gray-600'}`}>
                          {kpi.change}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${getTextColorClasses(kpi.color)}`}>{kpi.title}</h3>
                      <p className="text-sm text-gray-600">{kpi.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <div className="lg:col-span-1">
              <TransactionTable showOnlyFlagged={true} limit={5} />
            </div>

            {/* Risk Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Distribution</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">High Risk</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-red-600 text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Medium Risk</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-yellow-600 text-sm font-medium">20%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Low Risk</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-green-600 text-sm font-medium">5%</span>
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
