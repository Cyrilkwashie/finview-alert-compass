
import React from 'react';
import { X, AlertTriangle, User, Calendar, MapPin, DollarSign } from 'lucide-react';

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
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Transaction Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-sm text-slate-400">Amount</span>
              </div>
              <div className="text-xl font-bold text-white">{transaction.amount}</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-slate-400">Risk Score</span>
              </div>
              <div className="text-xl font-bold text-red-400">{transaction.riskScore}</div>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-400">Customer</span>
              </div>
              <div className="text-lg font-medium text-white">{transaction.customer}</div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Transaction Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-slate-400">Transaction ID:</span>
                <div className="text-white font-mono">{transaction.id}</div>
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
                <span className="text-sm text-slate-400">Country:</span>
                <div className="text-white">{transaction.country}</div>
              </div>
            </div>
          </div>

          {/* Rules Triggered */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Rules Triggered</h3>
            <div className="flex flex-wrap gap-2">
              {transaction.rules.map((rule, index) => (
                <span key={index} className="px-3 py-1 bg-orange-900/30 text-orange-300 text-sm rounded border border-orange-800">
                  {rule}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              Flag as Suspicious
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Mark as Clear
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Create Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
