
import React from 'react';
import { X, AlertTriangle, User, Calendar, MapPin, DollarSign, TrendingUp, Shield, Phone, Mail, Building, CreditCard } from 'lucide-react';

interface CustomerProfileDetailProps {
  customer: {
    id: string;
    name: string;
    email: string;
    riskScore: number;
    riskLevel: string;
    country: string;
    accountType: string;
    onboardingDate: string;
    totalTransactions: number;
    totalVolume: string;
    flaggedTransactions: number;
    lastActivity: string;
    flags: string[];
  };
  onClose: () => void;
}

const CustomerProfileDetail: React.FC<CustomerProfileDetailProps> = ({ customer, onClose }) => {
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

  // Mock additional customer data
  const detailedCustomerData = {
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1985-03-15',
    occupation: 'Software Engineer',
    employerName: 'Tech Corp Inc.',
    averageMonthlyIncome: '$8,500',
    accountOpenDate: '2022-01-15',
    lastLoginDate: '2024-01-15 09:30:22',
    kycStatus: 'Verified',
    pepStatus: customer.flags.includes('PEP') ? 'Confirmed' : 'Not Identified',
    sanctionsStatus: customer.flags.includes('Sanctions List') ? 'Match Found' : 'Clear',
    recentTransactions: [
      { date: '2024-01-15', amount: '$5,000', type: 'Wire Transfer', status: 'flagged' },
      { date: '2024-01-14', amount: '$1,200', type: 'ACH', status: 'cleared' },
      { date: '2024-01-13', amount: '$850', type: 'Card Payment', status: 'cleared' },
      { date: '2024-01-12', amount: '$3,400', type: 'Wire Transfer', status: 'under_review' }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Customer Profile - {customer.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Customer Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{customer.name}</h3>
                  <p className="text-sm text-slate-400">{customer.id}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-300">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-300">{detailedCustomerData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-300">{detailedCustomerData.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">Risk Assessment</h4>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getRiskScoreColor(customer.riskScore)} mb-2`}>
                    {customer.riskScore}
                  </div>
                  <span className={`px-3 py-1 rounded border text-sm font-medium ${getRiskColor(customer.riskLevel)}`}>
                    {customer.riskLevel.toUpperCase()}
                  </span>
                </div>
                {customer.flags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Risk Flags:</p>
                    {customer.flags.map((flag, index) => (
                      <span key={index} className="flex items-center space-x-1 px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded border border-red-800">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{flag}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">Account Summary</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-slate-400">Account Type:</span>
                  <div className="text-white font-medium">{customer.accountType}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400">Onboarded:</span>
                  <div className="text-white font-medium">{customer.onboardingDate}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400">Last Activity:</span>
                  <div className="text-white font-medium">{customer.lastActivity}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400">KYC Status:</span>
                  <div className="text-green-400 font-medium">{detailedCustomerData.kycStatus}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-slate-400">Date of Birth:</span>
                <div className="text-white font-medium">{detailedCustomerData.dateOfBirth}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Occupation:</span>
                <div className="text-white font-medium">{detailedCustomerData.occupation}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Employer:</span>
                <div className="text-white font-medium">{detailedCustomerData.employerName}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Monthly Income:</span>
                <div className="text-white font-medium">{detailedCustomerData.averageMonthlyIncome}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Country:</span>
                <div className="text-white font-medium">{customer.country}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Last Login:</span>
                <div className="text-white font-medium">{detailedCustomerData.lastLoginDate}</div>
              </div>
            </div>
          </div>

          {/* Transaction Statistics */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-4">Transaction Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-slate-400">Total Volume</span>
                </div>
                <div className="text-xl font-bold text-white">{customer.totalVolume}</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-400">Total Transactions</span>
                </div>
                <div className="text-xl font-bold text-white">{customer.totalTransactions}</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-slate-400">Flagged</span>
                </div>
                <div className={`text-xl font-bold ${customer.flaggedTransactions > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {customer.flaggedTransactions}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-slate-400">Risk Score</span>
                </div>
                <div className={`text-xl font-bold ${getRiskScoreColor(customer.riskScore)}`}>
                  {customer.riskScore}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Checks */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-4">Compliance Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">PEP Status</span>
                  <Shield className="h-4 w-4 text-slate-400" />
                </div>
                <div className={`font-medium ${detailedCustomerData.pepStatus === 'Confirmed' ? 'text-red-400' : 'text-green-400'}`}>
                  {detailedCustomerData.pepStatus}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Sanctions Check</span>
                  <Shield className="h-4 w-4 text-slate-400" />
                </div>
                <div className={`font-medium ${detailedCustomerData.sanctionsStatus === 'Match Found' ? 'text-red-400' : 'text-green-400'}`}>
                  {detailedCustomerData.sanctionsStatus}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">KYC Status</span>
                  <Shield className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-green-400 font-medium">{detailedCustomerData.kycStatus}</div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Transactions</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Date</th>
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Amount</th>
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Type</th>
                    <th className="text-left text-sm font-medium text-slate-400 pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedCustomerData.recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-slate-800">
                      <td className="py-2 text-sm text-slate-300">{transaction.date}</td>
                      <td className="py-2 text-sm text-white font-medium">{transaction.amount}</td>
                      <td className="py-2 text-sm text-slate-300">{transaction.type}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.status === 'flagged' ? 'bg-red-900/30 text-red-300 border border-red-800' :
                          transaction.status === 'cleared' ? 'bg-green-900/30 text-green-300 border border-green-800' :
                          'bg-yellow-900/30 text-yellow-300 border border-yellow-800'
                        }`}>
                          {transaction.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              View All Transactions
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              Create Investigation
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Update Risk Score
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              Export Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileDetail;
