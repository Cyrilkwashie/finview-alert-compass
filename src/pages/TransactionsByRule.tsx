
import React, { useState } from 'react';
import { Search, Filter, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TransactionDetail from '../components/TransactionDetail';
import { mockTransactions, ruleCategories } from '../data/mockData';

const TransactionsByRule = () => {
  const navigate = useNavigate();
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all rules flattened
  const allRules = ruleCategories.flatMap(category => 
    category.rules.map(rule => ({
      ...rule,
      categoryName: category.name
    }))
  );

  // Get transactions for selected rule
  const getTransactionsForRule = (ruleName: string) => {
    return mockTransactions.filter(transaction => 
      transaction.rules.includes(ruleName)
    );
  };

  const filteredRules = allRules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTransaction = (transaction: any) => {
    const detailTransaction = {
      id: transaction.id,
      customer: transaction.customer,
      amount: `$${transaction.amount.toLocaleString()}`,
      type: transaction.type,
      time: transaction.date.split(' ')[1],
      date: transaction.date.split(' ')[0],
      riskScore: transaction.riskScore,
      status: transaction.status,
      rules: transaction.rules,
      country: transaction.country
    };
    setSelectedTransaction(detailTransaction);
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-slate-400 bg-slate-700/20';
    }
  };

  if (selectedRule) {
    const rule = allRules.find(r => r.name === selectedRule);
    const transactions = getTransactionsForRule(selectedRule);

    return (
      <div className="flex h-screen bg-slate-950">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedRule(null)}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Rules</span>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Transactions for Rule: {selectedRule}
                  </h1>
                  <p className="text-slate-400 mt-1">
                    {transactions.length} transactions found
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(rule?.riskLevel || 'medium')}`}>
                {rule?.riskLevel?.toUpperCase()} RISK
              </div>
            </div>
          </header>

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
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Other Rules</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {transactions.map((transaction) => (
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
                          <div className="text-sm font-medium text-white">
                            ${transaction.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-bold ${getRiskScoreColor(transaction.riskScore)}`}>
                            {transaction.riskScore}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {transaction.rules.filter(rule => rule !== selectedRule).map((rule, index) => (
                              <span key={index} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600">
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
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Transactions by Rule</h1>
              <p className="text-slate-400 mt-1">View transactions that triggered specific compliance rules</p>
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Rules List */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {ruleCategories.map(category => {
              const categoryRules = filteredRules.filter(rule => rule.category === category.id);
              if (categoryRules.length === 0) return null;

              return (
                <div key={category.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h2 className="text-xl font-semibold text-white mb-4">{category.name}</h2>
                  
                  <div className="grid gap-4">
                    {categoryRules.map(rule => {
                      const transactionCount = getTransactionsForRule(rule.name).length;
                      
                      return (
                        <div 
                          key={rule.id}
                          onClick={() => setSelectedRule(rule.name)}
                          className="p-4 bg-slate-900 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-all hover:bg-slate-800/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-medium text-white">{rule.name}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(rule.riskLevel)}`}>
                                  {rule.riskLevel.toUpperCase()}
                                </span>
                                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-800">
                                  {transactionCount} transactions
                                </span>
                              </div>
                              <p className="text-sm text-slate-300">{rule.description}</p>
                            </div>
                            <Eye className="h-5 w-5 text-slate-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TransactionsByRule;
