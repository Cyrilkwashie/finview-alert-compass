
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const reports = [
  {
    id: 'RPT-2024-001',
    type: 'CTR',
    title: 'Currency Transaction Report',
    description: 'Cash transactions over $10,000',
    period: 'January 2024',
    status: 'submitted',
    filingDate: '2024-01-31',
    dueDate: '2024-02-15',
    transactions: 47,
    totalAmount: '$2.4M',
    submittedBy: 'Sarah Johnson'
  },
  {
    id: 'RPT-2024-002',
    type: 'SAR',
    title: 'Suspicious Activity Report',
    description: 'Unusual transaction patterns',
    period: 'January 2024',
    status: 'draft',
    filingDate: null,
    dueDate: '2024-02-30',
    transactions: 12,
    totalAmount: '$890K',
    submittedBy: null
  },
  {
    id: 'RPT-2024-003',
    type: 'LCTR',
    title: 'Large Cash Transaction Report',
    description: 'Large cash transactions report',
    period: 'December 2023',
    status: 'submitted',
    filingDate: '2024-01-15',
    dueDate: '2024-01-31',
    transactions: 23,
    totalAmount: '$1.2M',
    submittedBy: 'Mike Chen'
  },
  {
    id: 'RPT-2024-004',
    type: 'CTR',
    title: 'Currency Transaction Report',
    description: 'Cash transactions over $10,000',
    period: 'December 2023',
    status: 'overdue',
    filingDate: null,
    dueDate: '2024-01-15',
    transactions: 35,
    totalAmount: '$1.8M',
    submittedBy: null
  }
];

const Reports = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-green-400 bg-green-900/30 border-green-800';
      case 'draft': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'overdue': return 'text-red-400 bg-red-900/30 border-red-800';
      case 'pending': return 'text-blue-400 bg-blue-900/30 border-blue-800';
      default: return 'text-slate-400 bg-slate-700 border-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CTR': return 'bg-blue-900/30 text-blue-300 border-blue-800';
      case 'SAR': return 'bg-orange-900/30 text-orange-300 border-orange-800';
      case 'LCTR': return 'bg-purple-900/30 text-purple-300 border-purple-800';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Regulatory Reports</h1>
              <p className="text-slate-400 mt-1">Generate and manage compliance reports</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 bg-green-900/30 text-green-300 px-3 py-2 rounded-lg border border-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <span>2 Submitted</span>
                </div>
                <div className="flex items-center space-x-2 bg-red-900/30 text-red-300 px-3 py-2 rounded-lg border border-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span>1 Overdue</span>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <FileText className="h-4 w-4" />
                <span>New Report</span>
              </button>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="draft">Draft</option>
              <option value="overdue">Overdue</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="CTR">CTR</option>
              <option value="SAR">SAR</option>
              <option value="LCTR">LCTR</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Reports List */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        <span>{report.status.toUpperCase()}</span>
                      </div>
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded font-mono">
                        {report.id}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{report.title}</h3>
                    <p className="text-slate-300 mb-4">{report.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Period:</span>
                          <div className="text-white font-medium">{report.period}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Transactions:</span>
                          <div className="text-white font-medium">{report.transactions}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 text-slate-400">$</div>
                        <div>
                          <span className="text-slate-400">Total Amount:</span>
                          <div className="text-white font-medium">{report.totalAmount}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Due Date:</span>
                          <div className={`font-medium ${report.status === 'overdue' ? 'text-red-400' : 'text-white'}`}>
                            {report.dueDate}
                          </div>
                        </div>
                      </div>
                    </div>

                    {report.filingDate && (
                      <div className="mt-3 text-sm">
                        <span className="text-slate-400">Filed on: </span>
                        <span className="text-green-300 font-medium">{report.filingDate}</span>
                        {report.submittedBy && (
                          <>
                            <span className="text-slate-400"> by </span>
                            <span className="text-white font-medium">{report.submittedBy}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
