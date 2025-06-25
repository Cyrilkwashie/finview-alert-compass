
import React from 'react';
import { X, AlertTriangle, User, Calendar, MapPin, DollarSign, CreditCard, Building, Globe, Clock, Shield, TrendingUp } from 'lucide-react';

interface TransactionDetailProps {
  transaction: {
    id: string;
    customer: string;
    amount: string;
    type: string;
    time: string;
    date: string;
    riskScore: number;
    status: string;
    rules: string[];
    country: string;
  };
  onClose: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onClose }) => {
  // Mock additional transaction data for in-depth view
  const detailedTransaction = {
    ...transaction,
    description: 'International wire transfer',
    currency: 'USD',
    exchangeRate: '1.00',
    sourceAccount: '****1234',
    destinationAccount: '****5678',
    routingNumber: '021000021',
    swiftCode: 'CHASUS33',
    intermediaryBank: 'Chase Bank',
    beneficiaryBank: 'Bank of America',
    beneficiaryAddress: '123 Main St, New York, NY',
    purpose: 'Business payment',
    ipAddress: '192.168.1.100',
    deviceInfo: 'Chrome 91.0 on Windows 10',
    location: 'New York, NY, USA',
    merchantName: 'TechCorp Solutions',
    merchantCategory: 'Technology Services',
    authorizationCode: 'AUTH123456',
    processingTime: '2.3 seconds',
    fees: '$25.00',
    networkScore: 85,
    velocityScore: 72,
    geoScore: 45,
    behaviorScore: 68,
    complianceFlags: ['Large Amount', 'Cross-Border', 'High-Risk Country'],
    similarTransactions: [
      { date: '2024-01-14', amount: '$45,000', customer: 'Same Customer', similarity: '92%' },
      { date: '2024-01-13', amount: '$125,000', customer: 'Different Customer', similarity: '78%' },
      { date: '2024-01-12', amount: '$135,000', customer: 'Same Customer', similarity: '85%' }
    ]
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Transaction Analysis - {transaction.id}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Transaction Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-sm text-slate-400">Amount</span>
              </div>
              <div className="text-xl font-bold text-white">{transaction.amount}</div>
              <div className="text-xs text-slate-500">Fees: {detailedTransaction.fees}</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-slate-400">Risk Score</span>
              </div>
              <div className={`text-xl font-bold ${getRiskScoreColor(transaction.riskScore)}`}>{transaction.riskScore}</div>
              <div className="text-xs text-slate-500">High Risk Threshold: 80</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-400">Customer</span>
              </div>
              <div className="text-lg font-medium text-white">{transaction.customer}</div>
              <div className="text-xs text-slate-500">Account: {detailedTransaction.sourceAccount}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-slate-400">Processing</span>
              </div>
              <div className="text-lg font-medium text-white">{detailedTransaction.processingTime}</div>
              <div className="text-xs text-slate-500">Auth: {detailedTransaction.authorizationCode}</div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Transaction Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-slate-400">Transaction ID:</span>
                <div className="text-white font-mono text-sm">{transaction.id}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Type:</span>
                <div className="text-white">{transaction.type}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Date & Time:</span>
                <div className="text-white">{transaction.date} {transaction.time}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Description:</span>
                <div className="text-white">{detailedTransaction.description}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Currency:</span>
                <div className="text-white">{detailedTransaction.currency}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Purpose:</span>
                <div className="text-white">{detailedTransaction.purpose}</div>
              </div>
            </div>
          </div>

          {/* Banking Details */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Banking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Source Account</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-slate-400">Account:</span>
                    <div className="text-white font-mono">{detailedTransaction.sourceAccount}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Routing:</span>
                    <div className="text-white font-mono">{detailedTransaction.routingNumber}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Bank:</span>
                    <div className="text-white">{detailedTransaction.intermediaryBank}</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Destination Account</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-slate-400">Account:</span>
                    <div className="text-white font-mono">{detailedTransaction.destinationAccount}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">SWIFT:</span>
                    <div className="text-white font-mono">{detailedTransaction.swiftCode}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Bank:</span>
                    <div className="text-white">{detailedTransaction.beneficiaryBank}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Analysis Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Network Score</span>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <div className={`text-xl font-bold ${getRiskScoreColor(detailedTransaction.networkScore)}`}>
                  {detailedTransaction.networkScore}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Velocity Score</span>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </div>
                <div className={`text-xl font-bold ${getRiskScoreColor(detailedTransaction.velocityScore)}`}>
                  {detailedTransaction.velocityScore}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Geo Score</span>
                  <MapPin className="h-4 w-4 text-green-400" />
                </div>
                <div className={`text-xl font-bold ${getRiskScoreColor(detailedTransaction.geoScore)}`}>
                  {detailedTransaction.geoScore}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Behavior Score</span>
                  <User className="h-4 w-4 text-purple-400" />
                </div>
                <div className={`text-xl font-bold ${getRiskScoreColor(detailedTransaction.behaviorScore)}`}>
                  {detailedTransaction.behaviorScore}
                </div>
              </div>
            </div>
          </div>

          {/* Device & Location */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Device & Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-slate-400">IP Address:</span>
                <div className="text-white font-mono">{detailedTransaction.ipAddress}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Device:</span>
                <div className="text-white">{detailedTransaction.deviceInfo}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Location:</span>
                <div className="text-white">{detailedTransaction.location}</div>
              </div>
            </div>
          </div>

          {/* Rules Triggered */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Compliance Flags & Rules Triggered</h3>
            <div className="flex flex-wrap gap-2">
              {detailedTransaction.complianceFlags.map((flag, index) => (
                <span key={index} className="px-3 py-1 bg-orange-900/30 text-orange-300 text-sm rounded border border-orange-800">
                  {flag}
                </span>
              ))}
            </div>
          </div>

          {/* Similar Transactions */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Similar Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Date</th>
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Amount</th>
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Customer</th>
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Similarity</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedTransaction.similarTransactions.map((similar, index) => (
                    <tr key={index} className="border-b border-slate-800">
                      <td className="py-2 text-sm text-slate-300">{similar.date}</td>
                      <td className="py-2 text-sm text-white font-medium">{similar.amount}</td>
                      <td className="py-2 text-sm text-slate-300">{similar.customer}</td>
                      <td className="py-2 text-sm text-blue-400">{similar.similarity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              Flag as Suspicious
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Mark as Clear
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Create Investigation
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              Add to Watchlist
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              Export Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
