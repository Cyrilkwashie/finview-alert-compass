
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TransactionDetail from '../components/TransactionDetail';
import ExportUtility from '../components/ExportUtility';
import { mockTransactions } from '../data/mockData';

const Transactions = () => {
  const [searchParams] = useSearchParams();
  const ruleFilter = searchParams.get('rule');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('flagged');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Filter transactions based on rule parameter
  useEffect(() => {
    let baseData = mockTransactions.filter(t => t.status === 'flagged');
    
    if (ruleFilter) {
      // Convert the rule filter to match the format in mock data
      const ruleToMatch = ruleFilter.replace(/_/g, ' ').toUpperCase();
      baseData = baseData.filter(transaction => 
        transaction.rules.some(rule => rule.toUpperCase() === ruleToMatch)
      );
    }
    
    setFilteredTransactions(baseData);
    console.log('Filtered transactions for rule:', ruleFilter, 'Count:', baseData.length);
  }, [ruleFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'cleared': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'under_review': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <Shield className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'flagged': return `${baseClasses} bg-red-900/30 text-red-300 border border-red-800`;
      case 'cleared': return `${baseClasses} bg-green-900/30 text-green-300 border border-green-800`;
      case 'under_review': return `${baseClasses} bg-yellow-900/30 text-yellow-300 border border-yellow-800`;
      default: return `${baseClasses} bg-slate-700 text-slate-300`;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const handleViewTransaction = (transaction: any) => {
    const detailTransaction = {
      id: transaction.id,
      customer: transaction.customer,
      amount: `$${transaction.amount.toLocaleString()}`,
      type: transaction.type,
      time: transaction.date.split(' ')[1] || '00:00',
      date: transaction.date.split(' ')[0],
      riskScore: transaction.riskScore,
      status: transaction.status,
      rules: transaction.rules,
      country: transaction.country
    };
    setSelectedTransaction(detailTransaction);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let baseData = mockTransactions.filter(t => t.status === 'flagged');
    
    // Apply rule filter first if it exists
    if (ruleFilter) {
      const ruleToMatch = ruleFilter.replace(/_/g, ' ').toUpperCase();
      baseData = baseData.filter(transaction => 
        transaction.rules.some(rule => rule.toUpperCase() === ruleToMatch)
      );
    }
    
    // Then apply search filter
    const filtered = baseData.filter(t => 
      t.customer.toLowerCase().includes(term.toLowerCase()) ||
      t.id.toLowerCase().includes(term.toLowerCase()) ||
      t.amount.toString().includes(term)
    );
    setFilteredTransactions(filtered);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    let baseData = mockTransactions.filter(t => t.status === 'flagged');
    
    // Apply rule filter first if it exists
    if (ruleFilter) {
      const ruleToMatch = ruleFilter.replace(/_/g, ' ').toUpperCase();
      baseData = baseData.filter(transaction => 
        transaction.rules.some(rule => rule.toUpperCase() === ruleToMatch)
      );
    }
    
    if (status === 'all') {
      setFilteredTransactions(baseData);
    } else {
      const filtered = baseData.filter(t => t.status === status);
      setFilteredTransactions(filtered);
    }
  };

  const getPageTitle = () => {
    if (ruleFilter) {
      return `Transactions: ${ruleFilter.replace(/_/g, ' ')}`;
    }
    return 'Flagged Transactions';
  };

  const getPageDescription = () => {
    if (ruleFilter) {
      return `Transactions that triggered the ${ruleFilter.replace(/_/g, ' ')} rule`;
    }
    return 'High-risk transactions requiring attention';
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{getPageTitle()}</h1>
              <p className="text-slate-400 mt-1">{getPageDescription()}</p>
              {ruleFilter && (
                <div className="mt-2">
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded border border-blue-800">
                    {filteredTransactions.length} transactions found
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <ExportUtility 
                data={filteredTransactions} 
                filename={ruleFilter ? `${ruleFilter.toLowerCase()}-transactions` : "flagged-transactions"} 
                type="transactions"
              />
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
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Transaction</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Risk Score</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rules</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{transaction.id}</div>
                          <div className="text-xs text-slate-400">{transaction.date}</div>
                          <div className="text-xs text-slate-500">{transaction.type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{transaction.customer}</div>
                        <div className="text-xs text-slate-400">{transaction.country}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">${transaction.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-bold ${getRiskScoreColor(transaction.riskScore)}`}>
                          {transaction.riskScore}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(transaction.status)}
                          <span className={getStatusBadge(transaction.status)}>
                            {transaction.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {transaction.rules.map((rule, index) => (
                            <span key={index} className={`px-2 py-1 text-xs rounded border ${
                              rule === ruleFilter 
                                ? 'bg-blue-900/30 text-blue-300 border-blue-800 font-medium' 
                                : 'bg-orange-900/30 text-orange-300 border-orange-800'
                            }`}>
                              {rule}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewTransaction(transaction)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default Transactions;
