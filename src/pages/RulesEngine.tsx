
import React, { useState } from 'react';
import { Shield, Search, Filter, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import RuleToggle from '../components/RuleToggle';

const initialRules = [
  {
    id: 'AML-001',
    name: 'Large Cash Transaction',
    description: 'Flags transactions over $10,000 in cash',
    enabled: true,
    riskLevel: 'high',
    category: 'AML',
    threshold: 10000
  },
  {
    id: 'AML-002',
    name: 'Structuring Pattern',
    description: 'Detects multiple transactions just under reporting thresholds',
    enabled: true,
    riskLevel: 'high',
    category: 'AML',
    threshold: 9500
  },
  {
    id: 'FRAUD-001',
    name: 'Card Velocity Check',
    description: 'Monitors rapid card usage across different locations',
    enabled: true,
    riskLevel: 'medium',
    category: 'Fraud',
    threshold: 5
  },
  {
    id: 'SANCTIONS-001',
    name: 'PEP Screening',
    description: 'Screens against Politically Exposed Persons database',
    enabled: true,
    riskLevel: 'high',
    category: 'Sanctions',
    threshold: null
  },
  {
    id: 'AML-003',
    name: 'Geographic Risk',
    description: 'Monitors transactions from high-risk jurisdictions',
    enabled: false,
    riskLevel: 'medium',
    category: 'AML',
    threshold: null
  }
];

const RulesEngine = () => {
  const [rules, setRules] = useState(initialRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [hasChanges, setHasChanges] = useState(false);

  const handleRuleToggle = (ruleId: string, enabled: boolean) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === ruleId ? { ...rule, enabled } : rule
      )
    );
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Simulate saving to backend
    setTimeout(() => {
      setHasChanges(false);
      // Show success message
    }, 1000);
  };

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || rule.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const enabledRulesCount = rules.filter(rule => rule.enabled).length;
  const totalRulesCount = rules.length;

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
              <div className="flex items-center space-x-2 bg-slate-800 px-3 py-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-white">{enabledRulesCount}/{totalRulesCount} Rules Active</span>
              </div>
              {hasChanges && (
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              )}
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
                placeholder="Search rules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="AML">AML</option>
              <option value="Fraud">Fraud</option>
              <option value="Sanctions">Sanctions</option>
              <option value="KYC">KYC</option>
            </select>
          </div>
        </div>

        {/* Rules List */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Rules by Category */}
            {['AML', 'Fraud', 'Sanctions'].map(category => {
              const categoryRules = filteredRules.filter(rule => rule.category === category);
              if (categoryRules.length === 0) return null;

              return (
                <div key={category} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span>{category} Rules</span>
                    </h2>
                    <span className="text-sm text-slate-400">
                      {categoryRules.filter(r => r.enabled).length}/{categoryRules.length} active
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {categoryRules.map(rule => (
                      <RuleToggle
                        key={rule.id}
                        rule={rule}
                        onToggle={handleRuleToggle}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredRules.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400">No rules found matching your criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RulesEngine;
