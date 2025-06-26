import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  User,
  Calendar,
  DollarSign
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AlertInvestigation from '../components/AlertInvestigation';
import ExportUtility from '../components/ExportUtility';
import { mockAlerts } from '../data/mockData';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockAlerts.filter(alert => 
      alert.title.toLowerCase().includes(term.toLowerCase()) ||
      alert.customer.toLowerCase().includes(term.toLowerCase()) ||
      alert.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredAlerts(filtered);
  };

  const handleSeverityFilter = (severity: string) => {
    setSeverityFilter(severity);
    let filtered = mockAlerts;
    
    if (severity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === severity);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(alert => alert.status === statusFilter);
    }
    
    setFilteredAlerts(filtered);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    let filtered = mockAlerts;
    
    if (severityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === severityFilter);
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(alert => alert.status === status);
    }
    
    setFilteredAlerts(filtered);
  };

  const handleViewAlert = (alert: any) => {
    setSelectedAlert(alert);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'investigating': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'open': return `${baseClasses} bg-red-900/30 text-red-300 border border-red-800`;
      case 'investigating': return `${baseClasses} bg-yellow-900/30 text-yellow-300 border border-yellow-800`;
      case 'resolved': return `${baseClasses} bg-green-900/30 text-green-300 border border-green-800`;
      default: return `${baseClasses} bg-slate-700 text-slate-300`;
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
              <h1 className="text-2xl font-bold text-white">Alerts</h1>
              <p className="text-slate-400 mt-1">Review and manage system alerts</p>
            </div>
            <div className="flex items-center space-x-4">
              <ExportUtility 
                data={filteredAlerts} 
                filename="alerts" 
                type="alerts"
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
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={severityFilter}
                onChange={(e) => handleSeverityFilter(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alert Table */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Alert</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rules</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{alert.title}</div>
                          <div className="text-xs text-slate-400">
                            <Calendar className="h-3 w-3 inline-block mr-1 align-text-bottom" />
                            {alert.timestamp}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{alert.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{alert.amount}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-bold ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(alert.status)}
                          <span className={getStatusBadge(alert.status)}>
                            {alert.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {alert.rules.map((rule, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-900/30 text-orange-300 text-xs rounded border border-orange-800">
                              {rule}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewAlert(alert)}
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
