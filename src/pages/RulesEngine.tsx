
import React, { useState } from 'react';
import { 
  Shield, 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  Edit,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ruleCategories = [
  {
    name: 'Anti-Money Laundering (AML)',
    icon: Shield,
    rules: [
      {
        id: 'AML-001',
        name: 'Large Cash Transaction',
        description: 'Detects cash transactions above $10,000',
        status: 'active',
        threshold: '$10,000',
        alerts: 23,
        lastTriggered: '2 hours ago'
      },
      {
        id: 'AML-002',
        name: 'Structuring Detection',
        description: 'Multiple transactions just below reporting threshold',
        status: 'active',
        threshold: '$9,500 x 3',
        alerts: 15,
        lastTriggered: '4 hours ago'
      },
      {
        id: 'AML-003',
        name: 'Rapid Fund Movement',
        description: 'Funds moved between accounts within 24 hours',
        status: 'inactive',
        threshold: '< 24 hours',
        alerts: 0,
        lastTriggered: 'Never'
      }
    ]
  },
  {
    name: 'Fraud Detection',
    icon: AlertTriangle,
    rules: [
      {
        id: 'FRD-001',
        name: 'Card Velocity Check',
        description: 'Multiple card transactions in short time',
        status: 'active',
        threshold: '5 txns/hour',
        alerts: 8,
        lastTriggered: '1 hour ago'
      },
      {
        id: 'FRD-002',
        name: 'Geographic Anomaly',
        description: 'Transactions from unusual locations',
        status: 'active',
        threshold: '> 500 miles',
        alerts: 12,
        lastTriggered: '30 min ago'
      }
    ]
  },
  {
    name: 'Sanctions Screening',
    icon: Clock,
    rules: [
      {
        id: 'SAN-001',
        name: 'OFAC List Check',
        description: 'Check against OFAC sanctions list',
        status: 'active',
        threshold: '90% match',
        alerts: 3,
        lastTriggered: '6 hours ago'
      },
      {
        id: 'SAN-002',
        name: 'PEP Screening',
        description: 'Politically Exposed Person screening',
        status: 'active',
        threshold: '95% match',
        alerts: 7,
        lastTriggered: '2 hours ago'
      }
    ]
  }
];

const RulesEngine = () => {
  const [selectedCategory, setSelectedCategory] = useState('Anti-Money Laundering (AML)');

  const getStatusIcon = (status: string) => {
    return status === 'active' ? 
      <CheckCircle className="h-4 w-4 text-green-400" /> : 
      <Clock className="h-4 w-4 text-slate-400" />;
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    return status === 'active' ? 
      `${baseClasses} bg-green-900/30 text-green-300 border border-green-800` :
      `${baseClasses} bg-slate-700 text-slate-300 border border-slate-600`;
  };

  const toggleRule = (ruleId: string) => {
    console.log(`Toggling rule ${ruleId}`);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Rules Engine</h1>
              <p className="text-slate-400 mt-1">Configure and manage compliance rules</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>New Rule</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-80 bg-slate-900 border-r border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Rule Categories</h3>
            <div className="space-y-2">
              {ruleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs opacity-75">{category.rules.length} rules</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rules List */}
          <main className="flex-1 overflow-y-auto p-6">
            {ruleCategories
              .filter(category => category.name === selectedCategory)
              .map(category => (
                <div key={category.name}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">{category.name}</h2>
                    <p className="text-slate-400">Manage rules for {category.name.toLowerCase()}</p>
                  </div>

                  <div className="space-y-4">
                    {category.rules.map((rule) => (
                      <div key={rule.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                              <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded font-mono">
                                {rule.id}
                              </span>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(rule.status)}
                                <span className={getStatusBadge(rule.status)}>
                                  {rule.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <p className="text-slate-300 mb-4">{rule.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-slate-400">Threshold:</span>
                                <div className="text-white font-medium">{rule.threshold}</div>
                              </div>
                              <div>
                                <span className="text-slate-400">Alerts (30d):</span>
                                <div className="text-white font-medium">{rule.alerts}</div>
                              </div>
                              <div>
                                <span className="text-slate-400">Last Triggered:</span>
                                <div className="text-white font-medium">{rule.lastTriggered}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-6">
                            <button
                              onClick={() => toggleRule(rule.id)}
                              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              {rule.status === 'active' ? 
                                <ToggleRight className="h-6 w-6 text-green-400" /> : 
                                <ToggleLeft className="h-6 w-6 text-slate-400" />
                              }
                            </button>
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                              <Edit className="h-4 w-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                              <Settings className="h-4 w-4 text-slate-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default RulesEngine;
