import React, { useState } from 'react';
import { AlertTriangle, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import TransactionDetail from './TransactionDetail';

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  date: string;
  riskScore: number;
  status: 'flagged' | 'cleared' | 'under_review';
  rules: string[];
}

const mockTransactions: Transaction[] = [
  {
    id: 'TX-2024-001',
    customer: 'John Anderson',
    amount: 15000,
    date: '2024-01-15 14:32',
    riskScore: 85,
    status: 'flagged',
    rules: ['Structuring', 'High Amount']
  },
  {
    id: 'TX-2024-002',
    customer: 'Maria Gonzalez',
    amount: 2500,
    date: '2024-01-15 13:45',
    riskScore: 35,
    status: 'cleared',
    rules: []
  },
  {
    id: 'TX-2024-003',
    customer: 'Robert Chen',
    amount: 45000,
    date: '2024-01-15 12:18',
    riskScore: 92,
    status: 'under_review',
    rules: ['Suspicious Pattern', 'Geographic Risk', 'PEP']
  },
  {
    id: 'TX-2024-004',
    customer: 'Sarah Williams',
    amount: 8750,
    date: '2024-01-15 11:22',
    riskScore: 58,
    status: 'under_review',
    rules: ['Velocity Check']
  },
  {
    id: 'TX-2024-005',
    customer: 'Ahmed Hassan',
    amount: 125000,
    date: '2024-01-15 10:55',
    riskScore: 98,
    status: 'flagged',
    rules: ['Large Transaction', 'Sanctions List', 'Layering']
  }
];

interface TransactionTableProps {
  showOnlyFlagged?: boolean;
}

const TransactionTable = ({ showOnlyFlagged = false }: TransactionTableProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const filteredTransactions = showOnlyFlagged 
    ? mockTransactions.filter(t => t.status === 'flagged')
    : mockTransactions;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'cleared': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'under_review': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flagged': return 'bg-red-900/20 text-red-300 border-red-800';
      case 'cleared': return 'bg-green-900/20 text-green-300 border-green-800';
      case 'under_review': return 'bg-yellow-900/20 text-yellow-300 border-yellow-800';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400 bg-red-900/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-900/20';
    return 'text-green-400 bg-green-900/20';
  };

  const handleViewTransaction = (transaction: Transaction) => {
    // Convert transaction to match TransactionDetail interface
    const detailTransaction = {
      id: transaction.id,
      customer: transaction.customer,
      amount: `$${transaction.amount.toLocaleString()}`,
      type: 'Wire Transfer',
      time: transaction.date.split(' ')[1],
      date: transaction.date.split(' ')[0],
      riskScore: transaction.riskScore,
      status: transaction.status,
      rules: transaction.rules,
      country: 'USA'
    };
    setSelectedTransaction(detailTransaction);
  };

  return (
    <>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {showOnlyFlagged ? 'Flagged Transactions' : 'Recent Transactions'}
            </h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors">
                Filter
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Rules
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskScoreColor(transaction.riskScore)}`}>
                      {transaction.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                        {transaction.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {transaction.rules.map((rule, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600"
                        >
                          {rule}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleViewTransaction(transaction)}
                      className="inline-flex items-center px-3 py-1 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 hover:text-white transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
};

export default TransactionTable;
