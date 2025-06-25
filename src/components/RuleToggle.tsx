
import React, { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Shield, AlertTriangle } from 'lucide-react';

interface RuleToggleProps {
  rule: {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    riskLevel: string;
    category: string;
  };
  onToggle: (ruleId: string, enabled: boolean) => void;
}

const RuleToggle: React.FC<RuleToggleProps> = ({ rule, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(rule.enabled);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(rule.id, newState);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-colors ${
      isEnabled 
        ? 'bg-slate-800 border-slate-600' 
        : 'bg-slate-900/50 border-slate-700'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center space-x-2">
              {isEnabled ? (
                <Shield className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-slate-500" />
              )}
              <h3 className={`font-medium ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                {rule.name}
              </h3>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(rule.riskLevel)}`}>
              {rule.riskLevel.toUpperCase()}
            </span>
          </div>
          <p className={`text-sm ${isEnabled ? 'text-slate-300' : 'text-slate-500'}`}>
            {rule.description}
          </p>
        </div>
        <Toggle
          pressed={isEnabled}
          onPressedChange={handleToggle}
          className="ml-4"
        />
      </div>
    </div>
  );
};

export default RuleToggle;
