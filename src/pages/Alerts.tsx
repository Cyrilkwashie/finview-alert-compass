import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  FileText, 
  MessageSquare,
  User,
  Calendar,
  Filter
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AlertInvestigation from '../components/AlertInvestigation';
import ExportUtility from '../components/ExportUtility';

const alerts = [
  {
    id: 'ALT-2024-0156',
    type: 'AML',
    title: 'Suspicious Pattern Detected',
    customer: 'Ahmed Hassan',
    priority: 'high',
    status: 'open',
    amount: '$125,000',
    createdAt: '2024-01-15 14:23',
    assignedTo: 'Sarah Johnson',
    description: 'Multiple large transactions to high-risk jurisdictions within 48 hours',
    comments: 3
  },
  {
    id: 'ALT-2024-0155',
    type: 'Fraud',
    title: 'Card Velocity Exceeded',
    customer: 'Maria Rodriguez',
    priority: 'medium',
    status: 'investigating',
    amount: '$8,450',
    createdAt: '2024-01-15 13:45',
    assignedTo: 'Mike Chen',
    description: '7 card transactions within 2 hours from different locations',
    comments: 1
  },
  {
    id: 'ALT-2024-0154',
    type: 'Sanctions',
    title: 'PEP Match Found',
    customer: 'Viktor Petrov',
    priority: 'critical',
    status: 'escalated',
    amount: '$450,000',
    createdAt: '2024-01-15 12:15',
    assignedTo: 'David Park',
    description: 'Customer matches politically exposed person database',
    comments: 8
  },
  {
    id: 'ALT-2024-0153',
    type: 'AML',
    title: 'Structuring Activity',
    customer: 'John Smith',
    priority: 'medium',
    status: 'resolved',
    amount: '$29,700',
    createdAt: '2024-01-15 11:30',
    assignedTo: 'Lisa Wang',
    description: 'Three deposits of $9,900 each within one week',
    comments: 5
  }
];

const Alerts = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-800';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-800';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'low': return 'text-green-400 bg-green-900/30 border-green-800';
      default: return 'text-slate-400 bg-slate-700 border-slate-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-900/30 border-blue-800';
      case 'investigating': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'escalated': return 'text-red-400 bg-red-900/30 border-red-800';
      case 'resolved': return 'text-green-400 bg-green-900/30 border-green-800';
      default: return 'text-slate-400 bg-slate-700 border-slate-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'AML': return <AlertTriangle className="h-4 w-4" />;
      case 'Fraud': return <AlertTriangle className="h-4 w-4" />;
      case 'Sanctions': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleInvestigate = (alert: any) => {
    setSelectedAlert(alert);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(status, priorityFilter);
  };

  const handlePriorityFilter = (priority: string) => {
    setPriorityFilter(priority);
    applyFilters(statusFilter, priority);
  };

  const applyFilters = (status: string, priority: string) => {
    let filtered = [...alerts];
    
    if (status !== 'all') {
      filtered = filtered.filter(alert => alert.status === status);
    }
    
    if (priority !== 'all') {
      filtered = filtered.filter(alert => alert.priority === priority);
    }
    
    setFilteredAlerts(filtered);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Alerts & Cases</h1>
              <p className="text-slate-400 mt-1">Monitor and investigate compliance alerts</p>
            </div>
            <div className="flex items-center space-x-4">
              <ExportUtility 
                data={filteredAlerts} 
                filename="alerts" 
                type="alerts"
              />
              <div className="flex items-center space-x-2 bg-slate-800 px-3 py-2 rounded-lg">
                <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-400 font-medium">{filteredAlerts.filter(a => a.status === 'open').length} Open Alerts</span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="escalated">Escalated</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => handlePriorityFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {getTypeIcon(alert.type)}
                        <span>{alert.type}</span>
                      </div>
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{alert.title}</h3>
                    <p className="text-slate-300 mb-4">{alert.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Customer:</span>
                          <div className="text-white font-medium">{alert.customer}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Amount:</span>
                          <div className="text-white font-medium">{alert.amount}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Created:</span>
                          <div className="text-white font-medium">{alert.createdAt}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-400">Assigned:</span>
                          <div className="text-white font-medium">{alert.assignedTo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-6">
                    <div className="flex items-center space-x-1 text-slate-400">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">{alert.comments}</span>
                    </div>
                    <button 
                      onClick={() => handleInvestigate(alert)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Investigate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Alert Investigation Modal */}
      {selectedAlert && (
        <AlertInvestigation
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
};

export default Alerts;
