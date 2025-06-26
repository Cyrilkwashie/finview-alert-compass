
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
import CustomerProfileDetail from '../components/CustomerProfileDetail';
import { mockTransactions } from '../data/mockData';

// Generate customer data based on flagged transactions
const generateCustomerProfiles = () => {
  const flaggedTransactions = mockTransactions.filter(t => t.status === 'flagged');
  const customerMap = new Map();

  // Group transactions by customer
  flaggedTransactions.forEach(transaction => {
    if (!customerMap.has(transaction.customer)) {
      customerMap.set(transaction.customer, []);
    }
    customerMap.get(transaction.customer).push(transaction);
  });

  // Create customer profiles
  const customers = Array.from(customerMap.entries()).map(([customerName, transactions], index) => {
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgRiskScore = Math.round(transactions.reduce((sum, t) => sum + t.riskScore, 0) / transactions.length);
    const uniqueRules = [...new Set(transactions.flatMap(t => t.rules))];
    
    // Determine risk level based on average risk score
    let riskLevel = 'Low';
    if (avgRiskScore >= 90) riskLevel = 'Critical';
    else if (avgRiskScore >= 75) riskLevel = 'High';
    else if (avgRiskScore >= 50) riskLevel = 'Medium';

    // Generate flags based on rules and risk level
    const flags = [];
    if (uniqueRules.some(rule => (rule as string).includes('PEP'))) flags.push('PEP');
    if (uniqueRules.some(rule => (rule as string).includes('Sanctions'))) flags.push('Sanctions List');
    if (uniqueRules.some(rule => (rule as string).includes('High Risk Country'))) flags.push('High Risk Country');
    if (uniqueRules.some(rule => (rule as string).includes('Structuring'))) flags.push('Structuring Pattern');
    if (avgRiskScore >= 85) flags.push('High Risk Customer');

    return {
      id: `CUST-${String(index + 1).padStart(3, '0')}`,
      name: customerName,
      email: `${customerName.toLowerCase().replace(/\s+/g, '.')}.${Math.floor(Math.random() * 1000)}@email.com`,
      riskScore: avgRiskScore,
      riskLevel,
      country: transactions[0].country,
      accountType: Math.random() > 0.6 ? 'Business' : 'Personal',
      onboardingDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 2).toISOString().split('T')[0],
      totalTransactions: transactions.length + Math.floor(Math.random() * 150),
      totalVolume: totalAmount > 1000000 ? `$${(totalAmount / 1000000).toFixed(1)}M` : `$${Math.round(totalAmount / 1000)}K`,
      flaggedTransactions: transactions.length,
      lastActivity: `${Math.floor(Math.random() * 48)} ${Math.random() > 0.5 ? 'hours' : 'minutes'} ago`,
      flags
    };
  });

  // Sort by risk score descending
  return customers.sort((a, b) => b.riskScore - a.riskScore);
};

const customers = generateCustomerProfiles();

const CustomerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

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

  const handleViewProfile = (customer: any) => {
    setSelectedCustomer(customer);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = riskFilter === 'all' || customer.riskLevel.toLowerCase() === riskFilter;
    
    return matchesSearch && matchesRisk;
  });

  return (
    <>
      <div className="flex h-screen bg-slate-950">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Customer Risk Profiles</h1>
                <p className="text-slate-400 mt-1">Customers with flagged transactions and risk assessment</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-white font-medium">High-Risk Customers: {customers.length}</p>
                  <p className="text-xs text-slate-400">
                    Critical: {customers.filter(c => c.riskLevel === 'Critical').length} | 
                    High: {customers.filter(c => c.riskLevel === 'High').length}
                  </p>
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
              {filteredCustomers.map((customer) => (
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
                    <button 
                      onClick={() => handleViewProfile(customer)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
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

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No customers found</h3>
                <p className="text-slate-400">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Customer Profile Detail Modal */}
      {selectedCustomer && (
        <CustomerProfileDetail
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  );
};

export default CustomerProfiles;
