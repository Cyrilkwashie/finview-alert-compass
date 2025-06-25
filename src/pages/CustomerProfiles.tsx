
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Eye
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const customers = [
  {
    id: 'CUST-001',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    riskScore: 87,
    riskLevel: 'High',
    country: 'UAE',
    accountType: 'Business',
    onboardingDate: '2023-08-15',
    totalTransactions: 156,
    totalVolume: '$2.4M',
    flaggedTransactions: 12,
    lastActivity: '2 hours ago',
    flags: ['PEP', 'High Risk Country']
  },
  {
    id: 'CUST-002',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    riskScore: 34,
    riskLevel: 'Low',
    country: 'USA',
    accountType: 'Personal',
    onboardingDate: '2022-03-10',
    totalTransactions: 89,
    totalVolume: '$145K',
    flaggedTransactions: 0,
    lastActivity: '1 day ago',
    flags: []
  },
  {
    id: 'CUST-003',
    name: 'Viktor Petrov',
    email: 'viktor.petrov@email.com',
    riskScore: 95,
    riskLevel: 'Critical',
    country: 'Russia',
    accountType: 'Business',
    onboardingDate: '2023-11-22',
    totalTransactions: 45,
    totalVolume: '$890K',
    flaggedTransactions: 8,
    lastActivity: '30 min ago',
    flags: ['PEP', 'Sanctions List', 'High Risk Country']
  },
  {
    id: 'CUST-004',
    name: 'John Smith',
    email: 'john.smith@email.com',
    riskScore: 52,
    riskLevel: 'Medium',
    country: 'USA',
    accountType: 'Personal',
    onboardingDate: '2021-07-05',
    totalTransactions: 234,
    totalVolume: '$67K',
    flaggedTransactions: 3,
    lastActivity: '5 hours ago',
    flags: ['Structuring Pattern']
  }
];

const CustomerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return 'text-red-400 bg-red-900/30 border-red-800';
      case 'High': return 'text-orange-400 bg-orange-900/30 border-orange-800';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'Low': return 'text-green-400 bg-green-900/30 border-green-800';
      default: return 'text-slate-400 bg-slate-700 border-slate-600';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Customer Risk Profiles</h1>
              <p className="text-slate-400 mt-1">Dynamic risk assessment and customer monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white font-medium">Total Customers: 1,247</p>
                <p className="text-xs text-slate-400">High Risk: 89 | Critical: 23</p>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Customer Grid */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {customers.map((customer) => (
              <div key={customer.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                      <p className="text-sm text-slate-400">{customer.email}</p>
                      <p className="text-xs text-slate-500 mt-1">{customer.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getRiskScoreColor(customer.riskScore)}`}>
                      {customer.riskScore}
                    </div>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getRiskColor(customer.riskLevel)}`}>
                      {customer.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Flags */}
                {customer.flags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {customer.flags.map((flag, index) => (
                      <span key={index} className="flex items-center space-x-1 px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded border border-red-800">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{flag}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-slate-400">Country:</span>
                      <div className="text-white font-medium">{customer.country}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-slate-400">Type:</span>
                      <div className="text-white font-medium">{customer.accountType}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-slate-400">Onboarded:</span>
                      <div className="text-white font-medium">{customer.onboardingDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-slate-400">Last Activity:</span>
                      <div className="text-white font-medium">{customer.lastActivity}</div>
                    </div>
                  </div>
                </div>

                {/* Transaction Stats */}
                <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-white mb-3">Transaction Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400">Total Volume</span>
                      <div className="text-white font-bold text-sm">{customer.totalVolume}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Transactions</span>
                      <div className="text-white font-bold text-sm">{customer.totalTransactions}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Flagged</span>
                      <div className={`font-bold text-sm ${customer.flaggedTransactions > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {customer.flaggedTransactions}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                  {customer.flaggedTransactions > 0 && (
                    <div className="flex items-center space-x-1 text-orange-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Requires Review</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerProfiles;
