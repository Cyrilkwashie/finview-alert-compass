
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  iconColor = 'text-blue-500',
  bgColor = 'bg-slate-800'
}: KPICardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className={`${bgColor} rounded-xl p-4 md:p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-slate-400 text-sm font-medium mb-2 truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2 truncate">{value}</p>
          {change && (
            <p className={`text-xs md:text-sm ${getChangeColor()} truncate`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg bg-slate-700/50 ${iconColor} flex-shrink-0 ml-3`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
